//Factory létrehozása

superhero.factory('userFactory', ['$http', '$q', function ($http, $q) {
	return {
		getAll: function () {

			//Új defer példány
			var deferred = $q.defer();



			//felhasználók lekérése
			$http.get('/users').then(function (serverData) {
				deferred.resolve(serverData.data);
			}, function (err) {
				deferred.reject();
			});

			//Visszatérés a promise objektummal
			return deferred.promise;
		}
	};
}]);
