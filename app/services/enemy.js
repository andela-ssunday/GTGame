app.service('Enemy',  ['gtResources',function(gtResources){
  
  var positions = [];
  this.init = function(){
      this.sprites = ['assets/images/car2.png','assets/images/car5.png','assets/images/car6.png','assets/images/car7.png'];
      this.sprite = this.sprites[Math.floor((Math.random()*4) + 0)];
      this.xs = [410,580];
      this.x = this.xs[Math.floor((Math.random()*2) + 0)];
      this.y = 5;
  }
  var ys = [-30,-250,-500];
  this.update = function(sp) {
    if(this.y >= 600){
            this.init();
    }else{
        this.y += sp;
        console.log(sp);
    }
  }
  this.render = function(ctx) {
    ctx.drawImage(gtResources.get(this.sprite), this.x, this.y);
  }
}]);