app.service('enemies',  ['gtResources',function(gtResources){
  

  var Enemy = function(){
    this.sprites = ['images/car2.png','images/car5.png','images/car6.png','images/car7.png'] 
    this.sprite = this.sprites[Math.floor((Math.random()*4) + 0)];
    this.ys = [-30,-250,-500];
    //this.y = this.ys[Math.floor((Math.random()*2) + 0)];
    this.xs = [410,580];
    this.x = this.xs[Math.floor((Math.random()*2) + 0)];
    this.speed = 140;
    this.noOfEnemies = 1;
    this.counter = 0;
  }
  Enemy.prototype.gety = function(){
    this.y = 0;
  }
  Enemy.prototype.update = function(dt) {
    //checkCollide();
    if(this.y >= 500){
        //this.speed = this.speeds[Math.floor((Math.random()*4) + 0)];
          this.y = -200;
        // this.y -= (this.y-20);

        //this = new Enemy();
        //this.y = this.ys[Math.floor((Math.random()*2) + 0)];

        //this.x = this.xs[Math.floor((Math.random()*3) + 0)];
        //this.sprite = this.sprites[Math.floor((Math.random()*4) + 0)];
        //checkLevel();
    }else{
        this.y += (this.speed * dt);
    }

  }

// Draw the enemy on the screen, required method for game
  Enemy.prototype.render = function(ctx) {
    ctx.drawImage(gtResources.get(this.sprite), this.x, this.y);
  }
  var allEnemies = [];
//var enemyCheck = function(){
    var noOfEnemies = 5;

    for(var i=0; i<noOfEnemies; i++){
        var enemy = new Enemy();  
        enemy.y = enemy.ys[i];
        allEnemies.push(enemy);
    }
    return allEnemies;

}]);