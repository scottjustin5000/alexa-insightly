function Contact(firstName, lastName, contactInfos, id) {
	
	if(!firstName || !lastName) {
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
	// need to map contact infos
};

module.exports = Contact;