    // Import the functions you need from the SDKs you need
    import { initializeApp } from "firebase/app";
    import { getAnalytics } from "firebase/analytics";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyDtjDJmd-nxp1GMwdzCb_MhqrRC44NnWno",
      authDomain: "scheduling-assistant-8485d.firebaseapp.com",
      databaseURL: "https://scheduling-assistant-8485d-default-rtdb.firebaseio.com",
      projectId: "scheduling-assistant-8485d",
      storageBucket: "scheduling-assistant-8485d.appspot.com",
      messagingSenderId: "150704064193",
      appId: "1:150704064193:web:720f1ecc4726d10b487640",
      measurementId: "G-YSJCJPC2NP"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);