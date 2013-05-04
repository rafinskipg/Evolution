// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);
// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "img/background.jpg";

var positions = [];

// Reset the game when the player catches a monster
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
    
    creatures = [];
};


var createCreaturesEvery = function( timeout){
        
  function createCreature(){
    addCreature(randomPos());
    timer = setTimeout(createCreature, timeout);
  }  
  var timer = setTimeout(createCreature, timeout);
}

var addCreature = function(pos){
    var newCreature = new creature();
    newCreature.x = pos.x;
    newCreature.y = pos.y;
    
    //Add positions by size
    positions[pos.x, pos.y] = true;
    creatures.push(newCreature);
}

var randomPos = function() {
    var randX = Math.random() * canvas.width();
    var randY =  Math.random() * canvas.height();
    
    if(!occupied(randX, randY)){
        return {x: randX, y : randY};
    }else{
        return rawndomPos();
    }
}

var occupied = function(x,y){
    //Do it in and area with circles.
    if(positions[x,y] == false){
        return true;
    }else{
        return false;
    }
}


function distance(p1, p2)
{
   dx = p2.x - p1.x; dx *= dx;
   dy = p2.y - p1.y; dy *= dy;
   return Math.sqrt( dx + dy );
}
//Get all points in a radius
function getPoints(x, y, r)
{
    var ret = [];
    for (var j=x-r; j<=x+r; j++)
       for (var k=y-r; k<=y+r; k++)
           if (distance({x:j,y:k},{x:x,y:y}) <= r) ret.push({x:j,y:k});
    return ret;
}

// Update game objects
var update = function (modifier) {
    for(var i = 0; i<creatures.length; i++){
        creatures[i].applyDirection(canvas.width, canvas.height, modifier);
    }
	if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
	}

	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	for(var i = 0;  i<creatures.length; i++;){
        fillRect(creatures[i].x,creatures[i].y,5,5) ;
    }

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Creatures crated: " + creatures.length, 32, 32);
};



// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
};

var start = function(){
  
   // Let's play this game!
    reset();
    var then = Date.now();
    createCreaturesEvery(2000);
    setInterval(main, 1); // Execute as fast as possible
   
}

start();