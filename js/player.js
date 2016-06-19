var app=angular.module("player.module",[]);
app.controller('HomeCtrl', ["$sce","$scope", "$window", "sharedProperties","getMyWorkFactory", 
	function($sce, $scope, $window, sharedProperties,getMyWorkFactory) {
		controller=this;
		controller.onPlayerReady = function(API) {
			controller.API = API;
		};
		$scope.sharedProperty = sharedProperties.getProperty();
		$scope.SetValue = function (msg)
		{
			$scope.setProperty = sharedProperties.setProperty;
			$scope.setProperty(msg);
		}
		$scope.currentTime = 0;
		$scope.timeLeft=200000;
		
		
		$scope.mediaObj=[];
		$scope.init=function(){
			getMyWorkFactory.getMyWork().then(function(response){
				
				$scope.mediaObj=response;
				console.log("response in controller=",$scope.mediaObj);
			},function(reason){

			});
		}
		$scope.audioSource="https://gopartiesnew.s3-ap-southeast-1.amazonaws.com/3c66400c-bcd3-4663-bba7-8dc8bec08e5d.mp3";
		$scope.init();
	}
	]);

app.service('sharedProperties', function () {
	var property = {
		data: "https://gopartiesnew.s3-ap-southeast-1.amazonaws.com/3c66400c-bcd3-4663-bba7-8dc8bec08e5d.mp3"
	};
	return {
		getProperty:function () {
			return property;
		},
		setProperty:function (value) {
			property.data = value;
		}
	};
});

app.service("getMyWorkFactory",function($http,$q){
	var obj={};
	obj.getMyWork=function(){
		var defer=$q.defer();
		var url="http://52.77.185.79:4689/api/work?access_token=133688745fb3253a0b4c3cbb3f67d444cf4b418a&user=37988";
		$http.get(url).then(function(response){
			defer.resolve(response.data.data.work);
		},function(reason){
			defer.reject(reason);
		})
		return defer.promise;
	}
	return obj;
});

app.directive("mediaDirectory",function(){
	return{
		restrict:'EA',
		replace:true,
		scope:{
			mediaObj:'='
		},
		link:function($scope,element,attr,controller,transclude){
			var category=$scope.mediaObj.worktype;
			$scope.audioSource=$scope.mediaObj.fileurl;
			$scope.thumburl=$scope.mediaObj.thumburl;
			console.log("$scope.serverLink",$scope.mediaObj);
			if(category=="audio"){
				
				$scope.myTemplate="directory/mp3.html";
			}
			else if(category=="video"){
				$scope.myTemplate="directory/mp4.html";
			}
			else
			{
				$scope.myTemplate="directory/image.html";
			}
		},
		template:'<div ng-include="myTemplate"></div>'
	}
});


app.filter("trustUrl", ['$sce', function ($sce) {
	return function (recordingUrl) {
		return $sce.trustAsResourceUrl(recordingUrl);
	};
}]);
app.directive("audioDirectory",function(){
	return{
		restrict:'EA',
		replace:true,
		scope:true,
		link:function($scope,element,attr,controller,transclude){
			console.log("$scope.audioSource",$scope.audioSource);
			elemend.bind()
		}
	}
});

