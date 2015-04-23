describe("GTGame :", function() {

    var module;
    before(function() {
      module = angular.module("gtGame");
    });

    describe("Dependencies:", function() {

      var deps;
      var hasModule = function(m) {
        return deps.indexOf(m) >= 0;
      };
      before(function() {
        deps = module.value('app').requires;
      });

      it("should have app.Controllers as a dependency", function() {
        expect(hasModule('App.Controllers')).to.equal(true);
      });

    });
  });

describe("controller", function() {

  beforeEach(module('gtGame'));
	  it('should have a GTController controller', function() {
	    expect(gtGame.GTController).not.to.equal(null);
	  });
  });