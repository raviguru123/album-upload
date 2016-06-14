//inject angular file upload directives and services.
var app = angular.module('fileUpload', ['ngFileUpload']);

app.controller('MyCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.myFile="";
    $scope.assign=function(files){
        $scope.myFile=files;
    } 
$scope.progress=0;

    $scope.upload = function (files) {
        debugger;
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              var data={};
              data.resource=file;
              if (!file.$error) {
                Upload.upload({
                    url: 'http://goparties.com/api/api.php/uploadresource?access_token=133688745fb3253a0b4c3cbb3f67d444cf4b418a',
                    data: data
                }).then(function (resp) {
                    // $timeout(function() {
                        console.log("respnse come from uploading=",resp);
                    //     $scope.log = 'file: ' +
                    //     resp.config.data.file.name +
                    //     ', Response: ' + JSON.stringify(resp.data) +
                    //     '\n' + $scope.log;
                   // });
               }, null, function (evt) {
                var progressPercentage = parseInt(100.0 *
                    evt.loaded / evt.total);
                $scope.progress=progressPercentage;
                    // $scope.log = 'progress: ' + progressPercentage + 
                    //     '% ' + evt.config.data.file.name + '\n' + 
                    //   $scope.log;
                });
            }
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
                    console.log("file object in directory=",element[0].files[0]);
                    $scope.assign(fileArray);
                });
            });
        }
    }
});