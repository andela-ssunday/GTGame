'use strict';

/* Controllers */



paletteMakerApp.controller('paletteMakerController', ['$scope', 'colorPalette', 'colorConversion', function($scope, colorPalette, colorConversion){
  $scope.addUpdateBtn = colorPalette.btn;
  $scope.editCancelBtn = colorPalette.editBtn;
  $scope.hue = colorPalette.hue;
  $scope.saturation = colorPalette.saturation;
  $scope.lightness = colorPalette.lightness;
  $scope.colorData = [];
  $scope.$watch( "hue",
    function(newValue, oldValue) {
      if ( newValue !== oldValue ) {
        $scope.colorData2 = colorConversion.hsl2rgb($scope.hue, $scope.saturation, $scope.lightness);
      }
    });
   $scope.$watch( "saturation",
      function(newValue, oldValue) {
        if ( newValue !== oldValue ) {
          $scope.colorData2 = colorConversion.hsl2rgb($scope.hue, $scope.saturation, $scope.lightness);
        }
      });
   $scope.$watch( "lightness",
      function(newValue, oldValue) {
        if ( newValue !== oldValue ) {
          $scope.colorData2 = colorConversion.hsl2rgb($scope.hue, $scope.saturation, $scope.lightness);
        }
      });
  $scope.colorData2 = colorConversion.hsl2rgb($scope.hue, $scope.saturation, $scope.lightness);

  function rgbToHex(r, g, b) {
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  $scope.addUpdateColor = function() {
    if ($scope.addUpdateBtn === "Update Color"){
      $scope.colorData.splice($scope.currentIndex, 1, {first: colorConversion.hsl2rgb($scope.hue, $scope.saturation, $scope.lightness),
              second: colorConversion.hsl2rgb($scope.hue, $scope.saturation, $scope.lightness+10),
              third:  colorConversion.hsl2rgb($scope.hue, $scope.saturation, $scope.lightness + 20),
              rawhsl: [$scope.hue, $scope.saturation, $scope.lightness]});
       $scope.addUpdateBtn = colorPalette.btn;
      }
    else{
        $scope.colorData.push({first: colorConversion.hsl2rgb($scope.hue, $scope.saturation, $scope.lightness),
              second: colorConversion.hsl2rgb($scope.hue, $scope.saturation, $scope.lightness+10),
              third:  colorConversion.hsl2rgb($scope.hue, $scope.saturation, $scope.lightness + 20),
              rawhsl: [$scope.hue, $scope.saturation, $scope.lightness], isShown: true});
         $scope.addUpdateBtn = colorPalette.btn;
      };
  };
  $scope.editColor = function() {
    if ($scope.editCancelBtn === "Cancel Edit"){
      $scope.addUpdateBtn = colorPalette.btn;
      $scope.editCancelBtn = colorPalette.editBtn;
      $scope.hue = colorPalette.hue;
      $scope.saturation = colorPalette.saturation;
      $scope.lightness = colorPalette.lightness;
    }
    else{
      for(var i = 0; i < $scope.colorData.length; i++){
        if($scope.colorData[i].first.HEX === $scope.data.group2.first.HEX){
          $scope.addUpdateBtn = "Update Color";
          $scope.editCancelBtn = "Cancel Edit";
          $scope.hideShow = true;
          $scope.cancel = "Cancel"
          $scope.hue = $scope.colorData[i].rawhsl[0];
          $scope.saturation = $scope.colorData[i].rawhsl[1];
          $scope.lightness = $scope.colorData[i].rawhsl[2];
          $scope.currentIndex = i;
        }
      }
    }
  };
  $scope.removeItem = function(HEX) {
    for(var i = 0; i < $scope.colorData.length; i++){
      if($scope.colorData[i].first.HEX === $scope.data.group2.first.HEX){
        $scope.colorData.splice(i, 1);
        $scope.addUpdateBtn = colorPalette.btn;
      }
    }
  };
  $scope.removeAll = function() {
    $scope.colorData = [];
    $scope.addUpdateBtn = colorPalette.btn;
  };
  $scope.cancelUpdate = function(){
    $scope.addUpdateBtn = colorPalette.btn;
    $scope.hue = colorPalette.hue;
    $scope.saturation = colorPalette.saturation;
    $scope.lightness = colorPalette.lightness;
    $scope.colorData = [];
  }
}]);
