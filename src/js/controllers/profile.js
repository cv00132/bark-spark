function ProfileController ($http, $state, SERVER){

  let vm = this;

  vm.dogs=[];

  function init() {
    $http.get(`${SERVER}/user/${$state.params.id}`)
    .then(function(response){
      vm.currentUser=response.data;
      vm.dogs=response.data.Dogs;
      console.log(vm.currentUser);
      console.log(vm.dogs);

      console.log(response, "you got data");
    })
    .catch(function(error){
      console.log(error, "you suck");
    })
  }
  init();


}

ProfileController.$inject=['$http', '$state', 'SERVER'];
export default ProfileController;
