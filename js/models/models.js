// GAME OBJECTS
/*var creature = {
    x : 0,
    y: 0,
    size: 1,
    eated: 0,
    strongs: [0],
    type:[0],
    weakness:[0],
    speed: 256,
    randomMove: function(maxX, maxY, modifier){
        var pointsNear = getPoints(this.x, this.y, 10);
        // If theres a point near we go into that direction, else we maintain direction
        if (pointsNear.length > 0){
           if( pointsNear[0].x > this.x) {
            this.x += this.speed * modifier;
           }
           if( pointsNear[0].y > this.y) {
            this.y += this.speed * modifier;
           }
           if( pointsNear[0].x < this.x) {
            this.x -= this.speed * modifier;
           }
           if( pointsNear[0].y < this.y) {
            this.y -= this.speed * modifier;
           }
           if(this.y == pointsNear[0].y && this.x == pointsNear[0].x){
                alert('chocked');
           }
        }
        var radius = 50;
        var items = quad.retrieve({x:this.x, y:this.y, height:this.size + radius, width:this.size + radius});
        if(items.length > 1){
            console.log(items);
        }
        
    }   
}*/
// GAME OBJECTS
var creature =  function(){
    this.x =  0;
    this.y=  0;
    this.height=  4;
    this.width=  4;
    this.eated=  0;
    this.strongs=  [0];
    this.power =  Math.round( Math.random() * 5);
    this.type= Math.round( Math.random() * 5);
    this.sightRadius = Math.round( Math.random() * 300);
    this.weakness = [0];
    //this.speed = Math.round( Math.random() * 256);
    this.speed = 256 -  Math.round(Math.random() * 100);
    this.direction = randomDirection();
    this.getTypeColor = function(){
        return randomColor(this.type);
    }
    this.color = randomColor();
    
    this.move = function(maxX, maxY, modifier){
        var pointsNear = nearPoints(this);
       
        // If theres a point near we go into that direction, else we maintain direction
        if (pointsNear.length > 0){
            
           //Get the nearest point and move to it.
           var nearestpoint;
           for (var i = 0; i< pointsNear.length; i++){
                var item = pointsNear[i];
                var dx = this.x - item.x;
                var dy = this.y - item.y;
                var distance = (( dx * dx )  + ( dy * dy )) ;
                item.distance = distance;
                if(!nearestpoint){
                    
                    nearestpoint = item;
                }else{
                    if(nearestpoint.distance > item.distance){
                        nearestpoint = item;
                    }
                }
           }
           

           
		   var radii = this.height + nearestpoint.height;		

		   var colliding = nearestpoint.distance < (radii * radii);
           
           // Points are colliding
           if(colliding){
            
                if( (this.power * this.height) >  (nearestpoint.power * nearestpoint.height) ){
                    this.eated++;
                    this.height++;
                    this.width++;
                    
                    removeCreature(nearestpoint);
                    console.log('EATEN!!');
                }
                
                
                this.direction.x = this.direction.x * -1;
                this.direction.y = this.direction.y * -1;
                
                
             //It can see the other, so go eat it or run
                //Actually that distance
           }else if(distance < (this.sightRadius * this.sightRadius)){
              
               console.log('SAW YOU');
               var dir = 1;
               if(nearestpoint.power * nearestpoint.height > this.power * this.height){
                //Run for your life
                console.log('I RUN... !');
                dir = -1;
               }
               
               if( nearestpoint.x > this.x) {
                this.direction.x = 1* dir;
               }
               if( nearestpoint.y > this.y) {
                this.direction.y = 1* dir;
               }
               if( nearestpoint.x < this.x) {
                 this.direction.x = -1 * dir;
               }
               if( nearestpoint.y < this.y) {
                this.direction.y = -1* dir;
               }
               
           }
        }
        
        this.normalMovement(maxX, maxY, modifier);
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
 
    } 
    
    this.normalMovement = function (maxX, maxY, modifier){
        // This is the movement that moves through the canvas bouncing at the MaxSize
        var nextX = this.x;
        var nextY = this.y;
        nextX += (this.direction.x * this.speed * modifier);
        nextY += (this.direction.y * this.speed * modifier);
        
        
        if(nextX > maxX || nextX < 0){
            this.direction.x = this.direction.x * -1;
            this.x += (this.direction.x * this.speed * modifier);
        }else{
            this.x = nextX;
        }
        
        if(nextY > maxY || nextY < 0){
            this.direction.y = this.direction.y * -1;
            this.y += (this.direction.y * this.speed * modifier);
        }else{
            this.y = nextY;
        }
    }
    
    
}

var creatures = [];