superhero.controller( "userController",[ "$scope", 'userService', function( $scope, userService ) {

	$scope.users = [];
	$scope.ths = [".", "name", "email", "phone"]

	userService.getAll().then(function(userData){
		$scope.users = userData;
	}, function(err){
		console.log("HIBA: ", err);
	});
}]);
