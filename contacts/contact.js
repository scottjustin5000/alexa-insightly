function Contact(firstName, lastName, organization, phoneNumber, email) {
	
	if(!firstName || !lastName) {
		throw new Error("Inavlid Contact: a valid contact name is required");
	}

	var self = this;

	self.firstName = firstName;
	self.lastName = lastName;
	self.organization = organization;
	self.phoneNumber = phoneNumber;
	self.email = email;

	return self;
}
module.exports = Contact;