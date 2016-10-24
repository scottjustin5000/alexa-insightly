var moment = require('moment');

function Opportunity(name, description, id) {
	var self = this;
	self.OPPORTUNITY_NAME = name;
	self.OPPORTUNITY_DETAILS = description;
	self.PROBABILITY;
	self.OPPORTUNITY_STATE = 'Open';
	self.FORECAST_CLOSE_DATE;
	self.ACTUAL_CLOSE_DATE;
	self.BID_AMOUNT;
	self.BID_CURRENCY;
	self.ID = id;

	return self;
}

Opportunity.prototype.format = function() {

	var response = this.OPPORTUNITY_NAME;
	
	if(this.BID_AMOUNT) {
	    response += ('<break time="500ms"/> for a bid amount of ' +  this.BID_AMOUNT + ' ' + this.BID_CURRENCY);
	}
	if(this.PROBABILITY) {
		response += ('<break time="500ms"/> this opportunity was given a probability of '+ this.PROBABILITY +' percent');
	}
	if(this.FORECAST_CLOSE_DATE) {
		response += '<break time="500ms"/> it was forecast to close on ' + moment(this.FORECAST_CLOSE_DATE).format('MMMM Do YYYY');
	}
	if(this.ACTUAL_CLOSE_DATE) {
		response += '<break time="500ms"/>it closed on ' + moment(this.ACTUAL_CLOSE_DATE).format('MMMM Do YYYY');
	}
	if(this.OPPORTUNITY_DETAILS) {
		response += ('<break time="500ms"/> and here are some details about this opportunity<break time="500ms"/>' + this.OPPORTUNITY_DETAILS);
	}
	return response;
};
module.exports = Opportunity;