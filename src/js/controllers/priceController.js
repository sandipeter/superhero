superhero.controller( "priceController",[ "$scope", "$http", function( $scope, $http ) {

		$scope.yourPrice = 1000;

		$scope.$watch('yourPrice', function(newValue, oldValue){
				console.log(newValue, oldValue);
		});

		$scope.calcOwnPrice = function(price){
			price = price.toString().replace(/[^0-9]/g,'');
			var newPrice = Math.round(parseInt(price)*0.7);
			return isNaN(newPrice) ? 0: newPrice;
		};

  		$scope.calcOtherPrice = function(price){
			price = price.toString().replace(/[^0-9]/g,'');
			var newPrice = Math.round(parseInt(price)*0.85);
			return isNaN(newPrice) ? 0: newPrice;
		};
}]);
