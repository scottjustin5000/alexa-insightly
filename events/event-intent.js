var Event = require('./event');
var IntentResponse = require('./intent-response');
var api = require('../insightly-api');

function EventIntent() {


	function mapResponse(response) {

		if(response.statusCode !== 200){
			return handleError(response.statusCode);
		} 

		var body = response.body;
		//map responses to array


		return Promise.resolve();


	}

	function create() {
		var event = new Event();
		return api.post('events', event)
		.then(mapResponse)
		.catch(handleError);
	}

	function get(span) {
		return api.getBySpan('events', event)
		.then(mapResponse)
		.catch(handleError);
	}

	return {
		create: create,
		get: get
	}
}

module.exports = EventIntent;