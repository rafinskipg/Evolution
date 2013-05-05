// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 480;
canvas.height = 500;
document.getElementById('game').appendChild(canvas);
// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "img/bg.png";

//Quad tree
var bounds = {
	x:0,
	y:0,
	width:canvas.width,
	height:canvas.height
}
var quad = new QuadTree(bounds);

var positions = [];

var then;

// Reset the game when the player catches a monster
var reset = function () {
	var quad = new QuadTree(bounds);
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
    
    quad.insert(newCreature);
   
    
    creatures.push(newCreature);
}

/** Generate random pos (not occupied) **/
var randomPos = function() {
    var randX = Math.ceil(Math.random() * canvas.width);
    var randY = Math.ceil( Math.random() * canvas.height);
    
    if(occupied(randX, randY,1) == true ){
       // return randomPos();   
         return {x: randX, y : randY};
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

var nearPoints = function(creature){
    
    var items = quad.retrieve({x:creature.x, y:creature.y, height:creature.height, width:creature.width});
    var temp = [];
    for(var i = 0; i< items.length; i++){
        if(items[i] == creature || items[i].type == creature.type ){
           
        }else{
            temp.push(items[i]);
        }
    }
    
    
    return temp;
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
           if (occupied(j,k,1) === true){
                if (distance({x:j,y:k},{x:x,y:y}) <= r) ret.push({x:j,y:k});
           }
          
    //Apply alghorithm for getting the nearest point . Quadtree http://www.mikechambers.com/blog/2011/03/21/javascript-quadtree-implementation/
    //http://en.wikipedia.org/wiki/Quadtree
    return ret;
}


var removeCreature = function(creature){
    for(var i = 0; i < creatures.length; i++){
        if(creature.x == creatures[i].x && creature.y == creatures[i].y && creature.type == creatures[i].type ){
        
            creatures.splice(i, 1);
            
        }
    }
}

var randomDirection = function(){
    var flipX = Math.round(Math.random() * 1);
    var flipY = Math.round(Math.random() * 1);
    var x, y;
    if(flipX == 0){
        x = 1;
    }else{
        x = -1;
    }
    if(flipY == 0){
        y = 1;
    }else{
        y = -1;
    }
    
    return {x: x, y: y};

}

var randomColor = function(type){
    if(typeof(type) == 'undefined'){
        var rnd = Math.round(Math.random() * 5);
    }else{
        var rnd = type;
    }
    switch(rnd){
        case 5: 
            return 'yellow';
        break;
        case 4:
            return 'pink';
        break;
        case 3:
            return 'blue';
        break;
        case 2: 
            return 'green';
        break;
        
        case 1: 
            return 'grey';
        break;
        case 0:
            return 'black';
        break;
    }
}

// Update game objects
var update = function (modifier) {
    for(var i = 0; i<creatures.length; i++){
        creatures[i].move(canvas.width, canvas.height, modifier);
    }
    updateTree();
	
};
function updateTree()
{
	//todo: call clear

	//tree = new QuadTree(bounds);
	//tree.insert(circles);

	quad.clear();
	quad.insert(creatures);
}
// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}
    
	for(var i = 0;  i< creatures.length; i++){
        ctx.fillStyle = creatures[i].getColor();
        //ctx.strokeStyle = creatures[i].getColor();
        ctx.fillRect(creatures[i].x,creatures[i].y,creatures[i].height,creatures[i].width) ;
        ctx.fillStyle = 'rgba(148, 221, 145, 0.44)';
        ctx.fillRect(creatures[i].x - creatures[i].sightRadius / 2,creatures[i].y - creatures[i].sightRadius / 2,creatures[i].sightRadius,creatures[i].sightRadius) ;
        
    }

	// Score
	ctx.fillStyle = "green";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Creatures: " + creatures.length, 32, 32);
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
    then = Date.now();
   // Let's play this game!
    reset();
    addCreature(randomPos());
    setInterval(main, 5); // Execute as fast as possible
}

//Only place where I do use JQuery. 
var doBindings = function(){
    $('#start').bind('click',function(e){
        e.preventDefault();
        start();
        
    });
    $('#clear').bind('click',function(e){
        e.preventDefault();
        reset();
    });
    $('#add').bind('click',function(e){
        e.preventDefault();
        addCreature(randomPos());
    });
}
$(document).ready(function(){
    doBindings();   
});

