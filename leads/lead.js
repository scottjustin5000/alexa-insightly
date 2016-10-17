function Lead(firstName, lastName, company, phoneNumber, email, id) {
	
	if(!firstName || !lastName) {
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

};

module.exports = Lead;