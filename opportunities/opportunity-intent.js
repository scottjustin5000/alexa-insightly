var Opportunity = require('./opportunity');
var IntentResponse = require('../intent-response');
var BaseIntent = require('../base-intent');
var ObjectType = require('../object-types');
var FilterData = reqiore('../filter-data');
var api = require('../insightly-api');

var _ = require('lodash');

function OpportunityIntent() {
	BaseIntent.call(this);
	var self = this;

	function mapOpportunity(result) {
		var opportunity = new Opportunity(result.OPPORTUNITY_NAME, result.OPPORTUNITY_DETAILS);
		opportunity.PROBABILITY;
		opportunity.OPPORTUNITY_STATE;
		opportunity.FORECAST_CLOSE_DATE;
		opportunity.ACTUAL_CLOSE_DATE;
		opportunity.BID_AMOUNT;
		opportunity.BID_CURRENCY;
		return opportunity;
	}

	function mapCreateResponse(response) {
		
		var opp = mapOpportunity(response);
		return new IntentResponse(ObjectType.OPPORTUNITIES, [opp]);
	}

	function mapResponse(response) {

		var responseData = response.body ? response.body : response;
		var dataResults = _.map(responseData, function(l) {
			return mapOpportunity(l);
		});
		return new IntentResponse(ObjectType.OPPORTUNITIES, dataResults);
	}

	function getForSpan(span) {

		return api.getForSpan(ObjectType.OPPORTUNITIES, span, 'DATE_CREATED_UTC')
			.then(mapResponse)
			.catch(this.handleError);
	}

	function find (oppname) {
		var filter = new FilterData('OPPORTUNITY_NAME', 'eq', oppname)
		return api.filteredGet(ObjectType.OPPORTUNITIES, [filter])
			.then(mapResponse)
			.catch(this.handleError);
	}

	self.create = function(name, description) {

		var opp = new Opportunity(name, description);
		return api.post(ObjectType.OPPORTUNITIES, opp)
			.then(mapCreateResponse)
			.catch(this.handleError);
	};

	self.get = function(opportunityName, span) {
		return opportunityName ? search(opportunityName) : get(span);
	};

	self.delete = function(id) {

		return api.delete(ObjectType.OPPORTUNITIES, id);
	};

	return self;
}

OpportunityIntent.prototype = Object.create(BaseIntent.prototype);

module.exports = OpportunityIntent;