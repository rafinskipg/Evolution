var createCreaturesEvery = function( timeout){      
  function createCreature(){
    addCreature(RANDOM.RandomPos());
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

/** Check if there are nodes occupied for that position **/
var occupied = function(x,y,size){
    var items = DISTANCES.NearPoints({x:x, y:y, height:size, width:size});

    if(items.length > 0){
        return true;
    }else {
        return false;
        
    }
    
}
 var NearCreatures = function(creature){
        var items = DISTANCES.NearPoints(creature);
        var temp = [];
        for(var i = 0; i< items.length; i++){
            if(items[i] == creature || items[i].type == creature.type ){
               
            }else{
                temp.push(items[i]);
            }
        }
        
        return temp;
    }


    var removeCreature = function(creature){
    for(var i = 0; i < creatures.length; i++){
        if(creature.x == creatures[i].x && creature.y == creatures[i].y && creature.type == creatures[i].type ){
        
            creatures.splice(i, 1);
            
        }
    }
}

//Update chart 
var updateChart = function(){
    data = [];
    for(var i = 0; i<creatures.length; i++){
        data.push({value:creatures[i].eated, color:creatures[i].color.rgb});
    }
    chart = new Chart(contextChart).Pie(data,{animation:false});
}

// Update game objects
var update = function (modifier) {
    for(var i = 0; i<creatures.length; i++){
        creatures[i].move(canvas.width, canvas.height, modifier);
    }
    updateChart();
    updateTree();	
};

function updateTree()
{
	quad.clear();
	quad.insert(creatures);
}

var reset = function () {
	var quad = new QuadTree(bounds);
    creatures = [];
};


// Draw everything
var render = function () {
	if (bgReady) {
		context.drawImage(bgImage, 0, 0);
	}
    
	for(var i = 0;  i< creatures.length; i++){
        //Sight radius
        context.beginPath();
        context.arc(creatures[i].x ,creatures[i].y , creatures[i].sightRadius, 0, 2 * Math.PI, false);
        context.fillStyle = creatures[i].color.rgba;
        context.fill();
        
        //Creature
        context.fillStyle = creatures[i].color.rgb;
        context.fillRect(creatures[i].x,creatures[i].y,creatures[i].height,creatures[i].width) ;
       
    }

	// Score
	context.fillStyle = "green";
	context.font = "24px Helvetica";
	context.textAlign = "left";
	context.textBaseline = "top";
	context.fillText("Creatures: " + creatures.length, 32, 32);
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
    addCreature(RANDOM.RandomPos());
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
        addCreature(RANDOM.RandomPos());
    });
}
$(document).ready(function(){
    doBindings();   
});

