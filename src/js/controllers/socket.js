function SocketController () {
    let vm = this;

    vm.sendMessage = sendMessage;

    var socket = io('ws://localhost:8000/');
    vm.msg = '';
    vm.messages = [];
    vm.users = [];

    function init () {
        socket.on('connection', () => {
            console.log('We\'ve got a connection')
        });

        socket.on('message', (data) => {
            console.log(data);
        })

        socket.on('disconnecting', () => {
            console.log('We\'ve disconnected')
        })
    }

    init()

    function sendMessage (data) {
        console.log('btn pressed');
        socket.emit('message', { msg: data });

            vm.messages.push(data);
            console.log(vm.messages);
            socket.emit('message', data);

        console.log('sent message', data);
        document.getElementById('chat').reset();
    }
}

SocketController.$inject = [];

export default SocketController;
