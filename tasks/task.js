var PriorityTypes = require('./priority-types');

var moment = require('moment');
var _ = require('lodash');

function Task(name, dueDate, priority, status, percentComplete, id) {

	var self = this;
	self.NAME = name;
	self.DUE_DATE = dueDate;
	self.PRIORITY = priority;
	self.STATUS = status;
	self.PERCENT_COMPLETE = percentComplete;
	self.ID = id;
	return self;
}

Task.prototype.format = function() {

	var response = this.NAME;

	if(this.DUE_DATE) {
		response +='<break time="500ms"/> beginning '+ moment(this.DUE_DATE).format('MMMM Do YYYY');
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