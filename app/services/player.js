app.service('player', ['gtResources','Enemy', function(gtResources,Enemy){

   this.init = function(){
        this.score = 0;
        this.highScore = 0;
        this.lives = 5;
        this.counter = 0;
        this.pos = 'up';
        this.sprites = {
          'up':[
            'assets/images/boy-up1.png',
            'assets/images/boy-up2.png',
            'assets/images/boy-up3.png',
            'assets/images/boy-up2.png'
            ],
           'down':[
             'assets/images/boy-down1.png',
             'assets/images/boy-down2.png',
             'assets/images/boy-down1.png',          
             'assets/images/boy-down2.png'          
           ],
           'left':[
            'assets/images/boy-right.png',
          ],
          'right':[
            'assets/images/boy-left.png',
          ]
        }
        this.sprite = 'assets/images/boy-up.png';
        this.x = 420;
        this.y = 435;
        this.level = 1;    
    }

    this.update = function(){
          this.score+=1;
          this.level = Math.ceil(this.score/1000);
          this.checkHighScore();
         if(this.y<=0){
            this.reset();
         }
    }
    
    this.checkLives = function(){
      this.lives-=1;
    }
    this.checkHighScore = function(){
         if(this.score>this.highScore){
             this.highScore = this.score;
         }
    }

    this.render = function(ctx){
        ctx.drawImage(gtResources.get(this.sprite), this.x, this.y);
    }

    this.handleInput = function(key){
        switch(key){
            case 'left':
            // this.getSprite('left');
              this.x = (this.x-60>368) ? this.x-173 : this.x;
                break;
            case 'right':
                // this.getSprite('right');
                this.x = (this.x+60<584) ? this.x+173 : this.x;
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
    this.getSprite = function(pos){
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
    this.reset = function(){
        this.x = 420;
        this.y = 435;
        this.sprite = 'assets/images/boy-up.png';
        this.lives-=1;
        this.score = 0;
    }
    var self = this;
      document.addEventListener('keydown', function(e) {
          var allowedKeys = {
              37: 'left',
              38: 'up',
              39: 'right',
              40: 'down'
          };

          self.handleInput(allowedKeys[e.keyCode]);
      });
    

}]);