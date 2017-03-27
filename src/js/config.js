function Config($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('signUp', {
            url: '/signUp',
            templateUrl: 'templates/signUp.tpl.html',
            controller: 'UserController'
        })

        $urlRouterProvider.when('', '/signUp');
}



Config.inject = ['$stateProvider', '$urlRouterProvider']

export default Config;
