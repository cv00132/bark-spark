function ProfileController ($http, $state, SERVER, $location, $cookies){

  let vm = this;

  vm.currentUser = [];
  vm.dogs=[];
  vm.photos=[];
  vm.tags=[];
  vm.matches=[];
  vm.sameMatch = [];
  vm.alreadyMatch=false;
  vm.userId = $cookies.get('userId');
  vm.myProfile = $cookies.get('userId') === $state.params.id;
  vm.currentUserId = $cookies.get('userId');
//
  vm.backToProfile = backToProfile;
//
  vm.addPhoto = addPhoto;
  vm.addTags = addTags;
  vm.addDog = addDog;
  vm.addText = addText;
//
  vm.getAge = getAge;
  vm.editUserInfo = editUserInfo;
//
  vm.newMatch = newMatch;
  vm.acceptMatch = acceptMatch;
  vm.deleteMatch = deleteMatch;

  function init() {
    $http.get(`${SERVER}/user/${$state.params.id}`)
    .then(function(response){
      vm.currentUser=response.data;
      vm.dogs=response.data.Dogs;
      vm.photos=response.data.Photos;
      vm.tags=response.data.Tags;
      vm.matches=response.data.Received;
      var timeCreated = response.data.Posts;
      checkMatch();
    })
    .catch(function(error){
      console.log(error, "you suck");
    })
}
  init();

  function checkMatch() {
    for (var i = 0; i < vm.currentUser.Received.length; i++){
      var currentMatch = vm.currentUser.Received[i];
      if (currentMatch.senderId === Number(vm.userId)){
       return vm.alreadyMatch = true;
      }
    }
  }

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

  function backToProfile(){
      $state.go(`root.profile`);
  }

  function addPhoto(post) {
          $http.post(`${SERVER}/${$state.params.id}/post`, post)
          .then(function(){
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
      backToProfile();
      $state.reload();
    })
    .catch(function(error){
      console.log(error);
    })
  }

  function addDog(dog) {
    $http.post(`${SERVER}/${$state.params.id}/addDog`, dog)
    .then(function(response){
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
      $state.reload();
    })
    .catch(function(error){
      console.log(error);
    })
  }


  function acceptMatch(matchId){
    $http.put(`${SERVER}/matches/${matchId}/accept`)
    .then(function(response){
      $state.reload();
    })
    .catch(function(error){
      console.log(error);
    })
  }

  function deleteMatch(matchId){
    $http.delete(`${SERVER}/matches/${matchId}/delete`)
    .then(function(response){
      $state.reload();
    })
    .catch(function(error){
      console.log(error);
    })
  }
}
ProfileController.$inject=['$http', '$state', 'SERVER', '$location', '$cookies'];
export default ProfileController;
