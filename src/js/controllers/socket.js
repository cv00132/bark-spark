import 'angular-websocket';

function SocketController ($websocket) {
    let vm = this;

    //console.log("inside socketcontroller");

    //vm.socket = $websocket('ws://localhost:8000/socket.io/socket.io.js');
    var socket = io('ws://localhost:8000/');
    vm.messages = [];


        socket.on('connect', (greet) => {
            console.log("We've got a connection")
        })

        socket.on("tweet", function(tweet) {
            // todo: add the tweet as a DOM node

            console.log("tweet from", tweet.user);
            console.log("contents:", tweet.text);
        });


        // connection.onMessage((msg) => {
        //     console.log("Got a message! " + msg);
        // })

        // connection.send(JSON.stringify({
        //     type: 'chat',
        //     message: 'hi there'
        //}))

    // }


}

SocketController.$inject = ['$websocket'];

export default SocketController;
