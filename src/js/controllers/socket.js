import SERVER from '../server'


function SocketController ($scope, $cookies, $rootScope, $http, SERVER) {
    let vm = this;

    vm.sendMessage = sendMessage;
    vm.initChat = initChat;

    vm.chats = [];
    vm.chatId = '';
    vm.senderId = '';
    vm.receiverId = '';
    vm.msg = '';
    vm.messages = [];
    vm.users = [];
    vm.username = $cookies.get('username');
    vm.userId = $cookies.get('userId');

    function init () {
        $http.get(`${SERVER}/chats`)
            .then(function(response) {
                console.log(response.data);
                vm.chats = response.data;
            })
            .catch(function(error) {
                console.log(error, "You Suck");
            });

        $rootScope.socket.on('connection', () => {
            console.log(`${vm.username} got a connection`)
        });

        $rootScope.socket.on('message', (data) => {
            console.log(data);
            vm.messages.push(data);
            $scope.$apply();
        });

        $rootScope.socket.on('disconnecting', () => {
            console.log('We\'ve disconnected')
        });


    }

    init()

    function initChat (id) {
        vm.chatId = id;

        // Note that we set up the Sender to be the current user
        // and the receiver to be the "other person" in the chat.
        // This makes sense because we accepted a match but wouldn't
        // work if we had initiated the match. We need to actually
        // figure out how to test for this with a conditional in the
        // morning when we have brains again.
        $http.get(`${SERVER}/chats/${id}/messages`)
            .then(function(response) {
                vm.messages = response.data.Messages;
                vm.senderId = $cookies.get('userId');
                vm.receiverId = response.data.recipientId;
                console.log(response.data, 'Chat started');
            })
            .catch(function(error) {
                console.log(error, "You Suck");
            });
    }

    function sendMessage (data) {
        $rootScope.socket.emit('message',
            { msg: data,
              chatId: vm.chatId,
              senderId: vm.senderId,
              recipientId: vm.receiverId
            }
        );

        vm.messages.push(data);

        console.log('sent message', data);
        document.getElementById('chat').reset();
    }
}

SocketController.$inject = ['$scope', '$cookies', '$rootScope', '$http', 'SERVER'];

export default SocketController;
