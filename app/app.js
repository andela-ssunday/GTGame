'use strict';

var app = angular.module("gtGame",[]);

app.controller("GTController",['$scope',function($scope){
   // $scope.lives = [1,2,3,4];
}]);

app.directive("drawGame", ['gtResources','Enemy','player','obstacle', function(gtResources,Enemy,player,obstacle){
  return{
    restrict: 'A',
    controller: 'GTController',
    link: function($scope,element){
       
    var doc = document,
        win = window,

        lastTime,failed=false;
        element[0].width = 1000;
        element[0].height = 580;
        var sp = 1;
        var ctx = element[0].getContext('2d');
        var sound1 = document.getElementById("Effct");

    var allEnemies = [];
    var noOfEnemies = 5;
    // var enemySpeed = 1;
    for(var i=0; i<noOfEnemies; i++){ 
        // enemy.y = enemy.ys[i];
        Enemy.init();
        allEnemies.push(Enemy);
    }
    function main() {
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        sound1.play();
        update(dt);
        render();
        lastTime = now;
        if(failed===false){
          win.requestAnimationFrame(main);
        }else{
          gameOver();
        }
    };
  
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    function update(dt) {
        board();
        updateEntities(dt);
    }

    function updateEntities(dt) {
        // var sp = (Math.ceil(player.score/2000) + 140 * dt);
        var speed = dt + (Math.ceil(player.score/2000));
        allEnemies.forEach(function(enemy) {
            enemy.update(speed);
         });
         obstacle.update(dt);
         player.update();
         checkCollide();
    }

    function render() {
        var rowImages = ['assets/images/Road.PNG'];
        ctx.drawImage(gtResources.get(rowImages[0]),  101,  0);
        renderEntities();
    }


    function renderEntities() {

         allEnemies.forEach(function(enemy) {   
            enemy.render(ctx);
         });
         obstacle.render(ctx);
         player.render(ctx);
    }


    function reset() {

    }

    var checkCollide = function(){
     allEnemies.forEach(function(enemy){
       if((Math.abs(player.x-enemy.x) <=30) && (Math.abs(player.y-enemy.y) <=90) || (Math.abs(player.x-obstacle.x) <=10) && (Math.abs(player.y-obstacle.y) <=30)){
            player.sprite = 'assets/images/blood.png';
            setTimeout(function(){player.reset();},500);
           gameOver();
        }
      });
     }

    function gameOver(){
      failed = true;
      player.score = 0;
      doc.querySelector(".lives").innerHTML = "GAME OVER";
        document.addEventListener('keyup', function(event)  {
            if (event.keyCode === 13)  {
                reStart();
        }
      });
    }
    function reStart(){
      failed = false;
      doc.querySelector(".lives").innerHTML = "";
      main();
    }
     function board(){
        doc.querySelector(".h_score").innerHTML = player.highScore;
        doc.querySelector(".c_score").innerHTML = player.score;
     }
    gtResources.load([
        'assets/images/char-boy.png',
        'assets/images/Rock.png',
        'assets/images/sky.png',
        'assets/images/Road.PNG',
        'assets/images/car2.png',
        'assets/images/car5.png',
        'assets/images/car6.png',
        'assets/images/car7.png',
        'assets/images/boy-up1.png',
        'assets/images/boy-up2.png',
        'assets/images/boy-up3.png',
        'assets/images/boy-up.png',
        'assets/images/boy-down.png',
        'assets/images/boy-down1.png',
        'assets/images/boy-down2.png',
        'assets/images/boy-left.png',
        'assets/images/boy-right.png',
        'assets/images/blood.png',
        'assets/images/stone-small.png',
    ]);
    gtResources.onReady(init);

    $scope.ctx = ctx;
     
    }
  }
}]);