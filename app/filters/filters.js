'use strict';

/* Filters */

  paletteMakerApp.filter('hexacolor', function () {
  return function (color) {
    var output = "#";
    output += color.r < 16 ? '0' + color.r.toString(16) : color.r.toString(16);
    output += color.g < 16 ? '0' + color.g.toString(16) : color.g.toString(16);
    output += color.b < 16 ? '0' + color.b.toString(16) : color.b.toString(16);
    return output.toUpperCase();
  };
});