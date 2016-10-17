var _ = require('lodash');
var Promise = require('bluebird');
var Alexa = require('alexa-app');
var app = new Alexa.app('insightly-app');

var EmailAddress = require('./email-address');
var LeadsIntent = require('./leads/lead-intent');


app.launch(function(req, res) {
	var prompt = 'Ask my something about your Insight Lee CRM';
	res.say('').reprompt(prompt).shouldEndSession(false);
});

function parseEmail(email) {
	var address = new EmailAddress(email);
	return value;
}


app.intent('help_intent', {
		"slots": {},
		"utterances": [
			"help"
		]
	},
	function(request, response) {
		response.say("Here are some samples of what you can ask Insight Lee");

		var alt = Math.floor(Math.random() * (3 - 0 + 1)) + 0;

		switch (alt) {
			case 0:
				response.say("Get my leads for this week");
				break;
			case 1:
				response.say("Get my tasks due this week");
				break;
			case 2:
				response.say("Get the details for John Smith");
				break;
			case 3:
				response.say("Get my events for today");
				break;
			case 4:
				response.say("What are my meetings for today");
				break;
		}

		response.say(", or, ");

		alt = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
		switch (alt) {
			case 0:
				response.say("Create a new lead for John Smith From Acme Corp at 415 555 5555 at j dot smith at acme.com <break time=\"500ms\"/> ");
				break;
			case 1:
				response.say("Create a new opportunity for big opportunity with the following details: this is really something big.<break time=\"500ms\"/> ");
				break;
			case 2:
				response.say("Create a new task for eat the world due on October 31 2017<break time=\"500ms\"/>");
				break;
			case 3:
				response.say("Create a new project big project with the following details: this is a really cool project.<break time=\"500ms\"/> ");
				break;
			case 4:
				response.say("Create a new calendar event for lunch with draymond on November 22 2016 <break time=\"500ms\"/>");
				break;
		}

		response.send().shouldEndSession(false);
	}
);

app.intent('list_lead_intent', {
	"slots": [{
		"name": "TIMEFRAME",
		"type": "TIMESPANS"
	}],
	"utterances": [
		"Tell me my leads",
		"Tell me my leads for {-|TIMEFRAME}",
		"Get my leads for {-|TIMEFRAME}",
		"List {-|TIMEFRAME} leads"

	]
}, function(req, res) {

	var intent = new LeadsIntent();
	intent.getForSpan(timeFrame).then(function(response) {
		res.say(response.format()).send();
	});

});

