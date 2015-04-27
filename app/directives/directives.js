'use strict';

/* Directives */
paletteMakerApp.directive('myColor', function() {
  return {
    restrict: 'AEC',
    scope: {
      whichColor: '=info'
    },
    templateUrl: 'app/directives/colorTabsDirective.html'
  };
});
paletteMakerApp.directive('mySliders', function(){
  return {
    restrict: "AEC",
    scope: {
      name: "=",
      model: "=",
      sliderlabel: "=",
      id: "=",
      myclass: "=",
      max: "=",
      arialabel: "=",
      ariacontrols: "="
    },
    templateUrl: 'app/directives/slidersDirective.html'
  }
});