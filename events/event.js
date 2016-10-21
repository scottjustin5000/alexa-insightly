var moment = require('moment');

function Event(title, start, end, allDay, location, details, id) {
	var self = this;
	self.TITLE = title;
	self.LOCATION = location;
	self.DETAILS = details;
	self.START_DATE_UTC = start;
	self.END_DATE_UTC = end;
	self.ALL_DAY = allDay;
	self.ID = id;

	return self;
}

Event.prototype.format = function() {
	var response = this.TITLE || 'untitled event';
	if(this.LOCATION) {
		response += '<break time="500ms"/> located in '+this.LOCATION;
	}
	if(this.ALL_DAY && this.START_DATE_UTC) {
		response +='<break time="500ms"/> this is an all day event ';
	}
	if(this.START_DATE_UTC) {
		response +='<break time="500ms"/> beginning '+ moment(this.START_DATE_UTC).local().format('MMMM Do YYYY, h:mm:ss a');
	}
	if(!this.ALL_DAY && this.END_DATE_UTC) {
		response +='<break time="500ms"/> ending '+ moment(this.END_DATE_UTC).local().format('MMMM Do YYYY, h:mm:ss a');
	}
	if(this.DETAILS){
		response +='<break time="500ms"/> the following details accompany this event '+ this.DETAILS;
	}
	return response;
};
module.exports = Event;
