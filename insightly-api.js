var rp = require('request-promise');
var moment = require('moment');
var rp = require('request-promise');
var _ = require('lodash');

var SpanTypes = require('./span-types');

var API = process.env.INSIGHTLY_URL;
var TOKEN = process.env.INSIGHTLY_TOKEN;

var spanFields = {'contacts':'DATE_CREATED_UTC', 'organizations': 'DATE_CREATED_UTC', 'tasks':'DUE_DATE', 'projects': 'DUE_DATE', 'opportunities':'', 'leads':'DATE_CREATED_UTC'};

//broken out so we can run tests for getCurrentWeekString
function getStart(type) {
	return moment().startOf(type).utc().format();
}
//broken out so we can run tests for getSpanString
function getEnd(type) {
	return moment().endOf(type).utc().format();
}

function getSpanString(type, span) {

	if(!span || span === SpanTypes.UNKNOWN) {
		throw new Error('Unknown Span');
	}
	
	var start = getStart(span);
	var end = getEnd(span);

	var queryString = _.template('$filter=DATE_CREATED_UTC%20gt%20DateTime\'${start_date}\'and%20DATE_CREATED_UTC%20lt%20DateTime\'${end_date}\'')({
		field: spanFields[type] || 'DATE_CREATED_UTC',
		start_date: start,
		end_date: end
	});

	return queryString;
}

function getForSpan(route, span) {
	var options = {
		method: 'GET',
		uri: API + route + "?brief=true&" + getSpanString(route, span),
		resolveWithFullResponse: true,
		json: true,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Basic ' + new Buffer(TOKEN).toString('base64')
		}
	};

	return rp(options);
}

function get(route) {
	var options = {
		method: 'GET',
		uri: API + route + "?brief=true",
		resolveWithFullResponse: true,
		json: true,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Basic ' + new Buffer(TOKEN).toString('base64')
		}
	};

	return rp(options);
}

function filteredGet(route, term, field) {
	var options = {
		method: 'GET',
		uri: API + route + "?brief=true",
		resolveWithFullResponse: true,
		json: true,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Basic ' + new Buffer(TOKEN).toString('base64')
		}
	};

	return rp(options);
}

function post(route, data) {
		var options = {
		method: 'POST',
		uri: API + route,
		body: data,
    	json: true,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Basic ' + new Buffer(TOKEN).toString('base64')
		}
	};

	return rp(options);
}

function remove(route, id) {
	var options = {
		method: 'DELETE',
		uri: API + route + '/'+id,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Basic ' + new Buffer(TOKEN).toString('base64')
		}
	};

	return rp(options);
}

module.exports = {
	get: get,
	getForSpan: getForSpan,
	post: post,
	delete : remove,
	//exposed for testing
	getStart: getStart,
	getEnd: getEnd,
	filteredGet: filteredGet,
	getSpanString: getSpanString
}
