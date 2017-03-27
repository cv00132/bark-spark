function Config($stateProvider, $urlProvider) {

  $stateProvider
  .state('signUp', {
    url:'/signUp',
    templateUrl: 'templates/signUp.tpl.html',
    //add Controller here!
  })
}

$urlRouterProvider.when('', '/signUp');
Config.inject = ['$stateProvider', '$urlProvider']
export default Config;
