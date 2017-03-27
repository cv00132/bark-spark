import SERVER from '../server'

function UserController($scope, $http, SERVER, $cookies, $state, $rootScope) {
    $scope.signUp = function(data){
      $http.post(`${SERVER}/signUp`, data)
      .then(function(resp) {
        return 'user successfully created'
      })
      .catch(function(error) {
        console.log(error, "yousuck")
      });
    };
  }


UserController.$inject = ['$scope', '$http', 'SERVER', '$cookies', '$state', '$rootScope'];

export default UserController;
