var Lead = require('../leads/lead');
var LeadIntent = require('../leads/lead-intent');
var _ = require('lodash');

describe('Test Leads Intent', function() {
	
//test various permutations of format

});

describe('Leads intent integration test', function() {
	var lead;
	var intent = new LeadIntent();

	after(function(done) {
		return intent.delete(lead.ID).then(function(){
			done();
		});
	});

	it('should create new lead', function(done){
		return intent.create('scott','justin','5000','4155555555', 'foo@insight.ly').then(function(res) {
			//console.log(res)
			res.should.be.an.instanceOf(Object);
			res.should.have.property('type', 'Leads');
			res.should.have.property('responseData');
			res.responseData.should.be.an.instanceOf(Array);
			lead = res.responseData[0];
			lead.should.have.property('FIRST_NAME', 'scott');
			lead.should.have.property('LAST_NAME', 'justin');
			lead.should.have.property('ORGANIZATION_NAME', '5000');
			lead.should.have.property('PHONE_NUMBER', '4155555555');
			lead.should.have.property('EMAIL_ADDRESS', 'foo@insight.ly');
			done();
		});
	});
	
	it('should get leads created today', function(done){
		return intent.get('today').then(function(res){
			res.should.have.property('responseData');
			res.responseData.should.be.an.instanceOf(Array);
			var results = res.responseData;
			var found = _.first(results, function(r){
				return r.ID = lead.ID;
			});
			done();
		});
	});

});