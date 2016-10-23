var Event = require('../events/event');
var EventIntent = require('../events/event-intent');

var moment = require('moment');
var _ = require('lodash');

describe('Test Event Intent', function() {
	
	it('should fully format event response', function(done) {
		var start = new Date();
		var evt = new Event('some event', moment.utc(start).toDate(), moment.utc(start).toDate(), true, 'office 101', 'detail details details');
		var formatted = evt.format();
		formatted.should.equal('some event<break time="500ms"/> located in office 101<break time="500ms"/> this is an all day event <break time="500ms"/> beginning '+moment(start).local().format('MMMM Do YYYY, h:mm:ss a') +'<break time="500ms"/> the following details accompany this event detail details details');
		done();
	});

	it('should minimally format event response', function(done){

		var start = new Date();
		var end = new Date();
		end.setHours(end.getHours() + 2);
		var evt = new Event('some event', moment.utc(start).toDate(), moment.utc(end).toDate());
		var formatted = evt.format();
		formatted.should.equal('some event<break time="500ms"/> beginning '+moment(start).local().format('MMMM Do YYYY, h:mm:ss a')+'<break time="500ms"/> ending '+moment(end).local().format('MMMM Do YYYY, h:mm:ss a'));
		done();
	});

});

describe('Events intent integration test', function() {
	var event;
	var intent = new EventIntent();

	after(function(done) {
		return intent.delete(event.ID).then(function(){
			done();
		});
	});

	it('should create new Event', function(done){

		var date = moment(new Date()).format('YYYY-MM-DD');
		return intent.create('discussion with', 'Frank', 'Rizzo',date, '23:00')
		.then(function(res) {
			res.should.be.an.instanceOf(Object);
			res.should.have.property('type', 'Events');
			res.should.have.property('responseData');
			res.responseData.should.be.an.instanceOf(Array);
			event = res.responseData[0];
			event.should.have.property('TITLE', 'discussion with Frank Rizzo');
			done();
		});
	});
	
	it('should find my events', function(done){
		return intent.get('today').then(function(res){
			res.should.have.property('responseData');
			res.responseData.should.be.an.instanceOf(Array);
			var results = res.responseData;
			var found = _.first(results, function(r){
				return r.ID === event.ID;
			});
			done();
		});
	});

	it('should find my events', function(done){
		return intent.get('week').then(function(res){
			res.should.have.property('responseData');
			res.responseData.should.be.an.instanceOf(Array);
			var results = res.responseData;
			var found = _.first(results, function(r){
				return r.ID === event.ID;
			});
			done();
		});
	});


});