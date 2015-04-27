'use strict';

var app = angular.module("gtGame",["paletteMakerApp"]);
var paletteMakerApp = angular.module('paletteMakerApp', ['ngMaterial', 'ngRoute']);

app.controller("GTController",['$scope',function($scope){
   
}]);

app.directive("drawGame", ['gtResources','Enemy','player','obstacle', function(gtResources,Enemy,player,obstacle){
  return{
    restrict: 'A',
    controller: 'GTController',
    link: function($scope,element){
    var doc = document,
        win = window,

        lastTime,failed=false;
        element[0].width = 504;
        element[0].height = 500;
        var i = 0;
        var touched = false;
        var ctx = element[0].getContext('2d');
        var sound1 = doc.getElementById("Effct");
        
        var rowImages = ['assets/images/Road.PNG'];

    var allEnemies = [];
    var noOfEnemies = 5;

    function enemy_init(){
      for(var i=0; i<noOfEnemies; i++){ 
          Enemy.init();
          allEnemies.push(Enemy);
      }      
    }

    function main() {
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        update(dt);
        render();
        lastTime = now;
        if(failed===false){
          win.requestAnimationFrame(main);
        }
    };
    function gameOver(){
      $scope.notif = "GAME OVER! (Press Enter Key)";
      $scope.$apply();
      win.addEventListener('keydown',function(e){
          if(e.keyCode === 13){
            if(failed===true){
                // win.cancelAnimationFrame(a);
                failed = false;
                restart();
            }
          }
      });
    }
    function restart(){
      $scope.notif = "";
      angular.forEach(allEnemies, function(enemy){
         enemy.init();
       });
      player.reset();
      sound1.src = "assets/sound/car_sound.wav";
      main();
    }

    function init() {
        sound1.src = "assets/sound/car_sound.wav";
        failed = false;
        reset();
        lastTime = Date.now();
        player.init();
        enemy_init();
        obstacle.init();
        main();
    }

    function update(dt) {
        $scope.board();
        updateEntities(dt);
    }

    function updateEntities(dt) {
        var speed = dt + (Math.ceil(player.score/1000));

        angular.forEach(allEnemies,function(enemy) {
            enemy.update(speed);
         });
         // obstacle.update(dt);
         player.update();
         checkCollide();
         
    }

    function render() {
        ctx.drawImage(gtResources.get(rowImages[0]),  0,  0);
        renderEntities();
    }


    function renderEntities() {
         angular.forEach(allEnemies,function(enemy) {   
            enemy.render(ctx);
         });
         // obstacle.render(ctx);
         player.render(ctx);
    }


    function reset() {
      failed = false;
    }

    var checkCollide = function(){
     angular.forEach(allEnemies,function(enemy){
       if((Math.abs(player.x-enemy.x) <=30) && (Math.abs(player.y-enemy.y) <=90  && (touched === false)) ){
            sound1.src = "assets/sound/car_crash.wav";
            sound1.play();
            touched = true;
            player.sprite = 'assets/images/blood.png';
            failed = true;
            gameOver();
        }
      });
     touched = false;
     }
     $scope.board = function(){
        $scope.score = player.score;
        $scope.highScore = player.highScore;
        $scope.level = player.level;
        $scope.$apply();
     }
     // console.log($scope.score);
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