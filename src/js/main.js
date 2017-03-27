import angular from 'angular';
import 'angular-ui-router';
import 'angular-cookies';


import Config from './config';



angular
.module('app', ['ui-router', 'ngCookies'])
.config(Config)
