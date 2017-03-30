import angular from 'angular';
import 'angular-ui-router';
import 'angular-cookies';

import Config from './config';
import SERVER from './server';
import setup from './setup';

import UserController from './controllers/user.js';
import ProfileController from './controllers/profile.js';
import HomeController from './controllers/home.js';




angular
    .module('app', ['ui.router', 'ngCookies'])
    .config(Config)
    .run (setup)
    .constant('SERVER', SERVER)
    .controller('UserController', UserController)
    .controller('ProfileController', ProfileController)
    .controller('HomeController', HomeController);
