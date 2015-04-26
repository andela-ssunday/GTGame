app.service('obstacle',  ['gtResources',function(gtResources){
  

  this.init = function(){
    this.sprite = 'assets/images/stone-small.png'; 
    this.y = Math.floor((Math.random()*-900) + -50);
    this.x = 519;
    this.speed = Math.floor((Math.random()*200) + 50);
    this.noOfEnemies = 1;
  }
  this.update = function(dt) {
     if(this.y >= 600){
           this.init();
     }else{
         this.y += (this.speed * dt);
     }
  }
  this.render = function(ctx) {
    ctx.drawImage(gtResources.get(this.sprite), this.x, this.y);
  }
}]);