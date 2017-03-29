function HomeController ($http, $state, SERVER){

  let vm = this;

  function init () {
   if($rootScope.loggedIn){
     $http.get(`${SERVER_URL}/user/${$state.params.id}`).then(resp => {
       console.log("at profile");
     });
   }else{
     $state.go('signup');
   }
 }

 init();
}

export default HomeController;
