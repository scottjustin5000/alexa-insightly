var Lead = require('../leads/lead');
var LeadIntent = require('../leads/lead-intent');
var _ = require('lodash');

describe('Test Leads Intent', function() {
	
	it('should fully format lead response', function(done){
		
		var lead = new Lead('scott', 'justin', '5000', '4155555555', 'some-one@fake.com');
		lead.DATE_CREATED = new Date();
		var formatted = moment(lead.DATE_CREATED).format('MMMM Do YYYY');
		var val = lead.format();
		val.should.equal('scott justin<break time="500ms"/> from 5000<break time="500ms"/> phone number 4 1 5 5 5 5 5 5 5 5<break time="500ms"/> with email address some dash one at fake dot com<break time="500ms"/> created on '+formatted);
		done();
	});

	it('should patially format lead response', function(done){
		
		var lead = new Lead(undefined, 'justin', undefined, undefined,'some-one@fake.com');
		var val = lead.format();
		val.should.equal(' justin<break time="500ms"/> with email address some dash one at fake dot com');
		done();
	});

	it('should minimally format lead response', function(done){
		
		var lead = new Lead('scott');
		var val = lead.format();
		val.should.equal('scott ');
		done();
	});

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
		return intent.create('scott','justin','5000','4 1 5 5 5 5 5 5 5 5', 'foo at insight dot ly')
		.then(function(res) {
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
				return r.ID === lead.ID;
			});
			done();
		});
	});

});