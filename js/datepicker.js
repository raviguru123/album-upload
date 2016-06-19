var app = angular.module('myApp', ['ADM-dateTimePicker']);
app.controller('dateCtrl', ['$scope', function($scope){
	
}])
app.config(['ADMdtpProvider', function(ADMdtp) {
	ADMdtp.setOptions({
		calType: 'gregorian',
		format: 'DD/MM/YYYY',
		

	});
}]);