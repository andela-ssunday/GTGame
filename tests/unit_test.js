describe("GTGame",function(){
	
	var scope = {};

	beforeEach(module("gtGame"));

	beforeEach(inject(function($controller){
		$controller("GTController", {$scope:scope});
	}));

	it("should run fine", function(){
		expect(scope.test).toBeDefined();
	});
});