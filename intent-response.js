var _ = require('lodash');

function IntentResponse(type, responseData, error) {
	var self = this;
	self.type = type;
	self.responseData = responseData; //array of {objects} TODO validation
	self.inError = error; //bool
	return self;
}

IntentResponse.prototype.format = function(){
	if(this.inError) {
		return 'I\'m sorry, something has gone wrong and I was not able to complete your request.'
	}
	if(!this.responseData || !this.responseData.length) {
		return 'I\'m sorry, I couldn\'t find anything for your request';
	}
	var formattedObjectResponses = _.map(this.responseData, function(data) {
		return data.format();
	});
	var fullResponse = formattedObjectResponses.join('<break time="1s"/>');
	return 'Here are the result for your '+this.type+'. <break time="500ms"/> ' + fullResponse;
};

module.exports = IntentResponse;

