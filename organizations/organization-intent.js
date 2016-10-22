var Organization = require('./organization');
var IntentResponse = require('../intent-response');
var BaseIntent = require('../base-intent');
var ObjectType = require('../object-types');
var FilterData = require('../filter-data');
var EmailAddress = require('../email-address');
var PhoneNumber = require('../phone-number');
var api = require('../insightly-api');

var _ = require('lodash');

function OrganizationIntent() {

	BaseIntent.call(this);
	var self = this;

	function mapOrganization(response) {
		var org = new Organization(response.ORGANISATION_NAME,response.CONTACTINFOS, response.ORGANISATION_ID);
		return org;
	}

	function mapCreateResponse(response) {
		
		var org = mapOrganization(response);
		return new IntentResponse(ObjectType.ORGANIZATIONS, [org]);
	}

	function mapResponse(response) {

		var responseData = response.body ? response.body : response;
		var dataResults = _.map(responseData, function(o) {
			return mapOrganization(o);
		});
		return new IntentResponse(ObjectType.ORGANIZATIONS, dataResults);
	}

	function createContactInfo(info, type) {
		return {
			'TYPE': type.toUpperCase(),
			'LABEL': 'WORK',
			'DETAIL': info
		}
	}

	self.get = function(name) {
		
		var filter = new FilterData('ORGANISATION_NAME', 'eq', name);

		 return api.filteredGet(ObjectType.ORGANIZATIONS, [filter])
			.then(mapResponse)
		 	.catch(this.handleError);
	};

	self.create = function(name, phone, email) {
		var contactInfos = [];
		if(phone){
			var formattedPhone = new PhoneNumber(phone).convertFromSpeech();
			contactInfos.push(createContactInfo(formattedPhone, 'phone'));
		}
		if(email) {
			var formattedEmail = new EmailAddress(email).convertFromSpeech();
			contactInfos.push(createContactInfo(formattedEmail, 'email'));
		}
		var org = new Organization(name, contactInfos);
		return api.post(ObjectType.ORGANIZATIONS, org)
			.then(mapCreateResponse)
			.catch(this.handleError);
	};

	self.delete = function(id) {

		return api.delete(ObjectType.ORGANIZATIONS, id);
	};

	return self;

}

OrganizationIntent.prototype = Object.create(BaseIntent.prototype);

module.exports = OrganizationIntent;