var api = require('../insightly-api.js');
var _ = require('lodash');

describe('Test insightly api helper', function() {

	it('should produce valid current week odata request', function(done) {
		var start = api.getStart('week');
		var end = api.getEnd('week');
		var queryString = api.getSpanString('leads','week');
		var compare = "DATE_CREATED_UTC%20gt%20DateTime'"+start+"'and%20DATE_CREATED_UTC%20lt%20DateTime'"+end+"'";
		queryString.should.equal(compare);
		done();
	});
});

// describe('integration tests for insightly api helper', function() {
// 	var contact;
// 	before(function(done){
// 		done();
// 		//create
// 	});

// 	after(function(done){
// 		done()
// 		//delete
// 	});

// 	it.skip('should return 200', function(done) {
// 		return api.getForSpan('contacts', 'week').then(function(response) {
// 			var code = response.statusCode;
// 			code.should.equal(200);
// 			done();
// 		});
		
// 	});

// 	it.skip('should return contacts created this today only', function(done) {
// 		return api.getForSpan('contacts', 'today').then(function(response) {
// 			var code = response.statusCode;
// 			//need to check for week
// 			code.should.equal(200);
// 			done();
// 		});
// 	});

// 	it.skip('should return contacts created this today only', function(done) {
// 		return api.getForSpan('contacts', 'week').then(function(response) {
// 			var code = response.statusCode;
// 			//need to check for week
// 			code.should.equal(200);
// 			done();
// 		});
// 	});

// 	it.skip('should return contacts created this today only', function(done) {
// 		return api.getForSpan('contacts', 'month').then(function(response) {
// 			var code = response.statusCode;
// 			code.should.equal(200);
// 			done();
// 		});
// 	});
// });

