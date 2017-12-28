/*
ANGULARJS RÉSZEK
-Modul
-Controller
-Factory
-Sevice
-Filter
-Directive
*/


var superhero = angular.module('superhero', ['currencyModule']);

// Module futásának a kezdete
//fejléc beállítása - Angularban nincs benne gyárilag
superhero.run(['$http',function($http){
	$http.defaults.headers.common['x-requested-with'] = 'XMLHttpRequest';
}]);

