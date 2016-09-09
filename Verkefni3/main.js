function Pizza(nafn, verd, staerd, alegg) {
	this.nafn = nafn;
	this.verd = verd;
	this.staerd = staerd;
	this.alegg = alegg;
}

var pizza1 = new Pizza("Pizza 1", 2190, "l", ["Ostur", " Skinka", " Pepperoni"]);
var pizza2 = new Pizza("Pizza 2", 1990, "s", ["Ostur", " Oregano"]);
var pizza3 = new Pizza("Pizza 3", 2490, "m", ["Ostur", " Ananas", " Skinka"]);
var pizza4 = new Pizza("Pizza 4", 2290, "l", ["Ostur", " Hakk", " Beikon"]);

var pizzur = [];

pizzur[0] = pizza1;
pizzur[1] = pizza2;
pizzur[2] = pizza3;
pizzur[3] = pizza4;

var pizzuDiv = document.getElementById("pizzur");

for (var i = 0; i < pizzur.length; i++) {
	pizzuDiv.innerHTML += "<p>Nafn: " + pizzur[i]["nafn"] + "</p><p>Verð: " + pizzur[i]["verd"] + "</p><p>Stærð: " + pizzur[i]["staerd"] + "</p><p>Álegg: " + pizzur[i]["alegg"] + "</p><br>";
}