// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
var config = {
  apiKey: "AIzaSyDw4xUPXE7ngu98VWUdCZwiqZaUNyj80ow",
  authDomain: "barkspark-f004c.firebaseapp.com",
  databaseURL: "https://barkspark-f004c.firebaseio.com",
  storageBucket: "barkspark-f004c.appspot.com",
  messagingSenderId: "781730587867"
};
firebase.initializeApp(config)
// firebase.initializeApp({
//   'messagingSenderId': 'YOUR-SENDER-ID'
// });

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
