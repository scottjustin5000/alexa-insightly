function Project(name, dueDate) {
	var self = this;
	self.name = name;
	self.dueDate = dueDate;
	return self;
}

module.exports = Project;