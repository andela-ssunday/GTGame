app.service('enemies',  ['gtResources',function(gtResources){
  
  var positions = [];

  var ys = [-30,-300,-650,-1150,-1550,-2100],y;
  var ys = [-30,-500,-1000,-1500,-2000,-2500],y;
  var Enemy = function(){
    this.sprites = ['images/car2.png','images/car5.png','images/car6.png','images/car7.png'];
    this.sprite = this.sprites[Math.floor((Math.random()*4) + 0)];
    this.ys = [-30,-250,-500,-650,-800,-950,-1150];
    this.xs = [410,580];
    this.x = this.xs[Math.floor((Math.random()*2) + 0)];
    this.speed = 140;

  }

  var ys = [-30,-250,-500];

  Enemy.prototype.update = function(sp) {
    //checkCollide();
    if(this.y >= 600){
          Enemy.apply(this);

          this.y = position();
          console.log(this.y);
          // this.y = start_y;

    }else{
        // this.start_y = (this.start_y===0) ? this.y : this.start_y; 
        this.y += sp;
    }

    // console.log(this.y);
  }
  var position = function(){
      if(positions.length === noOfEnemies ){
        positions = [];
      }
      var ys = [-30,-1000,-2000,-3000,-4000,-5000];
      var tail = function(){
        y = ys[Math.floor((Math.random()*6) + 0)];
        // alert(y);
        if(positions.indexOf(y)===-1){
            // console.log(y);
          positions.push(y);
          
           return y;
        }else{
          return tail();
        }
      };
      return tail();
}

  Enemy.prototype.render = function(ctx) {
    ctx.drawImage(gtResources.get(this.sprite), this.x, this.y);
  }
  var allEnemies = [];
    var noOfEnemies = 3;

    for(var i=0; i<noOfEnemies; i++){
        var enemy = new Enemy();  
        enemy.y = enemy.ys[i];
        allEnemies.push(enemy);
    }
    return allEnemies;

}]);