app.intent('create_lead_intent', {
	"slots": [{
		"name": "FIRST_NAME",
		"type": "AMAZON.US_FIRST_NAME"
	}, {
		"name": "LAST_NAME",
		"type": "LASTNAMES"
	}, {
		"name": "PHONE_NUMBER",
		"type": "AMAZON.NUMBER"
	}, {
		"name": "COMPANY_NAME",
		"type": "LITERAL_NAMES"
	}, {
		"name": "EMAIL",
		"type": "EMAILS"
	}],
	"utterances": [
		"{Create|Add} {new|a} lead for {-|FIRST_NAME} {-|LAST_NAME} with phone number {-|PHONE_NUMBER} with email {-|EMAIL}",
		"{Create|Add} {new|a} lead for {-|FIRST_NAME} with phone number {-|PHONE_NUMBER} with email {-|EMAIL}",
		"{Create|Add} {new|a} lead for {-|LAST_NAME} with phone number {-|PHONE_NUMBER} with email {-|EMAIL}",
		"{Create|Add} {new|a} lead for {-|FIRST_NAME} {-|LAST_NAME} at {-|PHONE_NUMBER} with email {-|EMAIL}",
		"{Create|Add} {new|a} lead for {-|FIRST_NAME} at {-|PHONE_NUMBER} with email {-|EMAIL}",
		"{Create|Add} {new|a} lead for {-|LAST_NAME} at {-|PHONE_NUMBER} with email {-|EMAIL}",
		"{Create|Add} {new|a} lead for {-|FIRST_NAME} {-|LAST_NAME} at {-|EMAIL}",
		"{Create|Add} {new|a} lead for {-|FIRST_NAME} at {-|EMAIL}",
		"{Create|Add} {new|a} lead for {-|LAST_NAME} at email {-|EMAIL}",
		"{Create|Add} {new|a} lead for {-|FIRST_NAME} {-|LAST_NAME} {from|of} {COMPANY_NAME} with phone number {-|PHONE_NUMBER} with email {-|EMAIL}",
		"{Create|Add} {new|a} lead for {-|FIRST_NAME} {from|of} {COMPANY_NAME} with phone number {-|PHONE_NUMBER} with email {-|EMAIL}",
		"{Create|Add} {new|a} lead for {-|LAST_NAME} {from|of} {COMPANY_NAME} with phone number {-|PHONE_NUMBER} with email {-|EMAIL}",
		"{Create|Add} {new|a} lead for {-|FIRST_NAME} {-|LAST_NAME} {from|of} {COMPANY_NAME}  at {-|PHONE_NUMBER} with email {-|EMAIL}",
		"{Create|Add} {new|a} lead for {-|FIRST_NAME} {from|of} {COMPANY_NAME} at {-|PHONE_NUMBER} with email {-|EMAIL}",
		"{Create|Add} {new|a} lead for {-|LAST_NAME} {from|of} {COMPANY_NAME} at {-|PHONE_NUMBER} with email {-|EMAIL}",
		"{Create|Add} {new|a} lead for {-|FIRST_NAME} {-|LAST_NAME} {from|of} {COMPANY_NAME} at {-|EMAIL}",
		"{Create|Add} {new|a} lead for {-|FIRST_NAME} {from|of} {COMPANY_NAME} at {-|EMAIL}",
		"{Create|Add} {new|a} lead for {-|LAST_NAME} {from|of} {COMPANY_NAME} at email {-|EMAIL}",
		"{Create|Add} {new|a} lead for {-|FIRST_NAME} {-|LAST_NAME} with phone number {-|PHONE_NUMBER} with email {-|EMAIL} {from|of|at} {COMPANY_NAME}",
		"{Create|Add} {new|a} lead for {-|FIRST_NAME} with phone number {-|PHONE_NUMBER} with email {-|EMAIL} {from|of|at} {COMPANY_NAME}",
		"{Create|Add} {new|a} lead for {-|LAST_NAME} with phone number {-|PHONE_NUMBER} with email {-|EMAIL} {from|of|at} {COMPANY_NAME}",
		"{Create|Add} {new|a} lead for {-|FIRST_NAME} {-|LAST_NAME} at {-|PHONE_NUMBER} with email {-|EMAIL} {from|of|at} {COMPANY_NAME}",
		"{Create|Add} {new|a} lead for {-|FIRST_NAME} at {-|PHONE_NUMBER} with email {-|EMAIL} {from|of|at} {COMPANY_NAME}",
		"{Create|Add} {new|a} lead for {-|LAST_NAME} at {-|PHONE_NUMBER} with email {-|EMAIL} {from|of|at} {COMPANY_NAME}",
		"{Create|Add} {new|a} lead for {-|FIRST_NAME} {-|LAST_NAME} at {-|EMAIL} {from|of|at} {COMPANY_NAME}",
		"{Create|Add} {new|a} lead for {-|FIRST_NAME} at {-|EMAIL} {from|of|at} {COMPANY_NAME}",
		"{Create|Add} {new|a} lead for {-|LAST_NAME} at email {-|EMAIL} {from|of|at} {COMPANY_NAME}"

	]
}, function(req, res) {

	var firstName = req.slot('FIRST_NAME');
	var lastName = req.slot('LAST_NAME');
	var number = req.slot('PHONE_NUMBER');
	var email = req.slot('EMAIL');
	var phoneNumber = req.slot('PHONE_NUMBER');

	if (email) {
		email = parseEmail(email);
	}
	intent.create(firstName, lastName, company, phoneNumber, email).then(function(response) {
		res.say(response.format()).send();
	});

});

