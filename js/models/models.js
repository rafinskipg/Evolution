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
    this.size=  1;
    this.eated=  0;
    this.strongs=  [0];
    this.type= [0];
    this.weakness = [0];
    this.speed =  256;
    this.direction = randomDirection();
    
    this.randomMove = function(maxX, maxY, modifier){
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
        }else{
            this.x + (this.direction[0] * this.speed * this.modifier);
            this.Y + (this.direction[1] * this.speed * this.modifier);
        }
        var radius = 50;
        var items = quad.retrieve({x:this.x, y:this.y, height:this.size + radius, width:this.size + radius});
        if(items.length > 1){
            console.log(items);
        }
        
        
        
    }   
}

var creatures = [];