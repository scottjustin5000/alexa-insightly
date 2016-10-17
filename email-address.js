function EmailAddress(email) {
	var self = this;
	self.email = email;
	return self;
}

EmailAddress.prototype.convertFromSpeech = function() {
	return (this.email
               .replace(/\b(at)\b/ig, '@')
               .replace(/\b(dot)\b/ig, '.')
               .replace(/\b(underscore)\b/ig, '_')
               .replace(/\b(hyphen|dash)\b/ig, '-')
               .replace(/ /ig, '')
               .toLowerCase());
};

EmailAddress.prototype.convertToSpeech = function() {
	
	return (this.email
               .replace(/\b(@)\b/ig, ' at ')
               .replace(/\b(\.)\b/ig, ' dot ')
               .replace(/\b(_)\b/ig, ' underscore ')
               .replace(/\b(-)\b/ig, ' dash ')
               .toLowerCase());
};

module.exports = EmailAddress;