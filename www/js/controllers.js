angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$rootScope,$http) {
  Parse.initialize("pWm8epqgF2aiTmPqM0qeGm1aPHF73wW5jCe1LXfC", "6ZkBvTc8jvqts6UVHIAPSFgYL8qtrugUCcF2A00f");


  $rootScope.votes = function(arg,arg1,arg2){
    if(arg==='up'){
      var Anecdote = Parse.Object.extend("anecdote");
      var anecdote = new Anecdote();
      anecdote.set("objectId", arg1);
      anecdote.set("point", arg2);


      anecdote.save(null, {
        success: function(anecdote) {
          anecdote.set("point", arg2+1 );
          anecdote.save();
        }
      });
      alert("A voté !");

    }else if(arg==='down'){
      var Anecdote = Parse.Object.extend("anecdote");
      var anecdote = new Anecdote();
      anecdote.set("objectId", arg1);
      anecdote.set("point", arg2);
      anecdote.save(null, {
        success: function(anecdote) {
          anecdote.set("point", arg2-1 );
          anecdote.save();
        }
      });
      alert("A voté !");
    }
  };
  $rootScope.parse= function(){
    var trelli = Parse.Object.extend("anecdote");
      var lili = new Parse.Query(trelli);
      lili.descending("createdAt");
      lili.find({
        success : function(results){
            for (var i = 0; i < results.length; i++){
              $rootScope.reponsehome[i] = results[i];
              $rootScope.reponsehome[i].date = {};
              $rootScope.reponsehome[i].date = $rootScope.reponsehome[i].createdAt.toString().split(/\s+/);
            }
        },
        error: function(error) {
          alert('Connexion impossible');
        }
      });
  }
  $rootScope.top = function(){
    var trelo = Parse.Object.extend("anecdote");
    var toto = new Parse.Query(trelo);
    toto.descending("point");
    toto.find({
      success : function(results){
          for (var i = 0; i < results.length; i++){
            $rootScope.reponsetop[i] = results[i];
            $rootScope.reponsetop[i].date = {};
            $rootScope.reponsetop[i].date = $rootScope.reponsetop[i].createdAt.toString().split(/\s+/);
          }
      },
      error: function(error) {

      }
    });
  }



  // Form data for the login modal
  $scope.loginData = {};


  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/input.html', {
    scope: $scope,
  }).then(function(modal) {
    $scope.modal = modal;

  });

  // Triggered in the login modal to close it
  $scope.close = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.open = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.do = function(text, metro) {
      if(text!=="" ){
      var Anecdote = Parse.Object.extend("anecdote");
      var anecdote = new Anecdote();

      anecdote.set("commentaires", text);
      anecdote.set("station", metro);
      anecdote.set("point", 1);
      anecdote.set("user_id", "Earvin");

      anecdote.save(null, {
        success: function(anecdote) {
          // Execute any logic that should take place after the object is saved.
          alert('C\'est envoyé !');
        },
        error: function(anecdote, error) {
          // Execute any logic that should take place if the save fails.
          // error is a Parse.Error with an error code and message.
          alert('Connexion impossible');
        }
      });
    }else{
      alert("Il manque un metro et/ou du texte");
    }
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.close();
    }, 500);
  };
})

.controller('HomeCtrl',function($http,$scope,$rootScope,$state,$ionicModal){

  $rootScope.parse();



  $scope.click= function(arg){

    $scope.lieu.station = arg;


    //Query a Parse.
    var caca = Parse.Object.extend("anecdote");
    var query = new Parse.Query(caca);


    query.equalTo("station",arg);
    query.find({
      success : function(results){

          for (var i = 0; i < results.length; i++){

              $rootScope.reponsestation[i] = results[i];
              $rootScope.reponsestation[i].date = {};
              $rootScope.reponsestation[i].date = $rootScope.reponsestation[i].createdAt.toString().split(/\s+/);
          }

        $rootScope.lieu.station = arg;
        $state.go('app.single');
      },
      error: function(error) {

      }
    });

  }





})
.controller('TopCtrl', function($scope, $stateParams,$rootScope,$http) {

})

.controller('LigneCtrl', function($scope,$rootScope,$state) {

  $scope.click= function(arg){
    $rootScope.lieu.ligne = arg;
    //$rootScope.station = ;
    $state.go('app.station');
  }
})
.controller('StationCtrl', function($scope,$rootScope,$state) {

    $scope.click= function(arg){
    $rootScope.lieu.station = arg;

    //Query a Parse.
    var Object = Parse.Object.extend("anecdote");
    var query = new Parse.Query(Object);
    query.equalTo("station",arg);
    query.find({
      success : function(results){

          for (var i = 0; i < results.length; i++){
            $rootScope.reponsestation[i] = results[i];
            $rootScope.reponsestation[i].date = {};
            $rootScope.reponsestation[i].date = $rootScope.reponsestation[i].createdAt.toString().split(/\s+/);
          }
          console.log($rootScope.reponsestation);

        $state.go('app.single');
      },
      error: function(error) {

      }
    });

  }

})
.controller('PlaylistCtrl', function($scope, $stateParams,$rootScope) {

});
