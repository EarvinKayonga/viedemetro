angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$rootScope) {
  // Form data for the login modal
  $scope.loginData = {};
  $rootScope.lieu = {};
  $rootScope.reponse= [];


  $rootScope.ligne = [
    { title: 'Ligne 1', id: 1 },
    { title: 'Ligne 2', id: 2 },
    { title: 'Ligne 3', id: 3 },
    { title: 'Ligne 4', id: 4 },
    { title: 'Ligne 5', id: 5 },
    { title: 'Ligne 6', id: 6 }
  ];
  $rootScope.station= [
    { title: 'Chatelet', id: 1 },
    { title: 'Ligdzene 2', id: 2 },
    { title: 'Ligdzedzne 3', id: 3 },
    { title: 'Ligdzedzne 4', id: 4 },
    { title: 'Ligdzezne 5', id: 5 },
    { title: 'Ligdzezene 6', id: 6 }
  ];

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
      var Anecdote = Parse.Object.extend("anecdote");
      var anecdote = new Anecdote();

      anecdote.set("commentaires", text);
      anecdote.set("station", metro);
      anecdote.set("point", 1);
      anecdote.set("user_id", "toto");

      anecdote.save(null, {
        success: function(anecdote) {
          // Execute any logic that should take place after the object is saved.
          alert('New object created with objectId: ' + anecdote.id);
        },
        error: function(anecdote, error) {
          // Execute any logic that should take place if the save fails.
          // error is a Parse.Error with an error code and message.
          alert('Failed to create new object, with error code: ' + error.message);
        }
      });


    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.close();
    }, 500);
  };
})
.controller('HomeCtrl',function($http,$scope,$rootScope,$state,$ionicModal){



  //Query a Parse.
  var Object = Parse.Object.extend("anecdote");
  var query = new Parse.Query(Object);

  query.descending("createdAt");
  query.find({
    success : function(results){

        for (var i = 0; i < results.length; i++){
          $rootScope.reponse[i] = results[i];
          $rootScope.reponse[i].date = {};
          $rootScope.reponse[i].date = $rootScope.reponse[i].createdAt.toString().split(/\s+/);
        }


    },
    error: function(error) {
      alert('error');
    }
  });

  $scope.click= function(arg){
    $rootScope.lieu.station = arg;

    //Query a Parse.
    var Object = Parse.Object.extend("anecdote");
    var query = new Parse.Query(Object);

    query.equalTo("station",$rootScope.lieu.station);
    query.find({
      success : function(results){

          for (var i = 0; i < results.length; i++){
            $rootScope.reponse[i] = results[i];
          }
        $rootScope.lieu.station = arg;
        $state.go('app.single');
      },
      error: function(error) {
        alert('error');
      }
    });

  }





})

.controller('LigneCtrl', function($scope,$rootScope,$state) {


  $scope.click= function(arg){
    $rootScope.lieu.ligne = arg;
    $state.go('app.station');
  }
})
.controller('StationCtrl', function($scope,$rootScope,$state) {
  $scope.click= function(arg){
    $rootScope.lieu.station = arg;

    //Query a Parse.
    var Object = Parse.Object.extend("anecdote");
    var query = new Parse.Query(Object);


    query.equalTo("station",$rootScope.lieu.station);
    query.find({
      success : function(results){

          for (var i = 0; i < results.length; i++){
            $rootScope.reponse[i] = results[i];
            $rootScope.reponse[i].date = {};
            $rootScope.reponse[i].date = $rootScope.reponse[i].createdAt.toString().split(/\s+/);
          }

        $state.go('app.single');
      },
      error: function(error) {
        alert('error');
      }
    });

  }

})

.controller('PlaylistCtrl', function($scope, $stateParams,$rootScope) {

  $scope.votes = function(arg,arg1){
    if(arg==='up'){

    }else if(arg==='down'){

    }
  };
});
