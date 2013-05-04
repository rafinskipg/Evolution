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

//Quad tree
var bounds = {
	x:0,
	y:0,
	width:canvas.width,
	height:canvas.height
}
var quad = new QuadTree(bounds);

var positions = [];

// Reset the game when the player catches a monster
var reset = function () {
	var quad = new QuadTree(bounds);

	
    
    creatures = [];
};


var createCreaturesEvery = function( timeout){
        
  function createCreature(){
    addCreature(randomPos());
    //timer = setTimeout(createCreature, timeout);
  }  
  var timer = setTimeout(createCreature, timeout);
}

var addCreature = function(pos){
    var newCreature = new creature();
    newCreature.x = pos.x;
    newCreature.y = pos.y;
    
    
    quad.insert({
        x:newCreature.x, 
        y:newCreature.y,
        height:newCreature.size,
        width:newCreature.size
    });
    
    creatures.push(newCreature);
}

/** Generate random pos (not occupied) **/
var randomPos = function() {
    var randX = Math.ceil(Math.random() * canvas.width);
    var randY = Math.ceil( Math.random() * canvas.height);
    
    if(occupied(randX, randY,1) == true ){
        return randomPos();   
    }else{
        
        return {x: randX, y : randY};
    }
}

/** Check if there are nodes occupied for that position **/
var occupied = function(x,y,size){
    var items = quad.retrieve({x:x, y:y, height:size, width:size});
    
    if(items.length > 0){
        return true;
    }else {
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
           if (occupied(j,k,1) == true){
                if (distance({x:j,y:k},{x:x,y:y}) <= r) ret.push({x:j,y:k});
           }
          
    //Apply alghorithm for getting the nearest point . Quadtree http://www.mikechambers.com/blog/2011/03/21/javascript-quadtree-implementation/
    //http://en.wikipedia.org/wiki/Quadtree
    return ret;
}

var randomDirection = function(){
    
    return [-1, -1];

}

// Update game objects
var update = function (modifier) {
    for(var i = 0; i<creatures.length; i++){
        creatures[i].randomMove(canvas.width, canvas.height, modifier);
    }
	
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}
    ctx.fillStyle = "black";
    ctx.strokeStyle = "#000000";
	for(var i = 0;  i< creatures.length; i++){
        
        ctx.fillRect(creatures[i].x,creatures[i].y,5,5) ;
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
   
    createCreaturesEvery(5000);
    setInterval(main, 1); // Execute as fast as possible
   
}
var then = Date.now();
start();