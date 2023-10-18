// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCLUfbsuHJQYc6l6wvnMbJULLmMZfmjsqg",
    authDomain: "csci526-bee47.firebaseapp.com",
    databaseURL: "https://csci526-bee47-default-rtdb.firebaseio.com",
    projectId: "csci526-bee47",
    storageBucket: "csci526-bee47.appspot.com",
    messagingSenderId: "148913695591",
    appId: "1:148913695591:web:6290b092553646cd8f9dc2",
    measurementId: "G-HFF0X7JZPT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export default app;
export { database };