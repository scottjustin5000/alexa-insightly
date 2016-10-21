var Organization = require('./contact');
var IntentResponse = require('../intent-response');
var BaseIntent = require('../base-intent');
var ObjectType = require('../object-types');
var FilterData = reqiore('../filter-data');
var api = require('../insightly-api');

var _ = require('lodash');

function OrganizationIntent() {

	function mapOrganization(response) {
		var org = new Organization(response.ORGANISATION_NAME,response.CONTACTINFOS, response.ORGANISATION_ID);
		return org;
	}

	function mapCreateResponse(response) {
		
		var org = mapOrganization(response);
		return new IntentResponse(ObjectType.ORGANIZATIONS, [contact]);
	}

	function mapResponse(response) {

		var responseData = response.body ? response.body : response;
		var dataResults = _.map(responseData, function(o) {
			return mapOrganization(o);
		});
		return new IntentResponse(ObjectType.ORGANIZATIONS, dataResults);
	}

	function creatContactInfo(info, type) {
		return {
			'TYPE': type.toUpperCase(),
			'LABEL': 'WORK'
			'DETAIL': info
		}
	}

	self.find = function(name) {
		
		var filter new FilterData('LAST_NAME', 'eq', name);

		 return api.filteredGet(ObjectType.ORGANIZATIONS, filters)
			.then(mapResponse)
		 	.catch(this.handleError);
	};

	self.create = function(name, phone, email) {
		var contactInfos = [];
		if(phone){
			contactInfos.push(phone, 'phone');
		}
		if(email) {
			contactInfos.push(email, 'email');
		}
		var contact = new Organization(name contactInfos);
		return api.post(ObjectType.ORGANIZATIONS, contact)
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