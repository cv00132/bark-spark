import SERVER from '../server'


function SocketController ($scope, $cookies, $rootScope, $http, SERVER) {
    let vm = this;

    vm.sendMessage = sendMessage;
    vm.initChat = initChat;

    vm.chats = [];
    vm.chatId = '';
    vm.senderId = '';
    vm.recipientId = '';
    vm.msg = '';
    vm.messages = [];
    vm.users = [];
    vm.username = $cookies.get('username');

    function init () {
        $rootScope.socket.on('connection', () => {
            console.log(`${vm.username} got a connection`)
        });

        $rootScope.socket.on('message', (data) => {
            console.log(data);
            vm.messages.push(data);
            $scope.$apply();
        })

        $rootScope.socket.on('disconnecting', () => {
            console.log('We\'ve disconnected')
        })

        $http.get(`${SERVER}/chats`)
            .then(function(response) {
                console.log(response.data);
                vm.chats = response.data;
            })
            .catch(function(error) {
                console.log(error, "You Suck");
            });
    }

    init()

    function initChat (id) {

        $http.get(`${SERVER}/chats/${id}/messages`)
            .then(function(response) {
                vm.messages = response.data;
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
              recipientId: vm.recipientId
            }
        );

        // vm.messages.push(data);

        console.log('sent message', data);
        document.getElementById('chat').reset();
    }
}

SocketController.$inject = ['$scope', '$cookies', '$rootScope', '$http', 'SERVER'];

export default SocketController;
