module.exports = {
	LOW : 1,
	MEDIUM: 2,
	HIGH : 3,
	UNKNOWN : 0,
	parse : function(val) {
		if(_.includes(val), 'low') {
			return 1;
		} else if(_.includes(val), 'medium'){
			return 2;
		} else if(_.includes(val), 'high'){
			return 3;
		} else{
			return 0;
		}
	}
}