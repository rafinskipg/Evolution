// GAME OBJECTS
var creature = {
    x : 0,
    y: 0,
    size: 1,
    eated: 0,
    strongs: [0],
    type:[0],
    weakness:[0],
    speed: 256,
    randomMove: function(maxX, maxY, modifier){
        var near = getPoints(this.x, this.y, 10)
        this.y -= this.speed * modifier;
    }   
}

var creatures = [];