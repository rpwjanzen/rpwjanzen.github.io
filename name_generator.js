function NameGenerator() {
	this.vowels = ['A','E','I','O','U'];
	this.characters = ['B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','W','X','Y','Z'];
	
	this.generateName = function () {
		var c0 = this.characters[Math.floor(Math.random() * this.characters.length)];
		var c1 = this.vowels[Math.floor(Math.random() * this.vowels.length)];
		
		var c2 = '';
		if (Math.random() > 0.5) {
			c2 = this.characters[Math.floor(Math.random() * this.characters.length)];
		}
		
		var c3 = this.characters[Math.floor(Math.random() * this.characters.length)];
		var c4 = this.vowels[Math.floor(Math.random() * this.vowels.length)];
		
		var c5 = '';
		if (Math.random() > 0.5) {
			c5 = this.characters[Math.floor(Math.random() * this.characters.length)];
		}
		
		return c0 + c1 + c2 + c3 + c4 + c5;
	};
	
	return this;
}