app.intent('list_event_intent', {
	"slots": [{
		"name": "TIMEFRAME",
		"type": "TIMESPANS"
	}],
	"utterances": [
		"Tell me my {schedule|events|appointments|meetings}",
		"Tell me my {schedule|events|appointments|meetings} for {-|TIMEFRAME}",
		"Get my {schedule|events|appointments|meetings} for {-|TIMEFRAME}",
		"List {-|TIMEFRAME} {schedule|events|appointments|meetings}"
	]
}, function(req, res) {

	var timeFrame = req.slot('TIMEFRAME');

	if (!timeFrame) {
		res.reprompt("Sorry, I didn't hear what you wanted to find.").shouldEndSession(false).send();
		return true;
	}

	var intent = new EventsIntent();
	intent.get(timeFrame).then(function(response) {
		res.say(response.format()).send();
	});

});

app.intent('create_event_intent', {
	"slots": [{
		"name": "DATE",
		"type": "AMAZON.DATE"
	}, {
		"name": "TIME",
		"type": "AMAZON.TIME"
	}, {
		"name": "TITLE",
		"type": "LITERAL_NAMES"
	}, {
		"name": "FIRST_NAME",
		"type": "AMAZON.US_FIRST_NAME"
	}, {
		"name": "LAST_NAME",
		"type": "LASTNAMES"
	}],
	"utterances": [
		"{Create|Set} a new calendar event titled {-TITLE} for {-|DATE} at {-|TIME}",
		"{Create|Set} a new calendar event {for|with} {-TITLE} for {-|DATE} at {-|TIME}",
		"{Create|Set} a new event titled {-TITLE} for {-|DATE} at {-|TIME}",
		"{Create|Set} a new event {for|with}  {-TITLE} for {-|DATE} at {-|TIME}",
		"{Create|Set} an appointment titled {-TITLE} for {-|DATE} at {-|TIME}",
		"{Create|Set} an appointment {for|with}  {-TITLE} for {-|DATE} at {-|TIME}",
		"{Create|Set} a new meeting titled {-TITLE} for {-|DATE} at {-|TIME}",
		"{Create|Set} a new meeting {for|with} {-TITLE} for {-|DATE} at {-|TIME}",
		"{Create|Set} a meeting titled {-TITLE} for {-|DATE} at {-|TIME}",
		"{Create|Set} a meeting {for|with}  {-TITLE} for {-|DATE} at {-|TIME}",
		"{Create|Set} a meeting titled {-TITLE} for {-|DATE} at {-|TIME}",
		"{Create|Set} a meeting {for|with}  {-TITLE} for {-|DATE} at {-|TIME}",
		"{Create|Set} a new calendar event {for|with} {-FIRST_NAME} {-|LAST_NAME} for {-|DATE} at {-|TIME}",
		"{Create|Set} a new event {for|with} {-FIRST_NAME} {-|LAST_NAME} for {-|DATE} at {-|TIME}",
		"{Create|Set} an appointment {for|with} {-FIRST_NAME} {-|LAST_NAME} for {-|DATE} at {-|TIME}",
		"{Create|Set} a new meeting {for|with} {-FIRST_NAME} {-|LAST_NAME} for {-|DATE} at {-|TIME}",
		"{Create|Set} a meeting {for|with} {-FIRST_NAME} {-|LAST_NAME} for {-|DATE} at {-|TIME}",
		"{Create|Set} a meeting {for|with} {-FIRST_NAME} {-|LAST_NAME} for {-|DATE} at {-|TIME}"
	]
}, function(req, res) {


});

