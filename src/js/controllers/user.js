import SERVER from '../server'

function UserController($scope, $http, SERVER, $cookies, $state, $rootScope) {
    $scope.signUp = function(data) {
        $http.post(`${SERVER}/signUp`, data)
        $state.reload()
            .then(function(response) {
                console.log(response.data, 'User successfully created');
            })
            .catch(function(error) {
                console.log(error, "You Suck");
            });
    };
}


UserController.$inject = ['$scope', '$http', 'SERVER', '$cookies', '$state', '$rootScope'];

export default UserController;
