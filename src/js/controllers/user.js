import SERVER from '../server'

function UserController($scope, $http, SERVER, $cookies, $state, $rootScope) {
    $scope.signUp = function(data) {
        $http.post(`${SERVER}/signUp`, data)
            .then(function(response) {
                $state.go('login');
                console.log(response.data, 'User successfully created');
            })
            .catch(function(error) {
                console.log(error, "You Suck");
            });
    };

    $scope.login = function(data) {
      $http.post(`${SERVER}/login`, data)
      .then(function(response){
      console.log(response);
      $rootScope.loggedIn = true;
      $cookies.put('access-token', response.data.token);
      $http.defaults.headers.common['access-token'] = response.data.token;
      console.log(response.data.token, "you logged in");
    })
    .catch(function(error){
      console.log(error, "you suck");
    })
  };

}


UserController.$inject = ['$scope', '$http', 'SERVER', '$cookies', '$state', '$rootScope'];

export default UserController;
