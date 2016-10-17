var Project = require('./project');
var IntentResponse = require('../intent-response');
var api = require('../insightly-api');

function ProjectIntent() {


	function create() {

	}

	function get() {
	
	}

	return {
		create: create,
		get: get
	}
}

module.exports = ProjectIntent;