var Task = require('./task');
var IntentResponse = require('../intent-response');
var PriorityType = require('./priority-types');
var BaseIntent = require('../base-intent');
var ObjectType = require('../object-types');
var SpanTypes = require('../span-types');
var api = require('../insightly-api');

var _ = require('lodash');

function TaskIntent() {
	
	BaseIntent.call(this);
	var self = this;

	function mapTask(response) {
		return new Task(response.Title, response.DUE_DATE, response.PRIORITY, response.STATUS, response.PERCENT_COMPLETE, response.TASK_ID);
	}

	function mapCreateResponse(response) {
		var task = mapTask(response);
		return new IntentResponse(ObjectType.TASKS, [task], false, true);
	}

	function mapResponse(response) {

		var dataResults = _.map(response.body, function(l) {
			return mapTask(l);
		});
		return new IntentResponse(ObjectType.TASKS, dataResults);
	}

	self.create = function(name, dueDate, priority) {
		var task = new Task(name, new Date(dueDate), PriorityType.parse(priority));
		return api.post(ObjectType.TASKS, task)
			.then(mapCreateResponse)
			.catch(this.handleError);
	};

	self.get = function(span) {
		var spanType = !span ? SpanTypes.WEEK : SpanTypes.parse(span);
		return api.getForSpan(ObjectType.TASKS, spanType, 'DUE_DATE')
			.then(mapResponse)
			.catch(this.handleError);
	};

	self.delete = function(id) {

		return api.delete(ObjectType.TASKS, id);
	};

	return self;
}

TaskIntent.prototype = Object.create(BaseIntent.prototype);

module.exports = TaskIntent;
