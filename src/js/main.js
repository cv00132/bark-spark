import angular from 'angular';
import 'ng-tags-input';
import 'angular-ui-router';
import 'angular-cookies';
import 'angular-google-maps';

import Config from './config';
import SERVER from './server';
import setup from './setup';

import UserController from './controllers/user.js';
import ProfileController from './controllers/profile.js';
import HomeController from './controllers/home.js';
import MapController from './controllers/map.js';

angular
.module('app', ['ui.router', 'ngCookies', 'ngTagsInput', 'uiGmapgoogle-maps'])
    .config(Config)
    .run (setup)
    .constant('SERVER', SERVER)
    .controller('UserController', UserController)
    .controller('ProfileController', ProfileController)
    .controller('HomeController', HomeController)
    .controller('MapController', MapController);
