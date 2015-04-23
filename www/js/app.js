// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform,$http,$rootScope) {
  $ionicPlatform.ready(function() {
    Parse.initialize("pWm8epqgF2aiTmPqM0qeGm1aPHF73wW5jCe1LXfC", "6ZkBvTc8jvqts6UVHIAPSFgYL8qtrugUCcF2A00f");
    $rootScope.stations = {};
    $rootScope.reponse= [];
    $rootScope.reponsehome= [];
    $rootScope.reponsestation = [];
    $rootScope.reponsetop = [];
    $http.get('js/stations.json').success(function(data) {
     $rootScope.stations = data;
    });
    $rootScope.top();
    $rootScope.parse();


    $rootScope.lieu = {};
    $rootScope.ligne = [
      { title: 'Ligne 1', id: 1 },
      { title: 'Ligne 2', id: 2 },
      { title: 'Ligne 3', id: 3 },
      { title: 'Ligne 3bis', id: 32 },
      { title: 'Ligne 4', id: 4 },
      { title: 'Ligne 5', id: 5 },
      { title: 'Ligne 6', id: 6 },
      { title: 'Ligne 7', id: 7 },
      { title: 'Ligne 7bis', id: 72 },
      { title: 'Ligne 8', id: 8 },
      { title: 'Ligne 9', id: 9 },
      { title: 'Ligne 10', id: 10 },
      { title: 'Ligne 11', id: 11 },
      { title: 'Ligne 12', id: 12 },
      { title: 'Ligne 13', id: 13 },
      { title: 'Ligne 14', id: 14 }
    ];
    $rootScope.station= [
      { title: 'Chatelet', id: 1 },
      { title: 'Ligdzene 2', id: 2 },
      { title: 'Ligdzedzne 3', id: 3 },
      { title: 'Ligdzedzne 4', id: 4 },
      { title: 'Ligdzezne 5', id: 5 },
      { title: 'Ligdzezene 6', id: 6 }
    ];



    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

    }
    if (window.StatusBar) {
     // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: "/home",
    views: {
      'menuContent': {
        templateUrl: "templates/home.html",
        controller: 'HomeCtrl'
      }
    }
  })

  .state('app.station', {
    url: "/station",
    views: {
      'menuContent': {
        templateUrl: "templates/station.html",
        controller: 'StationCtrl'
      }
    }
  })
  .state('app.top', {
    url: "/top",
    views: {
      'menuContent': {
        templateUrl: "templates/top.html",
        controller: 'TopCtrl'
      }
    }
  })
    .state('app.ligne', {
      url: "/ligne",
      views: {
        'menuContent': {
          templateUrl: "templates/ligne.html",
          controller: 'LigneCtrl'
        }
      }
    })


  .state('app.single', {
    url: "/playlist",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
