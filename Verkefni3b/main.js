/* 1. */
var family = {
	"parents":
		{
			"fathers": [{"name": "Jakob"}, {"name": "Nonni"}],
			"mothers": [{"name": "Rakel"}, {"name": "Sara"}]
		}
};

console.log(family["parents"]["fathers"][1]["name"]);

/* 2. */
var jakob = {
	pets: []
};

var hundur = {
	name: "Zola"
};

jakob.pets['hundur'] = hundur;

console.log(jakob.pets['hundur']['name']);

/* 3. */
function Geimflaug() {
}

Geimflaug.prototype.name = "SpaceRacer";
Geimflaug.prototype.life = 10;
Geimflaug.prototype.speed = 5;

Geimflaug.prototype.showName = function() {
	console.log(this.name);
}

Geimflaug.prototype.fly = function() {
	this.speed++;
}

var geimflaug1 = new Geimflaug();
var geimflaug2 = new Geimflaug();
var geimflaug3 = new Geimflaug();
var geimflaug4 = new Geimflaug();

geimflaug1.name = "SpaceExplorer";
geimflaug1.showName();

geimflaug4.shoot = function() {
	this.life--;
}

console.log("Geimflaug 1");
console.log(geimflaug1.name);
console.log(geimflaug1.life);
console.log(geimflaug1.speed);
console.log(geimflaug1.showName);
console.log(geimflaug1.fly);

console.log("Geimflaug 2");
console.log(geimflaug2.name);
console.log(geimflaug2.life);
console.log(geimflaug2.speed);
console.log(geimflaug2.showName);
console.log(geimflaug2.fly);

console.log("Geimflaug 3");
console.log(geimflaug3.name);
console.log(geimflaug3.life);
console.log(geimflaug3.speed);
console.log(geimflaug3.showName);
console.log(geimflaug3.fly);

console.log("Geimflaug 4");
console.log(geimflaug4.name);
console.log(geimflaug4.life);
console.log(geimflaug4.speed);
console.log(geimflaug4.showName);
console.log(geimflaug4.fly);
console.log(geimflaug4.shoot);