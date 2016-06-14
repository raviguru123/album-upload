var app=angular.module('upload.module', ['ngFileUpload']);

app.controller('uploadCtrl', ['$scope','uploadFactory',
	function($scope,uploadFactory){
		$scope.myFile="";
		$scope.progressBar=0;
		$scope.uploadFile=function(){
			uploadFactory.upload(function(response){
				console.log("response in controller=",response);
			},function(reason){
				alert("error occured in controller=",reason);
			})
		}
		$scope.assign=function(files){
			$scope.myFile=files;
		}
	}]);

app.directive("uploadVideo",function($parse){
	return{
		replace:true,
		restrict:'EA',
		scope:true,
		link:function($scope,element,attrs,controller,transclude){
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;
			var fileArray=[];
			element.bind('change', function(){
				$scope.$apply(function(){
					for(var i=0;i<element[0].files.length;i++)
					{
						fileArray.push(element[0].files[i]);
					}
					console.log("file object in directory=",element[0].files[0]);
					$scope.assign(fileArray);
				});
			});
		}
	}
});


app.factory("uploadFactory",function($http,$q,Upload, $timeout){
	var obj={};
	obj.upload=function(file){
		var defer=$q.defer();
		var data={};
		data.resource=file;
		var fd = new FormData();
    //Take the first selected file
    fd.append("resource", file);
    var url="http://goparties.com/api/api.php/uploadresource?access_token=133688745fb3253a0b4c3cbb3f67d444cf4b418a";


    Upload.upload({
    	url: url,
    	data: fd,
    }).then(function (response) {
    	console.log("response come from",response.data);
    	defer.resolve(response);
    }, function (response) {
    	if (response.status > 0) {
    		console.log("$scope.errorMsg =", response.status + ': ' + response.data);
    	}
    }, function (evt) {

    	console.log(Math.min(100, parseInt(100.0 * evt.loaded / evt.total)))      
    });

    return defer.promise;
}
return obj;
});