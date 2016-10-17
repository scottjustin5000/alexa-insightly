var EmailAddress = require('../email-address');

function Lead(firstName, lastName, company, phoneNumber, email, id) {
	
	if(!firstName && !lastName) {
		throw new Error("Inavlid Lead: a valid contact name is required");
	}
	var self = this;
	//this format is req for Insightly API
	self.FIRST_NAME = firstName;
	self.LAST_NAME = lastName;
	self.ORGANIZATION_NAME = company;
	self.PHONE_NUMBER = phoneNumber;
	self.EMAIL_ADDRESS = email;
	self.ID = id;
	self.DATE_CREATED;
	return self;
}

Lead.prototype.format = function(){
	
	var response = (this.FIRST_NAME || '') + ' ' + (this.LAST_NAME || '');
	if(this.ORGANIZATION_NAME) {
		response += ('<break time="500ms"/> from ' + this.ORGANIZATION_NAME);
	}
	if(this.PHONE_NUMBER) {
		var numbers = this.PHONE_NUMBER.replace(/\D/g, '');
		var textNumbers = [];
		for(var i = 0; i < numbers.length; i++) {
			textNumbers.push(numbers[i]);
		}
		response += ('<break time="500ms"/> phone number ' + textNumbers.join(' '));
	}
	if(this.EMAIL_ADDRESS) {
		var address = new EmailAddress(this.EMAIL_ADDRESS);
	    response += ('<break time="500ms"/> with email address ' + address.convertToSpeech());
	}
	if(this.DATE_CREATED) {
		response += '<break time="500ms"/> created on ' + this.DATE_CREATED.toLocaleDateString('en-US');
	}
	return response;
};

module.exports = Lead;