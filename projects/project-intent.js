var Project = require('./project');
var IntentResponse = require('../intent-response');
var BaseIntent = require('../base-intent');
var ObjectType = require('../object-types');
var api = require('../insightly-api');

function ProjectIntent() {
	BaseIntent.call(this);
	var self = this;



	function mapCreateResponse(response) {

	}

	function mapResponse(response) {

		if (response.statusCode !== 200) {
			return this.handleError(response.statusCode);
		}

		var body = response.body;

		var dataResults = _.map(body, function(tp) {
			return new Project( t.ID);
		});

		var response = new IntentResponse(ObjectType.PROJECTS, dataResults);
		return response
	}

	self.create = function(name, dueDate, details) {
		var project = new Project(name, dueDate, details);
		return api.post(ObjectType.PROJECTS, project)
			.then(mapResponse)
			.catch(handleError);
	};

	self.get = function(span) {
		return api.getBySpan(ObjectType.PROJECTS, span, 'DUE_DATE')
			.then(this.mapResponse)
			.catch(this.handleError);
	};

	return self;
}

ProjectIntent.prototype = Object.create(BaseIntent.prototype);
module.exports = ProjectIntent;

