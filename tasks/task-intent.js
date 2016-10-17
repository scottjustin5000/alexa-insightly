var Task = require('./task');
var IntentResponse = require('../intent-response');
var BaseIntent = require('../base-intent');
var api = require('../insightly-api');

var _ = require('lodash');

function TaskIntent() {
	BaseIntent.call(this);
}

TaskIntent.prototype = Object.create(BaseIntent.prototype);

TaskIntent.prototype.mapResponse = function(response) {

	if (response.statusCode !== 200) {
		return this.handleError(response.statusCode);
	}

	var body = response.body;

	var dataResults = _.map(body, function(t) {
		return new Task(t.NAME, t.DUE_DATE, t.PRIORITY, t.STATUS, t.PERCENT_COMPLETE);
	});

	var response = new IntentResponse('Tasks', dataResults);
	return Promise.resolve(response);
}

TaskIntent.prototype.create = function(firstName, lastName, company, phoneNumber, email, rating) {
	var task = new Task(firstName,lastName, company, phoneNumber, email, rating);
	return api.post('tasks', task)
		.then(mapResponse)
		.catch(handleError);
}

TaskIntent.prototype.get = function(span) {
	return api.getBySpan('tasks', span)
		.then(this.mapResponse)
		.catch(this.handleError);
}

module.exports = TaskIntent;