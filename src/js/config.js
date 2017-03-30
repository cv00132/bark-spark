function Config($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state('root', {
          abstract: true,
          templateUrl: 'templates/layout.tpl.html',
          controller: 'UserController'
        })

        .state('root.signUp', {
            url: '/signUp',
            templateUrl: 'templates/signUp.tpl.html',
            controller: 'UserController'
        })

        .state('root.login', {
          url: '/login',
          templateUrl: 'templates/login.tpl.html',
          controller: 'UserController'
        })

        .state('root.home', {
          url: '/home',
          templateUrl: 'templates/home.tpl.html',
          controller: 'HomeController as HomeController'
        })

        .state('root.profile', {
          url: '/profile/:id',
          templateUrl: 'templates/profile.tpl.html',
          controller: 'ProfileController as ProfileController'
        })

      .state('root.profile.addPhoto', {
        url: '/addPhoto',
        templateUrl: 'templates/addPhoto.tpl.html',
        controller: 'ProfileController as ProfileController'
      })

      .state('root.profile.addText', {
        url: '/addText',
        templateUrl: 'templates/addText.tpl.html',
        controller: 'ProfileController as ProfileController'
      })

      $urlRouterProvider.when('', '/login');
}



Config.inject = ['$stateProvider', '$urlRouterProvider']

export default Config;
