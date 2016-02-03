//var myApp = angular.module('myApp', []);
//
//myApp.controller('MyController', ['$scope', '$http', function($scope, $http) {
//  $http.get('js/parts.json').success(function(data) {
//    $scope.artists = data;
//  });
//}]);



var myApp = angular.module('myApp', []);


//var url = "http://fspqs44.fs.cummins.com:8080/QuickServeMobile/iac/catalog/optionDetails.json?plantCode=82&filmCard=SS&specGroup=16.04.1&optionNumber=BB1885&Token=123456789&callBack=JSON_CALLBACK";


var url = "http://143.222.33.39:8080/QuickServeMobile/iac/catalog/optionDetails.json?plantCode=82&filmCard=SS&specGroup=16.04.1&optionNumber=BB1885&Token=123456789&callBack=JSON_CALLBACK";

//var url = "http://fspqs44.fs.cummins.com:8080/QuickServeMobile/iac/catalog/optionDetails.json?plantCode=82&filmCard=SS&specGroup=16.04.1&optionNumber=BB1885&Token=123456789&callBack=JSON_CALLBACK";



myApp.controller('MyController', ['$scope','$location', '$http', function($scope,$location, $http) {
var loc = $location.$$absUrl;
console.log(loc);
	if(loc.indexOf('option')>-1){
		var opt = loc.split('=')[1].split('&')[0].toUpperCase();
		var film = loc.split('=')[2].split('&')[0].toUpperCase();;
		var spec = loc.split('=')[3].split('&')[0];
		var plant = loc.split('=')[4].split('&')[0];
		console.log(opt);
		console.log(film);
		console.log(spec);
		console.log(plant);
		url="http://143.222.33.39:8080/QuickServeMobile/iac/catalog/optionDetails.json?plantCode="+plant+"&filmCard="+film+"&specGroup="+spec+"&optionNumber="+opt+"&Token=123456789&callBack=JSON_CALLBACK";
	}
 $http.jsonp(url)
    .success(function(data){
//        console.log(data.OptionDetails.groups[0].parts);
     var details = [];
     details.push({"optionNumber":data.OptionDetails.optionNumber,
                   "specGroup":data.OptionDetails.specGroup,
                   "artCallOut":data.OptionDetails.artCallOut,
                  "filmCard":data.OptionDetails.filmCard,
                  "effectiveDate":data.OptionDetails.effectiveDate,
                  "plantCode":data.OptionDetails.plantCode,
                  "description":data.OptionDetails.description,
                  "remarks":data.OptionDetails.remarks});
     
//     console.log(details);
     
//    console.log(data.OptionDetails.groups[0].parts);
     $scope.options = data.OptionDetails.groups[0].parts;
     $scope.details = details;
    });
}]);

