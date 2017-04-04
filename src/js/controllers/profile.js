function ProfileController ($http, $state, SERVER, $location){

  let vm = this;

  vm.currentUser = [];
  vm.dogs=[];
  vm.photos=[];
  vm.tags=[];
  vm.matches=[];
  vm.addPhoto = addPhoto;
  vm.backToProfile = backToProfile;
  vm.addText = addText;
  vm.addDog = addDog;
  vm.addTags = addTags;
  vm.editUserInfo = editUserInfo;
  vm.newMatch = newMatch;


  function init() {
    $http.get(`${SERVER}/user/${$state.params.id}`)
    .then(function(response){
      vm.currentUser=response.data;
      vm.dogs=response.data.Dogs;
      vm.photos=response.data.Photos;
      vm.tags=response.data.Tags;
      vm.matches=response.data.Matches;
      console.log(response, "you got data");
    })
    .catch(function(error){
      console.log(error, "you suck");
    })
  }
  init();

  function backToProfile(){
      $state.go(`root.profile`);
  }

  function addPhoto(post) {
          $http.post(`${SERVER}/${$state.params.id}/post`, post)
          .then(function(){
              console.log("successfully posted the photo");
              backToProfile();
              $state.reload();
          })
          .catch(function(error){
              console.log(error);
          })
      }

  function addText(post) {
    $http.post(`${SERVER}/${$state.params.id}/post`, post)
    .then(function(){
      console.log("successfully posted the textPost", body);
      backToProfile();
      $state.reload();
    })
    .catch(function(error){
      console.log(error);
    })
  }

  function addTags(input) {
    $http.post(`${SERVER}/tag`, input)
    .then(function(){
      console.log("tag created");
    })
    .catch(function(error){
      console.log(error);
    })
  }

  function editUserInfo(data) {
    $http.put(`${SERVER}/user/${$state.params.id}`, data)
    .then(function(){
      console.log("info edited");
      // backToProfile();
      // $state.reload();
    })
    .catch(function(error){
      console.log(error);
    })
  }

  function addDog(dog) {
    $http.post(`${SERVER}/${$state.params.id}/addDog`, dog)
    .then(function(response){
      console.log("hooray there's a new dog!");
      backToProfile();
      $state.reload();
    })
    .catch(function(error){
      console.log(error);
    })
  }

  function newMatch() {
    $http.post(`${SERVER}/user/${$state.params.id}/match`)
    .then(function(response){
      console.log("match added");
      $state.reload();
    })
    .catch(function(error){
      console.log(error);
    })
  }
}
ProfileController.$inject=['$http', '$state', 'SERVER', '$location'];
export default ProfileController;
