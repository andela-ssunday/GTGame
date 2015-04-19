app.service('obstacle',  ['gtResources',function(gtResources){
  

  var Obstacle = function(){
    this.sprite = 'images/stone-small.png'; 
    this.y = Math.floor((Math.random()*-900) + -50);
    this.x = 519;
    this.speed = Math.floor((Math.random()*200) + 50);
    this.noOfEnemies = 1;
  }
  // var ys = [-30,-250,-500];

  Obstacle.prototype.update = function(dt) {
    //checkCollide();
     if(this.y >= 600){
           Obstacle.apply(this);
     }else{
         this.y += (this.speed * dt);
     }
  }

  Obstacle.prototype.render = function(ctx) {
    // console.log(this.y);
    ctx.drawImage(gtResources.get(this.sprite), this.x, this.y);
  }
    return new Obstacle();
}]);