app.intent('list_opportunity_intent', {
	"slots": [{
		"name": "TIMEFRAME",
		"type": "TIMESPANS"
	}, {
		"name": "OPPORTUNITY_NAME",
		"type": "LITERAL_NAMES"
	}],
	"utterances": [
		"Tell me my opportunities",
		"Tell me my opportunities for {-|TIMEFRAME}",
		"Get my opportunities for {-|TIMEFRAME}",
		"List {-|TIMEFRAME} opportunities",
		"{Find|Search} for opportunity {-|OPPORTUNITY_NAME}"
	]
}, function(req, res) {
	var timeframe = req.slot('TIMEFRAME');

});

app.intent('create_opportunity_intent', {
	"slots": [{
		"name": "OPPORTUNITY_NAME",
		"type": "LITERAL_NAMES"
	}, {
		"name": "DETAILS",
		"type": "LITERAL_DETAILS"
	}],
	"utterances": [
		"{Create|Add} a new opportunity for {OPPORTUNITY_NAME} {with|including} the following details {-|DETAILS}",
		"{Create|Add} a new opportunity for {OPPORTUNITY_NAME} {with|including} the following information {-|DETAILS}",
		"{Create|Add} a new opportunity for {OPPORTUNITY_NAME} {with|including} the following description {-|DETAILS}"
	]
}, function(req, res) {


});

app.intent('list_project_intent', {
	"slots": [{
		"name": "TIMEFRAME",
		"type": "TIMESPANS"
	}, {
		"name": "PROJECT_NAME",
		"type": "LITERAL_NAMES"
	}],
	"utterances": [
		"Tell me my projects due this {-|TIMEFRAME}",
		"Tell me my projects due today",
		"Tell me my projects for {-|TIMEFRAME}",
		"Get my projects for {-|TIMEFRAME}",
		"List {-|TIMEFRAME} projects}",
		"{Find|Search|Get} for project {-|PROJECT_NAME}"
	]
}, function(req, res) {
	var timeframe = req.slot('TIMEFRAME');


});

app.intent('create_project_intent', {
	"slots": [{
		"name": "PROJECT_NAME",
		"type": "PROJECTS"
	}],
	"utterances": [
		"Create a new project {-PROJECT_NAME}"
	]
}, function(req, res) {


});


app.intent('search_contact_intent', {
	"slots": [{
		"name": "FIRST_NAME",
		"type": "AMAZON.US_FIRST_NAME"
	}, {
		"name": "LAST_NAME",
		"type": "LASTNAMES"
	}, {
		"name": "PHONE_NUMBER",
		"type": "PHONENUMBERS"
	}, {
		"name": "EMAIL",
		"type": "EMAILS"
	}, {
		"name": "ORGANIZATION_NAME",
		"type": "LITERAL_NAMES"
	}],
	"utterances": [
		"{Find|Search} contact {-|FIRST_NAME} {-|LAST_NAME}",
		"{Find|Search} contact information for {-|FIRST_NAME} {-|LAST_NAME}",
		"{Find|Search} contact for {-|FIRST_NAME} {-|LAST_NAME}",
		"{Find|Search} contact {-|ORGANIZATION_NAME}",
		"{Find|Search} contact information for {-|ORGANIZATION_NAME}",
		"{Find|Search} contact for {-|ORGANIZATION_NAME}"
	]
}, function(req, res) {
	var timeframe = req.slot('TIMEFRAME');

});

