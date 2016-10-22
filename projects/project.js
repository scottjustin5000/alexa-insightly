function Project(name, details, status, started, completed, id) {
	var self = this;
	self.PROJECT_NAME = name;
	self.PROJECT_DETAILS = details;
	self.STATUS = status || 'Not Started';
	self.STARTED_DATE = started;
	self.COMPLETED_DATE = completed;
	self.ID = id;
	return self;
}

Project.prototype.format = function() {
	
	var response = this.PROJECT_NAME;
	if(this.STATUS) {
		response +='<break time="500ms"/> with '+this.STATUS +' status';
	}
	if(this.STARTED_DATE) {
		response +='<break time="500ms"/> started on '+ moment(this.STARTED_DATE).format('MMMM Do YYYY');
	}
	if(this.COMPLETED_DATE) {
		response +='<break time="500ms"/> completed on  '+ moment(this.COMPLETED_DATE).format('MMMM Do YYYY');
	}
	if(this.PROJECT_DETAILS) {
		response += ('<break time="500ms"/> and here are some details about this ptojrct ' + this.PROJECT_DETAILS);
	}
	return response;
};
module.exports = Project;