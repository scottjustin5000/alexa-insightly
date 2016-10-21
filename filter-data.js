function FilterData(field, operator, value) {
	var self = this;
	self.field = field;
	self.operator = operator;
	self.value = value;
	return self;
}
module.exports = FilterData;