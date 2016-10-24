var _ = require('lodash');

function IntentResponse(type, responseData, error, createdResponse) {
	var self = this;
	self.type = type;
	self.responseData = responseData; //array of {objects} TODO validation
	self.inError = error; //bool
	self.createdResponse = createdResponse; //bool
	return self;
}

IntentResponse.prototype.format = function() {
	if(this.inError) {
		return 'I\'m sorry, something has gone wrong and I was not able to complete your request.';
	}
	if(!this.responseData || !this.responseData.length) {
		return 'I\'m sorry, I couldn\'t find anything for your request';
	}
	var formattedObjectResponses = _.map(this.responseData, function(data) {
		return data.format();
	});
	var fullResponse = formattedObjectResponses.join('<break time="1s"/>');
	var intro = this.createdResponse ? 'The following was SuccessFully Created. '  : 'Here are the results for your '+this.type+'.'
	return intro +' <break time="500ms"/> ' + fullResponse;
};

module.exports = IntentResponse;

