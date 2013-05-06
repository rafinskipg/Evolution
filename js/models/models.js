
// GAME OBJECTS
var creature =  function(){
    this.x =  0;
    this.y =  0;
    this.height =  RANDOM.RandomValue(1,4);
    this.width=   RANDOM.RandomValue(1,4);
    this.eated =  0;
    this.strongs=  RANDOM.RandomValue(0,15);
    this.type= RANDOM.RandomValue(0,15);
    this.sightRadius = RANDOM.RandomValue(0,300);
    this.weakness = [RANDOM.RandomValue(0,15)];
    this.speed = RANDOM.RandomValue(40,450);
    this.initialPower =  RANDOM.RandomValue(0,5);
    this.power = function(){
        return (this.initialPower * this.height) + (0.02 * this.speed);
    }
    this.direction = RANDOM.RandomDirection();
    this.color = RANDOM.RandomColor();
    
    this.move = function(maxX, maxY, modifier){
        var pointsNear = NearCreatures(this);
       
        // If theres a point near we go into that direction, else we maintain direction
        if (pointsNear.length > 0){
            
           //Get the nearest point and move to it.
           var nearestpoint;
           for (var i = 0; i< pointsNear.length; i++){
                var item = pointsNear[i];
                item.distance = DISTANCES.Between(this , item) ;
               
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
            
                if( (this.power()) >  (nearestpoint.power()) ){
                    this.eated++;
                    this.height++;
                    this.width++;
                    this.speed -= 3;
                    removeCreature(nearestpoint);
                    console.log('EATEN!!');
                }
                
                
                this.direction.x = this.direction.x * -1;
                this.direction.y = this.direction.y * -1;
                
                
             //It can see the other, so go eat it or run
                //Actually that distance
           }else if(nearestpoint.distance < (this.sightRadius * this.sightRadius)){
              
               
               var dir = 1;
               if(nearestpoint.power() > this.power()){
                //Run for your life
                
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