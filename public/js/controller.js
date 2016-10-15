var app = angular.module('myApp.controllers', ['myApp.service','ngFileUpload']);




// app.controller('InitCtrl', function($scope,$localStorage,$rootScope,$interval,$state) {

// 		$scope.init = function(){
// 		  $state.go('name');
// 		};



// }); //end of init ctrl








app.controller('MyCtrl', function($http,$scope,$localStorage,$rootScope,$interval,$state,myfactory,$window,Upload) {
  

$rootScope.bgcolor = "";

$scope.fetchstory = function () {

    myfactory.fetchstory();

    var num = Math.floor((Math.random() * 6) + 1);

     if (num == 1) {
        $rootScope.bgcolor = "#84bec7";
    }else if(num == 2){
        $rootScope.bgcolor = "#e94567";
    }else if(num == 3){
        $rootScope.bgcolor = "#d6b987";
    }else if(num == 4){
       $rootScope.bgcolor = "#6b6355";
    }else if (num == 5) {
       $rootScope.bgcolor = "#899d76";
    }else{
      $rootScope.bgcolor = "#769d8e";
    }
    

};




$scope.nextChat = function () {

    // $window.localStorage.setItem("iteration",0);

    if( $window.localStorage.getItem('storyId') == $window.localStorage.getItem('oldStoryId') ){

        if($window.localStorage.getItem("iteration") == $rootScope.storyLength){
          // alert("story over");
            $scope.fetchstory();
            return;
        }else{
          var iteration = $window.localStorage.getItem("iteration") || 0;
        }


    }else{

        var iteration = 0;
    }

    // var iteration = $window.localStorage.getItem("iteration") || 0;

    var chatterArray = JSON.parse($window.localStorage.getItem('chatter'));

    var setChat = new Promise(function (resolve, reject) {
        $rootScope.chat = chatterArray[iteration];
        $window.localStorage.setItem('oldStoryId',$window.localStorage.getItem('storyId'));
        resolve();
    });




    setChat.then(function () {
        $window.localStorage.setItem("iteration",parseInt(iteration) + 1)
    }).catch(function (err) {
        console.log("promise error: " + err );
    });




};




$scope.newStory = function(chatter1,chatter2,chatter3){


    var d = new Date();
    
    if (chatter1 === undefined || chatter2 === undefined || chatter3 === undefined ) {
        alert("all three chatters must be defined");
    };


    var chatterArray = [chatter1,chatter2,chatter3];



    var data = {  
                "storyId": d.getTime() + "",
                "chatter": chatterArray
               };


   $http.post("http://localhost:3000/createstory",data).then(function(res){
        
          console.log(JSON.stringify(res));
          myfactory.fetchstory();
          alert("Success");


   }, function(err){

          console.log(JSON.stringify(err));
          alert("error");

   });

};




$scope.addChatter = function(chatter){


    
    if (chatter === undefined || chatter === null || chatter === "") {
        alert("chatter must be defined");
    };




    var data = {  
                "storyId": $window.localStorage.getItem('storyId'),
                "chatter": chatter
               };


   $http.post("http://localhost:3000/addchatter",data).then(function(res){
        
          console.log(JSON.stringify(res));
          $scope.chatter = null;

   }, function(err){

          console.log(JSON.stringify(err));

   });

};










    // upload on file select or drop
    $scope.upload = function (file) {


        Upload.upload({
            url: '/upload',
            data: {file: file}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            // var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };







$scope.register = function(fullName,email,password){

    var data = { 
                "fullName": fullName,
                "email": email,
                "password": password
               };


   $http.post("http://localhost:3000/signup",data).then(function(res){
        
          console.log(JSON.stringify(res));
          $state.go("admin");
          $rootScope.permission = true;
        

   }, function(err){

          console.log(JSON.stringify(err));
          alert("gtfoh! you aren't meant to be here...");
           $rootScope.permission = false;

   });
  

};
 













$scope.allow = function(email,password){

    var data = { 
                "email": email,
                "password": password
               };


   $http.post("http://localhost:3000/login",data).then(function(res){
        
          console.log(JSON.stringify(res));
          $state.go("admin");
          $rootScope.permission = true;
        

   }, function(err){

          console.log(JSON.stringify(err));
          alert("wrong login details");
           $rootScope.permission = false;

   });
  

};









$scope.edit = function(email,password,newfullName,newemail,newpassword){

    var data = {
                "email": email,
                "password": password,
                "newfullName": newfullName,
                "newemail": newemail,
                "newpassword": newpassword
               };


   $http.post("http://localhost:3000/update",data).then(function(res){
        
          console.log(JSON.stringify(res));
          $state.go("admin");
          $rootScope.permission = true;
        

   }, function(err){

          console.log(JSON.stringify(err));
          alert("gtfoh! you aren't meant to be here...");
           $rootScope.permission = false;

   });
  

};










 


















}); //end of MyCtrl
