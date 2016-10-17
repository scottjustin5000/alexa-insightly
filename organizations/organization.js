function Organization(name, phoneNumber, email) {
	
	if(!name) {
		throw new Error("Inavlid Contact: a valid organization name is required");
	}

	var self = this;
	self.name = name;
	self.phoneNumber = phoneNumber;
	self.email = email;
	return self;
}
module.exports = Organization;