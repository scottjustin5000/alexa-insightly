var Task = require('./task');
var IntentResponse = require('../intent-response');
var PriorityType = require('./priority-types');
var BaseIntent = require('../base-intent');
var ObjectType = require('../object-types');
var api = require('../insightly-api');

var _ = require('lodash');

function TaskIntent() {
	BaseIntent.call(this);
	var self = this;

	function mapTask(response) {
		return new Task(response.NAME, response.DUE_DATE, response.PRIORITY, response.STATUS, response.PERCENT_COMPLETE, response.TASK_ID);
	}

	function mapCreateResponse(response) {
		var task = mapTask(response);
		return new IntentResponse(ObjectType.TASKS, [task]);
	}

	function mapResponse(response) {

		var dataResults = _.map(response.body, function(l) {
			return mapLead(l);
		});
		return new IntentResponse(ObjectType.TASKS, dataResults);
	}

	self.create = function(name, dueDate, priority) {
		var task = new Task(name, dueDate, PriorityType.parse(priority));
		return api.post(ObjectType.TASKS, task)
			.then(mapResponse)
			.catch(handleError);
	};

	self.get = function(span) {
		return api.getBySpan(ObjectType.TASKS, span, 'DUE_DATE')
			.then(this.mapResponse)
			.catch(this.handleError);
	};

	return self;
}

TaskIntent.prototype = Object.create(BaseIntent.prototype);

module.exports = TaskIntent;
