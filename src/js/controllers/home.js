function HomeController($http, $state, SERVER) {

    let vm = this;
    vm.allUsers = [];
    vm.dogs = [];

    function init() {
      console.log("working")
        $http.get(`${SERVER}/getUsers`)
            .then(function(response) {
                vm.allUsers = response.data;
                console.log(response, "You got data!");
                console.log(vm.allUsers);
            })
            .catch(function(error) {
                console.log(error);
            })
    }
      init();
}


HomeController.$inject=['$http', '$state', 'SERVER'];
export default HomeController;
