// Import necessary Firebase modules
import { getFirestore, collection, addDoc, doc, setDoc, deleteDoc, getDocs } from 'firebase/firestore';

// Assume you have initialized Firebase with your configuration
const db = getFirestore();

// Function to add a task to the database
async function addTask(taskName, createdBy, createdAt, dueDate) {
  const tasksCollection = collection(db, 'tasks');

  try {
    const newTaskRef = await addDoc(tasksCollection, {
      taskName: taskName,
      createdBy: createdBy,
      createdAt: createdAt,
      dueDate: dueDate
    });

    console.log('Task added with ID:', newTaskRef.id);
  } catch (error) {
    console.error('Error adding task:', error.message);
  }
}

// Function to edit a task in the database
async function editTask(taskId, updatedTaskName) {
  const taskDocRef = doc(db, 'tasks', taskId);

  try {
    await setDoc(taskDocRef, { taskName: updatedTaskName }, { merge: true });

    console.log('Task edited successfully');
  } catch (error) {
    console.error('Error editing task:', error.message);
  }
}

// Function to remove a task from the database
async function removeTask(taskId) {
  const taskDocRef = doc(db, 'tasks', taskId);

  try {
    await deleteDoc(taskDocRef);

    console.log('Task removed successfully');
  } catch (error) {
    console.error('Error removing task:', error.message);
  }
}

// Function to get all tasks from the database
async function getAllTasks() {
  const tasksCollection = collection(db, 'tasks');

  try {
    const querySnapshot = await getDocs(tasksCollection);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
    });
  } catch (error) {
    console.error('Error getting tasks:', error.message);
  }
}

// Example usage
addTask('Task 1', 'User1', new Date());
editTask('taskId123', 'Updated Task 1');
removeTask('taskId123');
getAllTasks();
