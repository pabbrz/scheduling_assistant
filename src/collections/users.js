// Firebase Integration
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc, doc, getDoc, updateDoc, increment } from 'firebase/firestore';

const auth = getAuth();
const db = getFirestore();

// Function to check if email or username is already in use
async function isEmailOrUsernameTaken(email, username) {
  const emailSnapshot = await collection(db, "users").where("email", "==", email).get();
  const usernameSnapshot = await collection(db, "users").where("username", "==", username).get();

  return {
    emailTaken: !emailSnapshot.empty,
    usernameTaken: !usernameSnapshot.empty,
  };
}

// Function to add a new user with a sequential userId
async function signUp(username, email, password) {
  try {
    // Check if email or username is already in use
    const isTaken = await isEmailOrUsernameTaken(email, username);

    if (isTaken.emailTaken && isTaken.usernameTaken) {
      console.error("Email and username already in use.");
      return "Email and username already in use.";
    } else if (isTaken.emailTaken) {
      console.error("Email already in use.");
      return "Email already in use.";
    } else if (isTaken.usernameTaken) {
      console.error("Username already in use.");
      return "Username already in use.";
    }

    // Get the current value of the user counter and increment it
    const counterDocRef = doc(db, 'counters', 'userCounter');
    const counterDocSnapshot = await getDoc(counterDocRef);
    const currentCounterValue = counterDocSnapshot.exists() ? counterDocSnapshot.data().value : 0;

    // Update the counter for the next user
    await updateDoc(counterDocRef, { value: increment(1) });

    // Create a new user through Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email);

    // Access the user information
    const user = userCredential.user;

    // Add additional user information to Firestore with sequential userId
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      user_id: currentCounterValue + 1,
      username,
      email,
      // Add more fields as needed
    });

    console.log('User created successfully with sequential userId:', currentCounterValue + 1);
    return "User created successfully.";
  } catch (error) {
    console.error('Error creating user:', error.message);
    throw error;
  }
}

// Example usage:
const userUsername = 'JohnDoe';
const userEmail = 'john.doe@example.com';
const userPassword = 'secure_password';

try {
  const resultMessage = await signUp(userUsername, userEmail, userPassword);
  console.log(resultMessage);
} catch (error) {
  // Handle the error appropriately
}
