(function() {
  'use strict';
  angular.module('starter.controllers', ['starter'])

  .controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope, $http, DatabaseService, ApiService) {

    $scope.z = [];
    DatabaseService.update(function(res) {
      angular.forEach(res, function(value, key) {
        $scope.z.push(res[key]);
      });
      console.log($scope.z);
    });
    console.log($scope.z);




    $rootScope.votes = function(arg, arg1, arg2) {
      if (arg === 'up') {
        var Anecdote = Parse.Object.extend("anecdote");
        var anecdote = new Anecdote();
        anecdote.set("objectId", arg1);
        anecdote.set("point", arg2);


        anecdote.save(null, {
          success: function(anecdote) {
            anecdote.set("point", arg2 + 1);
            anecdote.save();
          }
        });


      } else if (arg === 'down') {
        var Anecdote = Parse.Object.extend("anecdote");
        var anecdote = new Anecdote();
        anecdote.set("objectId", arg1);
        anecdote.set("point", arg2);
        anecdote.save(null, {
          success: function(anecdote) {
            anecdote.set("point", arg2 - 1);
            anecdote.save();
          }
        });

      }
    };
    $rootScope.parse = function() {
      /*  var trelli = Parse.Object.extend("anecdote");
        var lili = new Parse.Query(trelli);
        lili.descending("createdAt");
        lili.find({
          success: function(results) {
            for (var i = 0; i < results.length; i++) {
              $rootScope.reponsehome[i] = results[i];
              $rootScope.reponsehome[i].date = {};
              $rootScope.reponsehome[i].date = $rootScope.reponsehome[i].createdAt.toString().split(/\s+/);
            }

          },
          error: function(error) {
            alert('Connexion impossible');
          }
        });*/

    }
    $rootScope.top = function() {
      var trelo = Parse.Object.extend("anecdote");
      var toto = new Parse.Query(trelo);
      toto.descending("point");
      toto.find({
        success: function(results) {
          for (var i = 0; i < results.length; i++) {
            $rootScope.reponsetop[i] = results[i];
            $rootScope.reponsetop[i].date = {};
            $rootScope.reponsetop[i].date = $rootScope.reponsetop[i].createdAt.toString().split(/\s+/);
          }
        },
        error: function(error) {

        }
      });
    }



    var result = [];
    /*  result = (function() {
        var base = [];
        var trelo = Parse.Object.extend("anecdote");
        var toto = new Parse.Query(trelo);
        toto.descending("createdAt");
        toto.find({
          success: function(results) {
            for (var i = 0; i < results.length; i++) {
              base[i] = results[i];
              base[i].date = {};
              base[i].date = base[i].createdAt.toString().split(/\s+/);
            }
            for (var i = 0; i < results.length; i++) {
              $rootScope.reponsehome[i] = results[i];
              $rootScope.reponsehome[i].date = {};
              $rootScope.reponsehome[i].date = $rootScope.reponsehome[i].createdAt.toString().split(/\s+/);
            }
          },
          error: function(error) {

          }
        });

      }());*/


    $rootScope.parse();

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
    $scope.do = function(text, metro, mail, name) {

      if (!text) {
        alert("Il manque l'anecdote");
      } else if (!metro) {
        alert("Il manque un metro");
      } else if (!name) {
        alert("Il manque un identifiant");
      } else if (!mail) {
        alert("Il manque un mail");
      } else {

    $scope.do = function(text, metro,name) {
      console.log(mail.length == 0);
      if(!text|| text.length == 0){
        alert("Il manque l'anecdote");
      }else if (!metro || metro.length == 0) {
        alert("Il manque un metro");
      }else if (!name|| name.length == 0) {
        alert("Il manque un identifiant");

      }else{
        var Anecdote = Parse.Object.extend("anecdote");
        var anecdote = new Anecdote();
        metro = metro.toLowerCase();
        metro = metro.charAt(0).toUpperCase() + metro.substr(1);
        anecdote.set("commentaires", text);
        anecdote.set("station", metro);
        anecdote.set("point", 1);
        anecdote.set("user_id", name);

        anecdote.save(null, {
          success: function(anecdote) {
            //Password Generation
            var code = "";
            var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+-!";
            for (var i = 0, n = charset.length; i < 8; i++) {
              code += charset.charAt(Math.floor(Math.random() * n));
            }
            // User Registration
            var user = new Parse.User();
            user.set("username", name);
            user.set("email", mail);
            user.set("password", code)
            user.signUp(null, {
              success: function(user) {
            user.set("password",code);
            user.signUp(null,{
              success: function(user){
                alert("Posté!");

              },
              error: function(user, error) {

              }
            });

          },
          error: function(anecdote, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Connexion impossible');
          }
        });
      }
      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.close();
      }, 500);
    };
  })

  .controller('HomeCtrl', function($http, $scope, $rootScope, $state, $ionicModal) {

      $scope.click = function(arg) {

        $scope.lieu.station = arg;


        //Query a Parse.
        var caca = Parse.Object.extend("anecdote");
        var query = new Parse.Query(caca);


        query.equalTo("station", arg);
        query.find({
          success: function(results) {

            for (var i = 0; i < results.length; i++) {

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
    .controller('TopCtrl', function($scope, $stateParams, $rootScope, $http, $state) {

      $scope.click = function(arg) {

        $scope.lieu.station = arg;


        //Query a Parse.
        var caca = Parse.Object.extend("anecdote");
        var query = new Parse.Query(caca);


        query.equalTo("station", arg);
        query.find({
          success: function(results) {

            for (var i = 0; i < results.length; i++) {

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

  .controller('LigneCtrl', function($scope, $rootScope, $state) {

      $scope.click = function(arg) {
        $rootScope.lieu.ligne = arg;
        //$rootScope.station = ;
        $state.go('app.station');
      }
    })
    .controller('StationCtrl', function($scope, $rootScope, $state) {
      $scope.currentLigne = $rootScope.lieu.ligne;


      $scope.click = function(arg) {
        $rootScope.lieu.station = arg;

        //Query a Parse.
        var Object = Parse.Object.extend("anecdote");
        var query = new Parse.Query(Object);
        query.equalTo("station", arg);
        query.find({
          success: function(results) {

            for (var i = 0; i < results.length; i++) {
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
    .controller('PlaylistCtrl', function($scope, $stateParams, $rootScope) {

    })
    .controller('AboutCtrl', function($http, $scope, $rootScope, $state, $ionicModal) {




    });

}());