app.intent('create_contact_intent', {
	"slots": [{
		"name": "FIRST_NAME",
		"type": "AMAZON.US_FIRST_NAME"
	}, {
		"name": "LAST_NAME",
		"type": "LASTNAMES"
	}, {
		"name": "PHONE_NUMBER",
		"type": "AMAZON.NUMBER"
	}, {
		"name": "EMAIL",
		"type": "EMAILS"
	}, {
		"name": "ORGANIZATION_NAME",
		"type": "LITERAL_NAMES"
	}],
	"utterances": [
		"Create a new contact for {FIRST_NAME} {LAST_NAME} at {PHONE_NUMBER} at {EMAIL}",
		"Create a new contact for {LAST_NAME} at {PHONE_NUMBER} at {EMAIL}",
		"Create a new contact for {FIRST_NAME} at {PHONE_NUMBER} at {EMAIL}",
		"Create a new contact for {ORGANIZATION_NAME} at {PHONE_NUMBER} at {EMAIL}",
		"Create a new contact for {ORGANIZATION_NAME} at {PHONE_NUMBER}",
		"Create a new contact for {ORGANIZATION_NAME} at {EMAIL}",
		"Create a new contact for {FIRST_NAME} {LAST_NAME} {with|at} phone number {PHONE_NUMBER} {with|at} email {EMAIL}",
		"Create a new contact for {LAST_NAME} {with|at} phone number {PHONE_NUMBER} {with|at} email {EMAIL}",
		"Create a new contact for {FIRST_NAME} {with|at} phone number {PHONE_NUMBER} {with|at} email {EMAIL}",
		"Create a new contact for {ORGANIZATION_NAME} {with|at} phone number {PHONE_NUMBER} {with|at} email {EMAIL}",
		"Create a new contact for {ORGANIZATION_NAME} {with|at} phone number {PHONE_NUMBER}",
		"Create a new contact for {ORGANIZATION_NAME} {with|at} email {EMAIL}"
	]
}, function(req, res) {


});


app.intent('search_organization_intent', {
	"slots": [{
		"name": "PHONE_NUMBER",
		"type": "AMAZON.NUMBER"
	}, {
		"name": "ORGANIZATION_NAME",
		"type": "LITERAL_NAMES"
	}],
	"utterances": [
		"Tell me my {schedule|events|appointments}",
		"Tell me my {schedule|events|appointments} for {-|TIMEFRAME}",
		"Get my {schedule|events|appointments} for {-|TIMEFRAME}",
		"List {-|TIMEFRAME} {schedule|events|appointments}"
	]
}, function(req, res) {
	var timeframe = req.slot('TIMEFRAME');

});

app.intent('create_organization_intent', {
	"slots": [{
		"name": "PHONE_NUMBER",
		"type": "AMAZON.NUMBER"
	}, {
		"name": "ORGANIZATION_NAME",
		"type": "LITERAL_NAMES"
	}],
	"utterances": [
		"Create a new organization for {-|ORGANIZATION} {with|at} phone number {-|PHONE_NUMBER} with email {-|EMAIL}",
		"Create {a|an} organization for {-|ORGANIZATION} {with|at} phone number {-|PHONE_NUMBER} with email {-|EMAIL}",
		"Create a new organization for {-|ORGANIZATION} {with|at} {-|PHONE_NUMBER} at {-|EMAIL}",
		"Create {a|an} organization for {-|ORGANIZATION} {with|at} {-|PHONE_NUMBER}",
		"Create {a|an} organization for {-|ORGANIZATION} {with|at} {-|EMAIL}"
		"Create a new organization {-|ORGANIZATION} {with|at} phone number {-|PHONE_NUMBER} with email {-|EMAIL}",
		"Create {a|an} organization {-|ORGANIZATION} {with|at} phone number {-|PHONE_NUMBER} with email {-|EMAIL}",
		"Create a new organization {-|ORGANIZATION} {with|at} {-|PHONE_NUMBER} at {-|EMAIL}",
		"Create {a|an} organization {-|ORGANIZATION} {with|at} {-|PHONE_NUMBER}",
		"Create {a|an} organization {-|ORGANIZATION} {with|at} {-|EMAIL}"
	]
}, function(req, res) {


});

//hack to support custom utterances in utterance expansion string
//console.log(app.utterances().replace(/\{\-\|/g, '{'));
module.exports = app;