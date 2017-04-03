function FirebaseController($scope, $firebaseArray, $firebaseObject) {
    const rootRef = firebase.database().ref().child('angular');
    const ref = rootRef.child('object');
    this.object = $firebaseObject(ref);

    $scope.messages = function() {
      var ref = firebase.database().ref().child("messages");
      $scope.messages = $firebaseArray(ref);
  };

  console.log($scope.messages);
  
    $scope.addMessage = function() {
        $scope.messages.$add({
            text: $scope.newMessageText
        });
    }
}

FirebaseController.$inject = ['$scope', '$firebaseArray', '$firebaseObject'];

export default FirebaseController;
