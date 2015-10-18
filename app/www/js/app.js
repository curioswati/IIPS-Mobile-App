// angular.module is a global place for creating, registering and retrieving Angular modules
// 'iips-app' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('iips-app',
                ['ionic', 
                'ngCordova',
                'ngMessages',
                'ngResource',
                'ionic.service.core',
                'ionic.service.push',
                'iips-app.controllers',
                'iips-app.services',
                'iips-app.directives'])

.run(function($ionicPlatform, $rootScope, $state, Auth) {
 
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on('$stateChangeStart', function(event, next) {
    if ($state.current !== 'login') {
      if (!Auth.isLoggedIn()) {
        $state.go('login', {reload:true});

        console.log(next.name);

        if(next.name !== 'login' && next.name !== 'register')
        {
          event.preventDefault();
        }
      }     
    }
  });
})

.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|cdvfile|content):|data:image\//);
})

.config(['$ionicAppProvider', function($ionicAppProvider) {
  // Identify app
  $ionicAppProvider.identify({
    // The App ID (from apps.ionic.io) for the server
    app_id: '6c5cd62e',
    // The public API key all services will use for this app
    api_key: '8549532d70a7b6a46e6419ac821a152b725324a4c891d230',
    // Set the app to use development pushes
    dev_push: true
  });
}])

.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('login', {
        cache: false,
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl',
    })

    .state('register', {
        cache: false,
        url: "/register",
        templateUrl: "templates/register.html",
        controller: 'RegisterCtrl',
    })

    .state('tab', {
      cache: false,
      url: "/tab",
      templateUrl: "templates/tabs.html",
      controller: 'TabCtrl'
    })

    .state('admin', {
      cache: false,
      url: "/admin",
      templateUrl: "templates/admin-tabs.html",
      controller: 'TabCtrl'
    })

    .state('admin.dash', {
      cache: false,
      url: "/dash",
      views: {
        'admin-dash': {
          templateUrl: "templates/admin-dash.html",
          controller: 'AdminDashCtrl'
        }
      }
    })

    .state('admin.profile', {
      cache: false,
      url: "/profile",
      views: {
        'admin-profile': {
          templateUrl: "templates/tab-profile.html",
          controller: 'ProCtrl'
        }
      }
    })

    .state('admin.faculty', {
      cache: false,
      url: "/faculty",
      views: {
        'admin-dash': {
          templateUrl: "templates/submitFaculty.html",
          controller: 'DataFormCtrl'
        }
      }
    })

    .state('admin.slot', {
      cache: false,
      url: "/slot",
      views: {
        'admin-dash': {
          templateUrl: "templates/submitSlot.html",
          controller: 'DataFormCtrl'
        }
      }
    })

    .state('admin.subject', {
      cache: false,
      url: "/subject",
      views: {
        'admin-dash': {
          templateUrl: "templates/submitSubject.html",
          controller: 'DataFormCtrl'
        }
      }
    })

    .state('admin.interval', {
      cache: false,
      url: "/interval",
      views: {
        'admin-dash': {
          templateUrl: "templates/submitInterval.html",
          controller: 'DataFormCtrl'
        }
      }
    })

    .state('tab.dash', {
      url: "/dash",
      views: {
        'tab-dash': {
          templateUrl: "templates/tab-dash.html",
          controller: 'DashCtrl'
        }
      }
    })

    .state('tab.syllabus', {
      cache: false,
      url: "/syllabus",
      views: {
        'tab-dash': {
          templateUrl: "templates/syllabus.html",
          controller: 'DashCtrl'          
        }
      }
    })

    .state('tab.schedule', {
      cache: false,
      url: "/schedule",
      views: {
        'tab-dash': {
          templateUrl: "templates/schedule.html",
          controller: 'DashCtrl'
        }
      }
    })

    .state('tab.profile', {
      cache: false,
      url: "/profile",
      views: {
        'tab-profile': {
          templateUrl: "templates/tab-profile.html",
          controller: 'ProCtrl'
        }
      }
    })

    .state('tab.edit-profile', {
      cache: false,
      url: "/edit-profile",
      views: {
        'tab-profile': {
          templateUrl: "templates/edit-profile.html",
          controller: 'ProCtrl'
        }
      }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

});
