var PriorityTypes = require('./priority-types');

var moment = require('moment');
var _ = require('lodash');

function Task(name, dueDate, priority, status, percentComplete, id) {

	var self = this;
	self.TITLE = name;
	self.DUE_DATE = dueDate;
	self.PRIORITY = priority;
	self.STATUS = status || 'Not Started';
	self.PERCENT_COMPLETE = percentComplete;
	self.COMPLETED = false;
	self.PUBLICLY_VISIBLE = true;
	self.OWNER_USER_ID = process.env.USER_ID;
	self.RESPONSIBLE_USER_ID = process.env.USER_ID;
	self.ID = id;
	return self;
}

Task.prototype.format = function() {

	var response = this.TITLE;

	if(this.DUE_DATE) {
		response +='<break time="500ms"/> due '+ moment(this.DUE_DATE).format('MMMM Do YYYY');
	}
	if(this.PRIORITY &&  _.findKey(PriorityTypes, this.PRIORITY)) {
		response +='<break time="500ms"/> with a  '+ _.findKey(PriorityTypes, this.PRIORITY) +' priority';
	}
	if(this.PERCENT_COMPLETE) {
		response +='<break time="500ms"/> '+this.PERCENT_COMPLETE +' percent complete';
	}
	if(this.STATUS) {
		response +='<break time="500ms"/> with '+this.STATUS +' status';
	}
	return response;
};

module.exports = Task;