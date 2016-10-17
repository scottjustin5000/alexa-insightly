function Task(name, dueDate, priority, status, percentComplete) {

	var self = this;
	self.NAME = name;
	self.DUE_DATE = dueDate;
	self.PRIORITY = priority;
	self.STATUS = status;
	self.PERCENT_COMPLETE = percentComplete;
	return self;
}

Task.prototype.format = function() {
	

};

module.exports = Task;