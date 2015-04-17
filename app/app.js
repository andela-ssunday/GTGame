'use strict';

var app = angular.module("gtGame",[]);

app.controller("GTController",['$scope',function($scope){
   // $scope.score = 0;
  
   // $scope.score++;
   $scope.lives = [1,2,3,4];
}]);

app.directive("drawGame", ['gtResources','enemies','player',function(gtResources,enemies,player){
  return{
    restrict: 'A',
    //template: "<canvas width='400' height='500' style='border:1px;'></canvas>",
    controller: 'GTController',
    link: function($scope,element){
       
    var doc = document,
        win = window,

        lastTime;
         // $scope.score = 0;
        element[0].width = 1000;
        element[0].height = 580;
        var ctx = element[0].getContext('2d');
        var sound1 = document.getElementById("Effct");
        // 
    function main() {
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        sound1.play();
        update(dt);
        render();
        // $scope.score = new Date();
        // console.log($scope.score);
        //console.log($scope.score++);
        lastTime = now;
        win.requestAnimationFrame(main);
    };


    function init() {
        reset();
        lastTime = Date.now();
        main();
    }


    function update(dt) {
        board();
        updateEntities(dt);
        // checkCollisions();
    }


    function updateEntities(dt) {
        enemies.forEach(function(enemy) {
            enemy.update(dt);
         });
         player.update();
         checkCollide();
    }


    function render() {

        var rowImages = [
                'images/Road.PNG',   // Row 1 of 2 of grass
                'images/Road.PNG',    // Row 2 of 2 of grass
                'images/Road.PNG',    // Row 2 of 2 of grass
                'images/Road.PNG',    // Row 2 of 2 of grass
                'images/Road.PNG',    // Row 2 of 2 of grass
                'images/Road.PNG'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;


        // for (row = 0; row < numRows; row++) {
            // for (col = 0; col < numCols; col++) {

                ctx.drawImage(gtResources.get(rowImages[0]),  101,  0);
            // }
        // }


        renderEntities();
    }


    function renderEntities() {

         enemies.forEach(function(enemy) {
            //alert(enemy);
             enemy.render(ctx);
         });

         player.render(ctx);
    }


    function reset() {
        // noop
    }

    var checkCollide = function(){
    //console.log(enemies[0].y +"("+player.y+")");
    // var flag=false;
     enemies.forEach(function(enemy){
       if((Math.abs(player.x-enemy.x) <=30) && (Math.abs(player.y-enemy.y) <=100)){
           // sound1.src = "sound/car_crash.wav";
            player.sprite = 'images/blood.png';
            //sound1.play();
            setTimeout(function(){player.reset();},500);
            //player.reset();
            //player.score = (player.score<=10) ? 0 : player.score-10;
           // checkLevel();
           // flag = true
        }
      });
     }

     function board(){
        // $scope.score = 5;
        // doc.querySelector(".h_score").innerHTML = player.highScore;
        doc.querySelector(".c_score").innerHTML = player.score;
         doc.querySelector(".lives").innerHTML = player.lives;
     }
    gtResources.load([
        'images/char-boy.png',
        'images/Rock.png',
        'images/sky.png',
        'images/Road.PNG',
        'images/car2.png',
        'images/car5.png',
        'images/car6.png',
        'images/car7.png',
        'images/boy-up1.png',
        'images/boy-up2.png',
        'images/boy-up3.png',
        'images/boy-up.png',
        'images/boy-down.png',
        'images/boy-down1.png',
        'images/boy-down2.png',
        'images/boy-left.png',
        'images/boy-right.png',
        'images/blood.png',
        'images/Star.png',
    ]);
    gtResources.onReady(init);

    $scope.ctx = ctx;
     
    }
  }
}]);