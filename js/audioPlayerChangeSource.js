var app=angular.module("audio.module",[]);

app.controller('audioCtrl', ['$scope', function($scope){
	$scope.audioIndex=0;
	$scope.audioSource="";
	$scope.audios=["https://gopartiesnew.s3-ap-southeast-1.amazonaws.com/9583cf70-3e05-43f7-a18d-5ee666e100d4.mp3",
	"https://gopartiesnew.s3-ap-southeast-1.amazonaws.com/6a49b601-3b9e-44cc-ab5f-00363b709eb0.mp3",
	"https://gopartiesnew.s3-ap-southeast-1.amazonaws.com/6a49b601-3b9e-44cc-ab5f-00363b709eb0.mp3",
	"http://gopartiesstatic.s3.amazonaws.com/images/1465887591_Veer Vaar-(Mr-Jatt.com).mp3",
	"http://gopartiesstatic.s3.amazonaws.com/images/1465754562_yaariyan-2014-love-me-thoda-aur[x-songs.pk].mp3"];
	$scope.init=function(){
		$scope.audioSource=$scope.audios[0];
		$scope.player.volume=1;
		
	}
	$scope.player=document.getElementById('player');
	$scope.volume=100;
	//$scope.player=$scope.volume;
	$scope.init();
	$scope.changeVolume=function(vol){
		debugger;
		if(vol>1)
			vol=1;
		$scope.player.volume=vol;
	}


	$scope.next=function(){
		$scope.player.pause()
		$scope.player.removeAttribute('src');
		$scope.player.load();
		if($scope.audios.length-1>$scope.audioIndex)
			$scope.audioIndex+=1;
		else
			$scope.audioIndex=0;

		$scope.player.src =$scope.audios[$scope.audioIndex];
		$scope.player.play();
	}
	$scope.prev=function(){
		$scope.player.pause()
		$scope.player.removeAttribute('src');
		$scope.player.load();
		if($scope.audioIndex==0)
			$scope.audioIndex=$scope.audios.length-1;

		else
			$scope.audioIndex+=-1;

		$scope.player.src =$scope.audios[$scope.audioIndex];
		$scope.player.play();
	}
	$scope.pause=function(){
		$scope.player.pause();
		console.log("duration=",$scope.player.duration);
	}
	$scope.play=function(){
		$scope.player.play();
	}
	$scope.forward=function(){
		$scope.player.currentTime+=10;
	}
	$scope.backward=function(){
		$scope.player.currentTime-=10;
	}
	$scope.forwardClick=function(evt){
		var x = evt.pageX - $("#playerTest").offset().left;
		$scope.progress=x/2;
		$scope.player.currentTime=(($scope.player.duration)*x)/200;
	}
	$scope.player.addEventListener('ended', function(){
		$scope.next();
	});
}]);


app.filter("trustUrl", ['$sce', function ($sce) {
	return function (recordingUrl) {
		return $sce.trustAsResourceUrl(recordingUrl);
	};
}]);