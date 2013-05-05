var RANDOM = (function () {
	var my = {};

	my.RandomValue = function (MinValue,MaxValue)
    {
        return parseInt(Math.random()*(MaxValue-MinValue+1), 10)+MinValue;
    }

	my.RandomColor =  function(type){
        var h = my.RandomValue(1, 360);   // color hue between 1 and 360
        var s = my.RandomValue(20, 100);  // saturation 0-100%
        var l = my.RandomValue(50, 70); 
        var rgb = 'rgb('+h+','+s+','+l+')';
        var rgba = 'rgba('+h+','+s+','+l+',0.44)';
        return {rgb: rgb, rgba: rgba};
    }
    my.RandomDirection = function(){
        var flipX = my.RandomValue(0,1);
        var flipY = my.RandomValue(0,1);
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
    
    my.RandomPos =  function() {
        var randX = Math.ceil(Math.random() * canvas.width);
        var randY = Math.ceil( Math.random() * canvas.height);
        return {x: randX, y : randY};
    }


	return my;
}());

var DISTANCES = (function(){
    var my = {};
    
    my.Between = function(p1, p2){
        var dx = p1.x - p2.x;
        var dy = p1.y - p2.y;
        var distance = (( dx * dx )  + ( dy * dy )) ;
        return distance;
       //return Math.sqrt( dx + dy );
    }
    
    my.NearPoints = function(point){
        var items = quad.retrieve({x:point.x, y:point.y, height:point.height, width:point.width});
        return items;
    }
    return my;
}());