import firebase from 'firebase';
var config = {
    apiKey: "AIzaSyAJEXvErFHjKT8SHzZJkpLI-hi3NTEA5yk",
    authDomain: "reactchat-73f73.firebaseapp.com",
    databaseURL: "https://reactchat-73f73.firebaseio.com",
    projectId: "reactchat-73f73",
    storageBucket: "reactchat-73f73.appspot.com",
    messagingSenderId: "994528035608"
};

const fire = firebase.initializeApp(config);

export default fire;


