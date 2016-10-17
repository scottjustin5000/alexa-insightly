var IntentResponse = require('./intent-response');

function BaseIntent() {

}

BaseIntent.prototype.handleError = function(error) {

	if (process.env.ENVIRONMENT === 'local') {
		console.log(error);
		if (error.stack) {
			console.log(error.stack);
		}
	}
	return new IntentResponse(undefined, undefined, true);
};

module.exports = BaseIntent;
