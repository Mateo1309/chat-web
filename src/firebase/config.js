import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDajpAgQKojsTZeNOZRttZfB8BSM7bxlPA",
    authDomain: "chat-1350f.firebaseapp.com",
    databaseURL: "https://chat-1350f-default-rtdb.firebaseio.com",
    projectId: "chat-1350f",
    storageBucket: "chat-1350f.appspot.com",
    messagingSenderId: "485372060511",
    appId: "1:485372060511:web:1711107f66d90dbbb14cea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database