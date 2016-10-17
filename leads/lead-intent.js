var Lead = require('./lead');
var _ = require('lodash');

var IntentResponse = require('../intent-response');
var BaseIntent = require('../base-intent');
var SpanTypes = require('../span-types');
var api = require('../insightly-api');

function LeadsIntent() {

	BaseIntent.call(this);
	var self = this;

	function mapLead(result) {
		
		var phone = result.MOBILE_PHONE_NUMBER || result.PHONE_NUMBER;
		var lead = new Lead(result.FIRST_NAME, result.LAST_NAME, result.ORGANIZATION_NAME, phone, result.EMAIL_ADDRESS, result.RATING, result.LEAD_ID);
		lead.DATE_CREATED = result.DATE_CREATED_UTC;
		lead.CONVERTED = result.CONVERTED;
		return lead;
	}

	function mapCreateResponse(response) {
		
		var lead = mapLead(response);
		return new IntentResponse('Leads', [lead]);
	}

	function mapResponse(response) {

		var responseData = response.body ? response.body : response;
		var dataResults = _.map(responseData, function(l) {
			return mapLead(l);
		});
		return new IntentResponse('Leads', dataResults);
	}

	function getForSpan(span) {

		var spanType = !span ? SpanTypes.WEEK : SpanTypes.parse(span);

		return api.getForSpan('leads', spanType)
			.then(mapResponse)
			.catch(this.handleError);
	}

	self.create = function(firstName, lastName, company, phoneNumber, email) {

		var lead = new Lead(firstName, lastName, company, phoneNumber, email);
		return api.post('leads', lead)
			.then(mapCreateResponse)
			.catch(this.handleError);
	};

	self.delete = function(id) {

		return api.delete('leads', id);
	};

	return self;
}

LeadsIntent.prototype = Object.create(BaseIntent.prototype);

module.exports = LeadsIntent;
