//inject angular file upload directives and services.
var app = angular.module('fileUpload', ['ngFileUpload']);

app.controller('MyCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.myFile="";
    $scope.assign=function(files){
        $scope.myFile=files;
    } 
    $scope.url='http://goparties.com/api/api.php/uploadresource?access_token=133688745fb3253a0b4c3cbb3f67d444cf4b418a';
    $scope.progress=0;
    $scope.filesProgress=[];
    $scope.upload = function (files) {
        debugger;
        var array=[];
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
             (function(file) {
                var data={};
                data.resource=file;
                $scope.upload = Upload.upload({
                  url: $scope.url, 
                  data:data,
                  file: file, 
              }).progress(function(evt) {
                  file.progress = Math.round(evt.loaded * 100 / evt.total);
              }).success(function(response) {
                 console.log("response come from file uplaod=",response);
             });
          })(files[i]);
      }

  }

};

}]);

app.directive("fileUpload",function($parse){
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
                    //console.log("file object in directory=",element[0].files[0]);
                    $scope.assign(fileArray);
                });
            });
        }
    }
});

app.directive("progressWidget",function(){
    return {
        restrict:'EA',
        replace:true,
        templateUrl:"directory/progressWidget.html",
        link:function($scope,element,attr,controller,transclude){
            console.log("widget copiler come",attr.percent);
            attr.$observe("percent",function(newValue){
                //console.log("widget=",attr.percent);
                $scope.progress=attr.percent;
            })
        }
    }
});