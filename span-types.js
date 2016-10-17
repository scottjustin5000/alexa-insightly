var _ = require('lodash');

module.exports = {
	TODAY : 'day',
	WEEK: 'week',
	MONTH :'month',
	YEAR: 'year',
	UNKNOWN : 'unknown',
	parse : function(val) {
		if(_.includes(val), 'day') {
			return 'day';
		} else if(_.includes(val), 'week'){
			return 'week';
		} else if(_.includes(val), 'month'){
			return 'month';
		} else if(_.includes(val), 'year'){
			return 'year';
		} else{
			return 'unknown';
		}
	}
}