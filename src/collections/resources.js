// Import necessary Firestore functions from Firebase SDK
import { getFirestore, collection, addDoc, doc, setDoc, getDoc, updateDoc, increment } from 'firebase/firestore';

// Initialize Firestore
const db = getFirestore();

// Function to add a resource to the Firestore collection with sequential resourceId
async function addResource(resourceName, resourceDescription, resourceStatus) {
  try {
    // Reference to the "resources" collection
    const resourcesCollection = collection(db, 'resources');

    // Get the current value of the resource counter and increment it
    const counterDocRef = doc(db, 'counters', 'resourceCounter');
    const counterDocSnapshot = await getDoc(counterDocRef);
    const currentCounterValue = counterDocSnapshot.exists() ? counterDocSnapshot.data().value : 0;

    // Update the counter for the next resource
    await updateDoc(counterDocRef, { value: increment(1) });

    // Add a document to the collection with sequential resourceId
    const newResourceRef = await addDoc(resourcesCollection, {
      resource_id: currentCounterValue + 1,
      resource_name: resourceName,
      resource_description: resourceDescription,
      resource_status: resourceStatus,
      // Add more fields as needed
    });

    console.log('Resource added successfully to Firestore collection with sequential resourceId:', currentCounterValue + 1);
  } catch (error) {
    console.error('Error adding resource to Firestore:', error.message);
    throw error;
  }
}

// Example usage:
const resourceName = 'Conference Room 3E03';
const resourceDescription = 'A conference room on the east section of the third floor with 9 tables and 45 chairs.';
const resourceStatus = 'Available';

try {
  await addResource(resourceName, resourceDescription, resourceStatus);
} catch (error) {
  // Handle the error appropriately
}
