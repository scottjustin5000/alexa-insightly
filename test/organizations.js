var Organization = require('../organizations/organization');
var OrganizationIntent = require('../organizations/organization-intent');

var _ = require('lodash');

describe('Test Organization Intent', function() {
	
	it('should fully format organization response', function(done) {
		var contactInfos = [{'TYPE': 'PHONE', 'LABEL':'work', 'DETAIL':'4155555555'}, {'TYPE': 'EMAIL', 'LABEL':'work', 'DETAIL':'some-one@fake.com'}];

		var organization = new Organization('scott justin 5000', contactInfos);
		var formatted = organization.format();
		formatted.should.equal('scott justin 5000 with the following contact information<break time="500ms"/> phone number 4 1 5 5 5 5 5 5 5 5<break time="500ms"/> email address some dash one at fake dot com');
		done();
	});

	it('should patially format organization response', function(done){
		var contactInfos = [{'TYPE': 'EMAIL', 'LABEL':'work', 'DETAIL':'some-one@fake.com'}];

		var organization = new Organization('scott justin 5000',contactInfos);
		var formatted = organization.format();
		formatted.should.equal('scott justin 5000 with the following contact information<break time="500ms"/> email address some dash one at fake dot com');
		done();
	});

	it('should minimally format organization response', function(done){
		var organization = new Organization('scott justin 5000');
		var formatted = organization.format();
		formatted.should.equal('scott justin 5000');
		done();
	});

});

describe('Organization intent integration test', function() {
	
	var organization;
	var intent = new OrganizationIntent();

	after(function(done) {
		return intent.delete(organization.ID).then(function(){
			done();
		});
	});

	it('should create new Organization', function(done){

		return intent.create('scott justin 5000', '4 1 5 5 5 5 5 5 5 5', 'something at fake dot net')
		.then(function(res) {
			res.should.be.an.instanceOf(Object);
			res.should.have.property('type', 'Organisations');
			res.should.have.property('responseData');
			res.responseData.should.be.an.instanceOf(Array);
			organization = res.responseData[0];
			organization.should.have.property('ORGANISATION_NAME', 'scott justin 5000');
			organization.should.have.property('CONTACTINFOS');
			done();
		});
	});
	
	it('should find my contact', function(done) {

		return intent.get(organization.ORGANISATION_NAME).then(function(res){
			res.should.be.an.instanceOf(Object);
			res.should.have.property('type', 'Organisations');
			res.should.have.property('responseData');
			res.responseData.should.be.an.instanceOf(Array);
			var match = res.responseData[0];
			match.ID.should.equal(organization.ID);
			done();
		});
	});

});