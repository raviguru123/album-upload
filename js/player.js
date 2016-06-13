var app=angular.module("player.module",[ "ngSanitize",
	"com.2fdevs.videogular",
	"com.2fdevs.videogular.plugins.controls"]);
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
		this.changeSource = function () {
			this.config.sources = [ {
				src: $sce.trustAsResourceUrl("https://gopartiesnew.s3-ap-southeast-1.amazonaws.com/9583cf70-3e05-43f7-a18d-5ee666e100d4.mp3"),
				type: "audio/mp3"
			}];
			this.config.tracks = undefined;
			this.config.loop = false;
			this.config.preload = true;
			this.config.autoPlay=true;
		};
		this.config = {
			sources: [  {
				src: $sce.trustAsResourceUrl("https://ia802302.us.archive.org/27/items/Pbtestfilemp4videotestmp4/video_test_512kb.mp4"),
				type: "video/mp4"
			},
			{
				src: $sce.trustAsResourceUrl("https://gopartiesnew.s3-ap-southeast-1.amazonaws.com/3c66400c-bcd3-4663-bba7-8dc8bec08e5d.mp3"),
				type: "audio/mp3"
			}
			],
			theme: {
				url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
			}
		};
		$scope.mediaObj=[];
		$scope.init=function(){
			getMyWorkFactory.getMyWork().then(function(response){
				
				$scope.mediaObj=response;
				console.log("response in controller=",$scope.mediaObj);
			},function(reason){

			});
		}
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