var Project = require('./project');
var IntentResponse = require('../intent-response');
var BaseIntent = require('../base-intent');
var ObjectType = require('../object-types');
var api = require('../insightly-api');

var _ = require('lodash');

function ProjectIntent() {
	BaseIntent.call(this);
	var self = this;

	function mapProject(response) {

		return new Project(response.PROJECT_NAME, response.PROJECT_DETAILS, response.STATUS, response.STARTED_DATE, response.COMPLETED_DATE, response.PROJECT_ID);
	}

	function mapCreateResponse(response) {
		
		var project = mapProject(response);
		return new IntentResponse(ObjectType.PROJECTS, [project], false, true);
	}

	function mapResponse(response) {

		var dataResults = _.map(response.body, function(p) {
			return mapProject(p);
		});

		return new IntentResponse(ObjectType.PROJECTS, dataResults);
	}

	function getForSpan(span) {
		var spanType = !span ? SpanTypes.WEEK : SpanTypes.parse(span);
		return api.getForSpan(ObjectType.PROJECTS, spanType, 'DATE_CREATED_UTC')
			.then(mapResponse)
			.catch(this.handleError);
	}

	function getFiltered(name) {

		var filter = new FilterData('PROJECT_NAME', 'eq', name)
		return api.filteredGet(ObjectType.PROJECTS, [filter])
			.then(mapResponse)
			.catch(this.handleError);
	}

	self.create = function(name, details) {
		
		var project = new Project(name, details);
		return api.post(ObjectType.PROJECTS, project)
			.then(mapCreateResponse)
			.catch(this.handleError);
	};

	self.get = function(span, name) {
		return name ? getFiltered(name) : getForSpan(span);
	};

	self.delete = function(id) {

		return api.delete(ObjectType.PROJECTS, id);
	};

	return self;
}

ProjectIntent.prototype = Object.create(BaseIntent.prototype);
module.exports = ProjectIntent;

