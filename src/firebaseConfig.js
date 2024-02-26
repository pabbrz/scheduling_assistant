// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyDtjDJmd-nxp1GMwdzCb_MhqrRC44NnWno",
    authDomain: "scheduling-assistant-8485d.firebaseapp.com",
    databaseURL: "https://scheduling-assistant-8485d-default-rtdb.firebaseio.com",
    projectId: "scheduling-assistant-8485d",
    storageBucket: "scheduling-assistant-8485d.appspot.com",
    messagingSenderId: "150704064193",
    appId: "1:150704064193:web:c3d4315b976ce699487640",
    measurementId: "G-6XJV1VVGCZ"
  };
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;