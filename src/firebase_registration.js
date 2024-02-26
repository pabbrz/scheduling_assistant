// registerUser.js

// Import the necessary Firebase Authentication functions
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// Replace this with your Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Function to register a user
async function registerUser(email, password) {
    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User registered:', user.uid);
    } catch (error) {
      console.error('Registration error:', error.message);
    }
  }
  
  // Get user email from front end and register here!
  
  // Call the registerUser function with the provided email and password
  registerUser(email, password);