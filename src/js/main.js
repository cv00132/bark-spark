import angular from 'angular';
import 'angular-ui-router';
import 'angular-cookies';
import 'angularfire';

import Config from './config';
import SERVER from './server';
import setup from './setup';

import FirebaseController from './controllers/firebase.js';
import UserController from './controllers/user.js';
import ProfileController from './controllers/profile.js';
import HomeController from './controllers/home.js';

var config = {
  apiKey: "AIzaSyDw4xUPXE7ngu98VWUdCZwiqZaUNyj80ow",
  authDomain: "barkspark-f004c.firebaseapp.com",
  databaseURL: "https://barkspark-f004c.firebaseio.com",
  storageBucket: "barkspark-f004c.appspot.com",
  messagingSenderId: "781730587867"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.requestPermission()
    .then(function() {
        console.log('Have permission');
        messaging.getToken()
        .then(function(currentToken) {
            if (currentToken) {
                sendTokenToServer(currentToken);
                updateUIForPushEnabled(currentToken);
            } else {
                // Show permission request.
                console.log('No Instance ID token available. Request permission to generate one.');
                // Show permission UI.
                updateUIForPushPermissionRequired();
                setTokenSentToServer(false);
            }
        })
        .catch(function(err) {
            console.log('An error occurred while retrieving token. ', err);
            showToken('Error retrieving Instance ID token. ', err);
            setTokenSentToServer(false);
        });
    })
.then(function(token) {
    console.log(token);
})
.catch(function(err) {
    console.log('Error Occured');
});

 messaging.onTokenRefresh(function() {
    messaging.getToken()
    .then(function(refreshedToken) {
      console.log('Token refreshed.');
      // Indicate that the new Instance ID token has not yet been sent to the
      // app server.
      setTokenSentToServer(false);
      // Send Instance ID token to app server.
      sendTokenToServer(refreshedToken);
      // [START_EXCLUDE]
      // Display new Instance ID token and clear UI of all previous messages.
      resetUI();
      // [END_EXCLUDE]
    })
    .catch(function(err) {
      console.log('Unable to retrieve refreshed token ', err);
      showToken('Unable to retrieve refreshed token ', err);
    });
  });

angular
    .module('app', ['ui.router', 'ngCookies', 'firebase'])
    .config(Config)
    .run (setup)
    .constant('SERVER', SERVER)
    .controller('FirebaseController', FirebaseController)
    .controller('UserController', UserController)
    .controller('ProfileController', ProfileController)
    .controller('HomeController', HomeController);
