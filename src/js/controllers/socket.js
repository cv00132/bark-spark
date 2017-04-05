function SocketController ($websocket) {
    let vm = this;

    console.log("inside socketcontroller");

    vm.socket = $websocket('ws://localhost:8000/socket.io/');
    vm.messages = [];
    vm.sendMessage = sendMessage;

    function init () {
        vm.socket.on('connection', () => {
            console.log("SocketController init")
        })
        vm.socket.on('chat message', (msg) => {
            vm.messages.push(msg);
        })
    }

    init();

    function sendMessage (input) {
        vm.socket.emit('chat message', input);
    }

}

SocketController.$inject = ['$websocket'];

export default SocketController;
