function Opportunity(name, description) {
	var self = this;
	self.OPPORTUNITY_NAME = name;
	self.OPPORTUNITY_DETAILS = description;
	self.PROBABILITY;
	self.OPPORTUNITY_STATE;
	self.FORECAST_CLOSE_DATE;
	self.ACTUAL_CLOSE_DATE;
	self.BID_AMOUNT;
	self.BID_CURRENCY;

	return self;
}

Opportunity.prototype.format = function() {
	// body...
};
module.exports = Opportunity;