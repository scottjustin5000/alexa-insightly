var BaseIntent = require('../base-intent');
var Event = require('./event');
var IntentResponse = require('../intent-response');
var SpanTypes = require('../span-types');
var ObjectType = require('../object-types');
var api = require('../insightly-api');

var _ = require('lodash');
var moment = require('moment');

function EventIntent() {

	BaseIntent.call(this);
	var self = this;

	function mapEvent(response) {

		var event = new Event(response.TITLE, response.START_DATE_UTC, response.END_DATE_UTC, response.ALL_DAY, response.LOCATION, response.DETAILS, response.EVENT_ID);
		return event;
	}
	
	function mapCreateResponse(response) {
		
		var event = mapEvent(response);
		return new IntentResponse(ObjectType.EVENTS, [event], false, true);
	}

	function mapResponse(response) {
		
		var dataResults = _.map(response.body, function(e) {
			return mapEvent(e);
		});
		return new IntentResponse(ObjectType.EVENTS, dataResults);
	}

	function getStartTime(date, time) {
		
		if(!date && !time) {
			return;
		}
		var eventDate = date ? moment(date).format('YYYY-MM-DD') : new Date();

		if(time) {
			return moment(eventDate + ' ' + time, 'YYYY-MM-DD HH:mm').utc().toDate();
		} else if(date && !time) {
			return moment(eventDate + ' 12:OO', 'YYYY-MM-DD HH:mm').toDate();
		} 
	}

	self.create = function(title, firstName, lastName, date, time) {

		var eventTitle = (title ||'') + ' ' +(firstName || '')+ ' '+(lastName || ' ');
		var eventDate = getStartTime(date, time);
		var end = moment(eventDate).add(1, 'hours').toDate();
		var event = new Event(eventTitle, eventDate, end);
		return api.post(ObjectType.EVENTS, event)
		.then(mapCreateResponse)
		.catch(this.handleError);
	}

	self.get = function(span) {
		var spanType = !span ? SpanTypes.WEEK : SpanTypes.parse(span);
		return api.getForSpan(ObjectType.EVENTS, spanType, 'START_DATE_UTC')
		.then(mapResponse)
		.catch(this.handleError);
	}

	self.delete = function(id) {

		return api.delete(ObjectType.EVENTS, id);
	};

}

module.exports = EventIntent;

EventIntent.prototype = Object.create(BaseIntent.prototype);