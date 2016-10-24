var api = require('../insightly-api.js');
var _ = require('lodash');

describe('Test insightly api helper', function() {

	it('should produce valid current week odata request', function(done) {
		var start = api.getStart('week');
		var end = api.getEnd('week');
		var queryString = api.getSpanString('week', 'DATE_CREATED_UTC');
		var compare = "DATE_CREATED_UTC%20gt%20DateTime'"+start+"'and%20DATE_CREATED_UTC%20lt%20DateTime'"+end+"'";
		queryString.should.equal(compare);
		done();
	});
});


