import angular from 'angular';
import 'angular-ui-router';
import 'angular-cookies';
import 'angular-websocket';

import Config from './config';
import SERVER from './server';
import setup from './setup';

import UserController from './controllers/user.js';
import ProfileController from './controllers/profile.js';
import HomeController from './controllers/home.js';
// import SocketController from './controllers/socket.js';


angular
    .module('app', ['ui.router', 'ngCookies', 'ngWebSocket'])
    .config(Config)
    .run (setup)
    .constant('SERVER', SERVER)
    .controller('UserController', UserController)
    .controller('ProfileController', ProfileController)
    .controller('HomeController', HomeController);
//    .controller('SocketController', SocketController);
