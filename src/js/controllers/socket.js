import SERVER from '../server'


function SocketController ($scope, $cookies, $rootScope, $http, SERVER) {
    let vm = this;

    vm.sendMessage = sendMessage;

    vm.chats = [];
    vm.chatId = '';
    vm.senderId = '';
    vm.recipientId = '';
    vm.msg = '';
    vm.messages = [];

    function init () {
        $rootScope.socket.on('connection', () => {
            console.log(`${vm.username} got a connection`)
            //vm.users.push($cookies.get('userId'));
            $http.get(`${SERVER}/chats`)
                .then(function(response) {
                    vm.chats = response.data;
                    console.log(response.data, 'Chat started');
                })
                .catch(function(error) {
                    console.log(error, "You Suck");
                });
        });

        $rootScope.socket.on('message', (data) => {
            console.log(data);
            vm.messages.push(data);
            $scope.$apply();
        })

        $rootScope.socket.on('disconnecting', () => {
            console.log('We\'ve disconnected')
        })
    }

    init()

    function initChat (id) {
        vm.chatId = id;

        $http.get(`${SERVER}/chats/${vm.chatId}/messages`)
            .then(function(response) {
                console.log(response.data, 'Chat started');
            })
            .catch(function(error) {
                console.log(error, "You Suck");
            });
    }

    function sendMessage (data) {
        console.log('btn pressed');
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
