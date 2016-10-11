function getRandomNumber(min, max) {
	return Math.floor((Math.random() * max) + min);
}

/* Breytir röð staka í fylki */
var shuffleArray = function(arr) {
	var arrayLength = arr.length; /* Lengd á array */
	var usedIndices = []; /* Index sem búið er að nota */
	var newArr = []; /* Nýja fylkið */

	/* Fer í gegn um fylkið */
	for (var i = 0; i < arrayLength; i++) {
		var randomIndex = getRandomNumber(0, arrayLength); /* Fá random tölu  */

		while (usedIndices.indexOf(randomIndex) >= 0) {
			/* Fá random tölu á meðan talan er í fylkinu usedIndices */
			randomIndex = getRandomNumber(0, arrayLength);
		}

		usedIndices[i] = randomIndex; /* Bæta tölunni við í usedIndices */
		newArr[i] = arr[randomIndex]; /* Setja stakið með random index inn í nýja fylkið */
	}

	return newArr; /* Skila nýja fylkinu */
};