var rp = require('request-promise');
var moment = require('moment');
var _ = require('lodash');

var SpanTypes = require('./span-types');
var FilterData = require('./filter-data');
var API = process.env.INSIGHTLY_URL;
var TOKEN = process.env.INSIGHTLY_TOKEN;

//broken out so we can run tests for getCurrentWeekString
function getStart(type) {
	return moment().startOf(type).utc().format();
}
//broken out so we can run tests for getSpanString
function getEnd(type) {
	return moment().endOf(type).utc().format();
}

function getSpanString(type, span, field) {

	if(!span || span === SpanTypes.UNKNOWN) {
		throw new Error('Unknown Span');
	}
	
	var start = getStart(span);
	var end = getEnd(span);

	var queryString = _.template('${field}%20gt%20DateTime\'${start_date}\'and%20${field}%20lt%20DateTime\'${end_date}\'')({
		field: field || 'DATE_CREATED_UTC',
		start_date: start,
		end_date: end
	});

	return queryString;
}

function getFilteredString(filteredData) {

	var filter = _.map(filteredData, function(filter) {
		return filter.field+"%20"+filter.operator+"%20'"+filter.value+"'";
	});
	return filter.join('and%20');

}
//needs to be updated to work like filtered string
function getForSpan(route, span, field) {
	var options = {
		method: 'GET',
		uri: API + route + '?brief=true&$filter=' + getSpanString(route, span, field),
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
		uri: API + route + '?brief=true',
		resolveWithFullResponse: true,
		json: true,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Basic ' + new Buffer(TOKEN).toString('base64')
		}
	};

	return rp(options);
}

function filteredGet(route, filterData) {
	var filter = getFilteredString(filterData);
	var options = {
		method: 'GET',
		uri: API + route + "?brief=true&$filter="+filter,
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
