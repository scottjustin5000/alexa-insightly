var _ = require('lodash');
var EmailAddress = require('../email-address');
var PhoneNumber = require('../phone-number');

function Contact(firstName, lastName, contactInfos, id) {
	
	if(!firstName && !lastName) {
		throw new Error("Inavlid Contact: a valid contact name is required");
	}

	var self = this;

	self.FIRST_NAME = firstName;
	self.LAST_NAME = lastName;
	self.CONTACTINFOS = contactInfos;
	self.ID = id;
	return self;
}

Contact.prototype.format = function() {
	var response = (this.FIRST_NAME || '')+' '+(this.LAST_NAME || '');
	if(this.CONTACTINFOS) {

		response += ' with the following contact information';
		_.forEach(this.CONTACTINFOS, function(info) {
			if(_.includes(info.TYPE, 'EMAIL')){
				var address = new EmailAddress(info.DETAIL);
	    		response += ('<break time="500ms"/> email address ' + address.convertToSpeech());
			}else if(_.includes(info.TYPE, 'PHONE')){
				var numbers = new PhoneNumber(info.DETAIL).convertToSpeech();
				response += ('<break time="500ms"/> phone number ' + numbers.join(' '));
			}
			else{
				response += '<break time="500ms"/> '+ info.LABEL + ' ' + info.TYPE + ' ' + info.DETAIL;
			}
		});
	}
	return response;
};

module.exports = Contact;