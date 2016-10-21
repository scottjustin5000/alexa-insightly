var Task = require('../tasks/task');
var TaskIntent = require('../tasks/task-intent');
var _ = require('lodash');

describe('Test Task Intent', function() {
	
	it('should fully format task response', function(done) {
		//('my task', new Date(), 1, 'NOT_STARTED', 0)
		var task = new Task('my task', new Date(), 1, 'NOT_STARTED', 0);
		var formattedDueDate = task.DUE_DATE.toLocaleDateString('en-US');
		var val = task.format();
		val.should.equal();
		done();
	});

	it('should patially format task response', function(done){
		
		var task = new Task('my task', new Date());
		var val = task.format();
		val.should.equal('');
		done();
	});

	it('should minimally format task response', function(done){
		
		var task = new Task('my task';
		var val = task.format();
		val.should.equal('');
		done();
	});

});

describe('Tasks intent integration test', function() {
	var task;
	var intent = new TaskIntent();

	after(function(done) {
		return intent.delete(task.ID).then(function(){
			done();
		});
	});

	it('should create new Task', function(done){

		return intent.create('my task', new Date(), 1, 'NOT_STARTED', 0)
		.then(function(res) {
			res.should.be.an.instanceOf(Object);
			res.should.have.property('type', 'Tasks');
			res.should.have.property('responseData');
			res.responseData.should.be.an.instanceOf(Array);
			task = res.responseData[0];
			task.should.have.property('NAME', 'my task');
			task.should.have.property('STATUS', 'NOT_STARTED');
			task.should.have.property('PERCENT_COMPLETE', 0);
			done();
		});
	});
	
	it('should get leads created today', function(done){
		return intent.get('today').then(function(res){
			res.should.have.property('responseData');
			res.responseData.should.be.an.instanceOf(Array);
			var results = res.responseData;
			var found = _.first(results, function(r){
				return r.ID === task.ID;
			});
			done();
		});
	});

});