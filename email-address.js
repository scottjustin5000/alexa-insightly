function EmailAddress(email) {
	var self = this;
  self.value = output = (email
               .replace(/\b(at)\b/ig, "@")
               .replace(/\b(dot)\b/ig, ".")
               .replace(/\b(underscore)\b/ig, "_")
               .replace(/\b(hyphen|dash)\b/ig, "-")
               .replace(/ /ig, '')
               .toLowerCase());
  return self;
}

module.exports = EmailAddress;