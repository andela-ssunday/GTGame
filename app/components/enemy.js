app.service('enemies',  ['gtResources',function(gtResources){
  
  var positions = [];
  var ys = [-30,-300,-650,-1150,-1550,-2100],y;
  var Enemy = function(){
    this.sprites = ['images/car2.png','images/car5.png','images/car6.png','images/car7.png'] 
    this.sprite = this.sprites[Math.floor((Math.random()*4) + 0)];
    this.ys = [-30,-250,-500,-650,-800,-950,-1150];
    // this.y = this.ys[Math.floor((Math.random()*2) + 0)];
    this.xs = [410,580];
    this.x = this.xs[Math.floor((Math.random()*2) + 0)];
    // this.y = this.ys[Math.floor((Math.random()*7) + 0)];
    this.speed = 140;
    // this.start_y = 0;
    // this.noOfEnemies = 1;
    // this.counter = 0;
  }
  // var ys = [-30,-250,-500];
  // Enemy.prototype.counter = (Enemy.prototype.counter) ? Enemy.prototype.counter+1 : 0;
  // Enemy.prototype.y = ys[Enemy.prototype.counter];
  // Enemy.prototype.counter = (Enemy.prototype.counter===3) ? 0 : Enemy.prototype.counter+1;
  Enemy.prototype.update = function(dt) {
    //checkCollide();
    if(this.y >= 600){
          Enemy.apply(this);
          // this.sprite = this.sprites[Math.floor((Math.random()*4) + 0)];
          this.y = position();
          console.log(this.y);
          // this.y = start_y;
    }else{
        // this.start_y = (this.start_y===0) ? this.y : this.start_y; 
        this.y += (this.speed * dt);
    }
     
  }
 var position = function(){
      if(positions.length === noOfEnemies){
        positions = [];
      }
      var tail = function(){
        y = ys[Math.floor((Math.random()*6) + 0)];
        if(positions.indexOf(y)===-1){
            // console.log(y);
          positions.push(y);
          return y;
        }else{
          tail();
        }
      };
      return tail();
}

// Draw the enemy on the screen, required method for game
  Enemy.prototype.render = function(ctx) {
    ctx.drawImage(gtResources.get(this.sprite), this.x, this.y);
  }
  var allEnemies = [];
//var enemyCheck = function(){
    var noOfEnemies = 3;

    for(var i=0; i<noOfEnemies; i++){
        var enemy = new Enemy();  
        enemy.y = enemy.ys[i];
        enemy.start_y = enemy.y;
        allEnemies.push(enemy);
    }
    return allEnemies;

}]);