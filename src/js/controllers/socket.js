import 'angular-websocket';

function SocketController ($websocket) {
    let vm = this;

    vm.sendMessage = sendMessage;

    //console.log("inside socketcontroller");

    //vm.socket = $websocket('ws://localhost:8000/socket.io/socket.io.js');
    var socket = io('ws://localhost:8000/');
    vm.messages = [];

    function init () {
        socket.on('connect', () => {
            console.log("We've got a connection")
        })

        socket.on('tweet', function(tweet) {
            // todo: add the tweet as a DOM node

            console.log('tweet from', tweet.user);
            console.log('contents:', tweet.text);
        });
    }

    init();

    function sendMessage (message) {
        console.log('btn pressed');

            //var msg = {message: 'You\'ve got message'}
            socket.on('message', (message) => {
                socket.emit('message', `got it!`, message);
            })
        console.log('sent message', message);
    }

    // function joinRoom () {
    //     socket.emit('subscribe', conversation_id);
    //
    //     socket.emit('send message', {
    //         room: conversation_id,
    //         message: "Some message"
    //     });
    //
    //     socket.on('conversation private post', function(data) {
    //         //display data.message
    //     });
    // }


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
