import angular from 'angular';
import 'angular-ui-router';
import 'angular-cookies';

import Config from './config';
import SERVER from './server';

import UserController from './controllers/user.js';



angular
    .module('app', ['ui.router', 'ngCookies'])
    .config(Config)
    .constant('SERVER', SERVER)
    .controller('UserController', UserController);
