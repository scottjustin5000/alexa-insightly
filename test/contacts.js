var Contact = require('../contacts/contact');
var ContactIntent = require('../contacts/contact-intent');
var _ = require('lodash');

describe('Test Contact Intent', function() {
	
	it('should fully format contact response', function(done) {
		var contactInfos = [{'TYPE': 'PHONE', 'LABEL':'work', 'DETAIL':'4155555555'}, {'TYPE': 'EMAIL', 'LABEL':'work', 'DETAIL':'some-one@fake.com'}];

		var contact = new Contact('scott', 'justin', contactInfos);
		var formatted = contact.format();
		formatted.should.equal('scott justin with the following contact information<break time="500ms"/> phone number 4 1 5 5 5 5 5 5 5 5<break time="500ms"/> email address some dash one at fake dot com');
		done();
	});

	it('should patially format contact response', function(done){
		var contactInfos = [{'TYPE': 'EMAIL', 'LABEL':'work', 'DETAIL':'some-one@fake.com'}];

		var contact = new Contact('scott', 'justin',contactInfos);
		var formatted = contact.format();
		formatted.should.equal('scott justin with the following contact information<break time="500ms"/> email address some dash one at fake dot com');
		done();
	});

	it('should minimally format contact response', function(done){
		var contact = new Contact('scott');
		var formatted = contact.format();
		formatted.should.equal('scott ');
		done();
	});

});

describe('Contacts intent integration test', function() {
	var contact;
	var intent = new ContactIntent();

	after(function(done) {
		return intent.delete(contact.ID).then(function(){
			done();
		});
	});

	it('should create new Contact', function(done){

		return intent.create('scott', 'justin', '4 1 5 5 5 5 5 5 5 5', 'something at fake dot gov')
		.then(function(res) {
			res.should.be.an.instanceOf(Object);
			res.should.have.property('type', 'Contacts');
			res.should.have.property('responseData');
			res.responseData.should.be.an.instanceOf(Array);
			contact = res.responseData[0];
			contact.should.have.property('FIRST_NAME', 'scott');
			contact.should.have.property('LAST_NAME', 'justin');
			contact.should.have.property('CONTACTINFOS');
			done();
		});
	});
	
	it('should find my contact', function(done){
		return intent.get(contact.FIRST_NAME, contact.LAST_NAME).then(function(res){
			res.should.be.an.instanceOf(Object);
			res.should.have.property('type', 'Contacts');
			res.should.have.property('responseData');
			res.responseData.should.be.an.instanceOf(Array);
			var match = res.responseData[0];
			match.ID.should.equal(contact.ID);
			done();
		});
	});

});