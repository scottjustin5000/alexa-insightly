var Task = require('../tasks/task');
var TaskIntent = require('../tasks/task-intent');

var moment = require('moment');
var _ = require('lodash');

describe('Test Task Intent', function() {
	
	it('should fully format task response', function(done) {
		
		var dueDate = new Date();
		var task = new Task('my task', dueDate, 1, 'NOT_STARTED', 0);
		var formattedDueDate = moment(dueDate).format('MMMM Do YYYY');
		var val = task.format();
		val.should.equal('my task<break time="500ms"/> beginning '+formattedDueDate+'<break time="500ms"/> with NOT_STARTED status');
		done();
	});

	it('should patially format task response', function(done){
		
		var dueDate = new Date();
		var task = new Task('my task', dueDate);
		var formattedDueDate = moment(dueDate).format('MMMM Do YYYY');
		var val = task.format();
		val.should.equal('my task<break time="500ms"/> beginning '+formattedDueDate+'<break time="500ms"/> with Not Started status');
		done();
	});

	it('should minimally format task response', function(done){
		
		var task = new Task('my task');
		var val = task.format();
		val.should.equal('my task<break time="500ms"/> with Not Started status');
		done();
	});

});

describe('Tasks intent integration test', function() {
	
	var task;
	var intent = new TaskIntent();

	after(function(done) {
		return intent.delete(task.ID).then(function() {
			done();
		});
	});

	it('should create new Task', function(done) {

		return intent.create('my task', new Date(), 1, 'Not Started', 0)
		.then(function(res) {
			res.should.be.an.instanceOf(Object);
			res.should.have.property('type', 'Tasks');
			res.should.have.property('responseData');
			res.responseData.should.be.an.instanceOf(Array);
			task = res.responseData[0];
			task.should.have.property('TITLE', 'my task');
			task.should.have.property('STATUS', 'Not Started');
			task.should.have.property('PERCENT_COMPLETE', 0);
			done();
		});
	});
	
	it('should get leads created today', function(done) {

		return intent.get('today').then(function(res) {
			res.should.have.property('responseData');
			res.responseData.should.be.an.instanceOf(Array);
			var results = res.responseData;
			var found = _.first(results, function(r) {
				return r.ID === task.ID;
			});
			done();
		});
	});
});