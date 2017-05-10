import SERVER from '../server'

function UserController($scope, $http, SERVER, $cookies, $state, $rootScope, $location) {

  let vm = this;

  vm.goProfile = goProfile;
  vm.menu = false;

  vm.dropMenu = dropMenu;


  $scope.theFilter = "";
  $scope.userInput = "";

  $scope.filterButton = function(userInput){
    $scope.theFilter = $scope.userInput;
  }

    $scope.signUp = function(data) {
        $http.post(`${SERVER}/signUp`, data)
            .then(function(response) {
                $location.path(`/login`)
                console.log(response.data, 'User successfully created');
            })
            .catch(function(error) {
                console.log(error, "You Suck");
            });
    };
    // var userID = $cookies.get('userId')
    // $scope.go('root.profile', { id:userID})

    // $scope.validateAge = function($scope) {
    //     var today = new Date();
    //     var minAge = 18;
    //     $scope.minAge = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    // }


    $scope.login = function(data) {
      console.log("working")
      $http.post(`${SERVER}/login`, data)
      .then(function(response){
      console.log(response);
      $rootScope.loggedIn = true;
      $cookies.put('access-token', response.data.token);
      $cookies.put('userId',response.data.user.id);
      $cookies.put('username',response.data.user.username);
      $http.defaults.headers.common['access-token'] = response.data.token;
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

  function goProfile ()  {
    let userId = $cookies.get('userId');
    $state.go('root.profile', {id: userId})
  }

  function dropMenu() {
    if(vm.menu === false){
      vm.menu = true;
    }
    else if(vm.menu === true){
      vm.menu = false;
    }
  }


}

UserController.$inject = ['$scope', '$http', 'SERVER', '$cookies', '$state', '$rootScope', '$location'];

export default UserController;
