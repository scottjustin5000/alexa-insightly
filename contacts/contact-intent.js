var Contact = require('./contact');
var IntentResponse = require('../intent-response');
var BaseIntent = require('../base-intent');
var ObjectType = require('../object-types');
var FilterData = reqiore('../filter-data');
var api = require('../insightly-api');

var _ = require('lodash');

function ContactIntent() {

	function mapContact(response) {
		var contact = new Contact(response.FIRST_NAME, response.LAST_NAME, response.CONTACTINFOS, response.CONTACT_ID);
		return contact;
	}

	function mapCreateResponse(response) {
		
		var contact = mapContact(response);
		return new IntentResponse(ObjectType.CONTACTS, [contact]);
	}

	function mapResponse(response) {

		var responseData = response.body ? response.body : response;
		var dataResults = _.map(responseData, function(c) {
			return mapContact(c);
		});
		return new IntentResponse(ObjectType.CONTACTS, dataResults);
	}

	function creatContactInfo(info, type) {
		return {
			'TYPE': type.toUpperCase(),
			'LABEL': 'WORK'
			'DETAIL': info
		}
	}

	self.find = function(firstName, lastName) {
		var filters = [];
		if(firstName) {
			filters.push(new FilterData('FIRST_NAME', 'eq', firstName));
		} 
		if(lastName) {
			filters.push(new FilterData('LAST_NAME', 'eq', lastName));
		}
		 return api.filteredGet(ObjectType.CONTACTS, filters)
			.then(mapResponse)
		 	.catch(this.handleError);
	};

	self.create = function(firstName, lastName, phone, email) {
		var contactInfos = [];
		if(phone){
			contactInfos.push(phone, 'phone');
		}
		if(email) {
			contactInfos.push(email, 'email');
		}
		var contact = new Contact(firstName, lastName, contactInfos);
		return api.post(ObjectType.CONTACTS, contact)
			.then(mapCreateResponse)
			.catch(this.handleError);
	};

	self.delete = function(id) {

		return api.delete('contacts', id);
	};

	return self;


}

ContactIntent.prototype = Object.create(BaseIntent.prototype);
