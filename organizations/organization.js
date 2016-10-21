function Organization(name, contactInfos, id) {
	
	if(!name) {
		throw new Error("Invalid Organization: a valid name is required");
	}

	var self = this;
	self.ORGANISATION_NAME = name;
	self.CONTACTINFOS = contactInfos;
	self.ID = id;
	return self;
}

Organization.prototype.format = function() {
	// body...
};

module.exports = Organization;