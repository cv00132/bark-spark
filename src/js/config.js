function Config($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('signUp', {
            url: '/signUp',
            templateUrl: 'templates/signUp.tpl.html',
            controller: 'UserController'
        })

        .state('login', {
          url: '/login',
          templateUrl: 'templates/login.tpl.html',
          controller: 'UserController'
        })

        .state('profile', {
          url: '/profile/:id',
          templateUrl: 'templates/profile.tpl.html',
          controller: 'ProfileController as ProfileController'
        })

        $urlRouterProvider.when('', '/signUp');
}



Config.inject = ['$stateProvider', '$urlRouterProvider']

export default Config;
