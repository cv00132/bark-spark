function HomeController($http, $state, SERVER) {

    let vm = this;
    vm.allUsers = [];
    vm.dogs = [];
    vm.getAge = getAge;

    function init() {
      console.log("working")
        $http.get(`${SERVER}/users`)
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

    function getAge(birthday) {
        var today = new Date();
        var birthDate = new Date(birthday);
        var age = today.getFullYear() - birthDate.getFullYear();
        var month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
}


HomeController.$inject=['$http', '$state', 'SERVER'];
export default HomeController;
