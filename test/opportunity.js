var Opportunity = require('../opportunities/opportunity');
var OpportunityIntent = require('../opportunities/opportunity-intent');

var moment = require('moment');
var _ = require('lodash');

describe('Test Opportunity Intent', function() {
	
	it('should fully format response', function(done){
		var opportunity = new Opportunity('super duper', 'we\'ll be rich!');
		var val = opportunity.format();
		val.should.equal('super duper<break time="500ms"/> and here are some details about this opportunity<break time="500ms"/>we\'ll be rich!');
		done();
	});

});

describe('Opportunities intent integration test', function() {
	var opportunity;
	var intent = new OpportunityIntent();

	after(function(done) {
		return intent.delete(opportunity.ID).then(function(){
			done();
		});
	});

	it('should create new Opportunity', function(done){
		return intent.create('great big deal','some details')
		.then(function(res) {
			res.should.be.an.instanceOf(Object);
			res.should.have.property('type', 'Opportunities');
			res.should.have.property('responseData');
			res.responseData.should.be.an.instanceOf(Array);
			opportunity = res.responseData[0];
			opportunity.should.have.property('OPPORTUNITY_NAME', 'great big deal');
			opportunity.should.have.property('OPPORTUNITY_DETAILS', 'some details');
			done();
		});
	});
	
	it('should get opportunities created today', function(done){
		return intent.get('today').then(function(res){
			res.should.have.property('responseData');
			res.responseData.should.be.an.instanceOf(Array);
			var results = res.responseData;
			var found = _.first(results, function(r){
				return r.ID === opportunity.ID;
			});
			done();
		});
	});

});