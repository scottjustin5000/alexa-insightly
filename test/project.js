var Project = require('../projects/project');
var ProjectIntent = require('../projects/project-intent');

var moment = require('moment');
var _ = require('lodash');

describe('Test Project Intent', function() {
	
	it('should fully format response', function(done){
		var project = new Project('project number 1', 'left foot in front of right');
		var val = project.format();
		done();
	});

});

describe('Projects intent integration test', function() {
	
	var project;
	var intent = new ProjectIntent();

	after(function(done) {
		return intent.delete(project.ID).then(function(){
			done();
		});
	});

	it('should create new Project', function(done){
		
		return intent.create('new fab project','dets, dets, and more dets')
		.then(function(res) {
			res.should.be.an.instanceOf(Object);
			res.should.have.property('type', 'Projects');
			res.should.have.property('responseData');
			res.responseData.should.be.an.instanceOf(Array);
			project = res.responseData[0];
			project.should.have.property('PROJECT_NAME', 'new fab project');
			project.should.have.property('PROJECT_DETAILS', 'dets, dets, and more dets');
			done();
		});
	});
	
	it('should get projects created today', function(done){
		
		return intent.get('today').then(function(res){
			res.should.have.property('responseData');
			res.responseData.should.be.an.instanceOf(Array);
			var results = res.responseData;
			var found = _.first(results, function(r){
				return r.ID === project.ID;
			});
			done();
		});
	});

});