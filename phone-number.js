function PhoneNumber(numbers) {
	var self = this;
	self.numbers = numbers;
	return self;
}

PhoneNumber.prototype.convertFromSpeech = function() {
	return this.numbers.replace(/\D/g, '');
};

PhoneNumber.prototype.convertToSpeech = function() {
	
	var numbers = this.numbers.replace(/\D/g,'');
	var textNumbers = [];
	for(var i = 0; i < numbers.length; i++) {
		textNumbers.push(numbers[i]);
	}
	return textNumbers;
};

module.exports = PhoneNumber;