var Lead = require('./lead');
var IntentResponse = require('../intent-response');
var BaseIntent = require('../base-intent');
var SpanTypes = require('../span-types');
var ObjectType = require('../object-types');
var api = require('../insightly-api');

var _ = require('lodash');

function LeadsIntent() {

	BaseIntent.call(this);
	var self = this;

	function mapLead(result) {
		
		var phone = result.MOBILE_PHONE_NUMBER || result.PHONE_NUMBER;
		var lead = new Lead(result.FIRST_NAME, result.LAST_NAME, result.ORGANIZATION_NAME, phone, result.EMAIL_ADDRESS, result.LEAD_ID);
		lead.DATE_CREATED = result.DATE_CREATED_UTC;
		lead.CONVERTED = result.CONVERTED;
		return lead;
	}

	function mapCreateResponse(response) {
		
		var lead = mapLead(response);
		return new IntentResponse(ObjectType.LEADS, [lead]);
	}

	function mapResponse(response) {

		var dataResults = _.map(response.body, function(l) {
			return mapLead(l);
		});
		return new IntentResponse(ObjectType.LEADS, dataResults);
	}

	self.get = function(span) {

		var spanType = !span ? SpanTypes.WEEK : SpanTypes.parse(span);

		return api.getForSpan(ObjectType.LEADS, spanType, 'DATE_CREATED_UTC')
			.then(mapResponse)
			.catch(this.handleError);
	};

	self.create = function(firstName, lastName, company, phoneNumber, email) {

		var lead = new Lead(firstName, lastName, company, phoneNumber, email);
		return api.post(ObjectType.LEADS, lead)
			.then(mapCreateResponse)
			.catch(this.handleError);
	};

	self.delete = function(id) {

		return api.delete(ObjectType.LEADS, id);
	};

	return self;
}

LeadsIntent.prototype = Object.create(BaseIntent.prototype);

module.exports = LeadsIntent;
