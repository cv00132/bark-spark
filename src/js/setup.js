function setup ($rootScope, $cookies, $http) {

      var token = $cookies.get('access-token');

      if (token) {
          $rootScope.loggedIn = true;
          $http.defaults.headers.common['access-token'] = token;
      }
      $rootScope.socket = io('ws://fierce-fjord-93438.herokuapp.com/');

  }

  setup.$inject = ['$rootScope', '$cookies', '$http'];

  export default setup;
