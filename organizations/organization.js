function Organization(name, contactInfos) {
	
	if(!name) {
		throw new Error("Inavlid Organization: a valid name is required");
	}

	var self = this;
	self.name = name;
	self.CONTACTINFOS = contactInfos;
	return self;
}

Organization.prototype.format = function() {
	// body...
};

module.exports = Organization;