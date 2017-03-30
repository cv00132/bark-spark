function ProfileController ($http, $state, SERVER, $location){

  let vm = this;

  vm.dogs=[];
  vm.photos=[];
  vm.postPhoto = postPhoto;
  vm.backToProfile = backToProfile;
  vm.postText = postText;

  function init() {
    $http.get(`${SERVER}/user/${$state.params.id}`)
    .then(function(response){
      vm.currentUser=response.data;
      vm.dogs=response.data.Dogs;
      vm.photos=response.data.Photos;
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

  function postPhoto(photo) {
    $http.post(`${SERVER}/photo`, photo)
    .then(function(){
      console.log("successfully posted the photo");
      backToProfile();
      $state.reload();
    })
    .catch(function(error){
      console.log(error);
    })
  }

  function postText(post) {
    console.log("working")
    $http.post(`${SERVER}/post`, post)
    .then(function(){
      console.log("successfully posted the textPost");
      backToProfile();
      $state.reload();
    })
  }
}

ProfileController.$inject=['$http', '$state', 'SERVER', '$location'];
export default ProfileController;
