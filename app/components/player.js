app.service('player', ['gtResources','enemies', function(gtResources,enemies){

   var Player = function(){
        this.score = 0;
        this.highScore = 0;
        this.lives = 0;
        this.counter = 0;
        this.pos = 'up';
        this.sprites = {
          'up':[
            'images/boy-up1.png',
            'images/boy-up2.png',
            'images/boy-up3.png',
            'images/boy-up2.png'
            ],
           'down':[
             //'images/boy-down.png',
             'images/boy-down1.png',
             'images/boy-down2.png',
             'images/boy-down1.png',          
             'images/boy-down2.png'          
           ],
           'left':[
            'images/boy-right.png',
          ],
          'right':[
            'images/boy-left.png',
          ]
        }
        this.sprite = 'images/boy-up.png';
        this.x = 420;
        this.y = 435;

        this.level = 1;    
    }

    Player.prototype.update = function(){
          this.score+=1;
          this.checkHighScore();
          //checkLives();
         if(this.y<=0){

            this.reset();
            // checkLevel();
         }

    }
    
    Player.prototype.checkLives = function(){
      this.lives-=1;
    }
    Player.prototype.checkHighScore = function(){
         if(this.score>this.highScore){
             this.highScore = this.score;
         }
    }

    Player.prototype.render = function(ctx){
        ctx.drawImage(gtResources.get(this.sprite), this.x, this.y);
    }

    Player.prototype.handleInput = function(key){
        switch(key){
            case 'left':
            this.getSprite('left');
              this.x = (this.x-60>368) ? this.x-93 : this.x;
                break;
            case 'right':
                this.getSprite('right');
                this.x = (this.x+60<584) ? this.x+93 : this.x;
                break;
            case 'up':
                 this.getSprite('up');
                this.y = (this.y>0) ? this.y-60 : this.y;
                break;
            case 'down':
                 this.getSprite('down');
                this.y = (this.y<430) ? this.y+40 : this.y;
                break;
        }

    }
    Player.prototype.getSprite = function(pos){
       //var pos = 'up';
        if(this.pos!==pos){
          this.counter = 0;
        }else{
          this.counter++;
        }
        if(this.sprites[pos][this.counter]){
          this.sprite = this.sprites[pos][this.counter];
        }else{
          this.sprite = this.sprites[pos][0];
          this.counter = 0;
        }
        this.pos = pos;
      }
    Player.prototype.reset = function(){
        this.x = 513;
        this.y = 435;
        this.sprite = 'images/boy-up.png';
        this.lives-=1;
    }

    Player.prototype.init = function(){
      Player.apply(this);
    }
    var player = new Player();

    document.addEventListener('keydown', function(e) {
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

        player.handleInput(allowedKeys[e.keyCode]);
    });

    return player;
  
 
}]);