import SERVER from '../server'

function UserController($scope, $http, SERVER, $cookies, $state, $rootScope, $location) {

  $scope.theFilter = "";
  $scope.userInput = "";

  $scope.filterButton = function(userInput){
    $scope.theFilter = $scope.userInput;
  }

    $scope.signUp = function(data) {
        $http.post(`${SERVER}/signUp`, data)
            .then(function(response) {
                $state.go('root.login');
                console.log(response.data, 'User successfully created');
            })
            .catch(function(error) {
                console.log(error, "You Suck");
            });
    };

    // $scope.validateAge = function($scope) {
    //     var today = new Date();
    //     var minAge = 18;
    //     $scope.minAge = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    // }


    $scope.login = function(data) {
      $http.post(`${SERVER}/login`, data)
      .then(function(response){
      console.log(response);
      $rootScope.loggedIn = true;
      $cookies.put('access-token', response.data.token);
      $cookies.put('userId', response.data.user.id);
      $http.defaults.headers.common['access-token'] = response.data.token;
      console.log(response.data.user.id, response.data.token, "you logged in");
      $location.path(`/profile/${response.data.user.id}`);
    })
    .catch(function(error){
      console.log(error, "you suck");
    })
  };

  $scope.logout = function(){
    $cookies.remove('access-token');
    $cookies.remove('userId');
    $rootScope.loggedIn = false;
    $location.path(`/login`)
  }
}




UserController.$inject = ['$scope', '$http', 'SERVER', '$cookies', '$state', '$rootScope', '$location'];

export default UserController;
