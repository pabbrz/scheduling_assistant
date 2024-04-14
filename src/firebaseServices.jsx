import { db } from './firebaseConfig';
import { collection, query, where, doc, getDoc, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

// Fetch user data from Firestore
const useUserData = (userId) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      const docRef = doc(db, 'users', userId);
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log('No user data found');
          setError('No user data found');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.message);
      }
    };

    fetchUserData();
  }, [userId]);

  return [userData, error];
};

// function to fetch all tasks for a user **** USING TASKCONTEXT INSTEAD *******
async function fetchTasksByUserId(userID) {
  const tasksRef = collection(db, 'tasks');
  const q = query(tasksRef, where('userID', '==', userID));

  try {
    const querySnapshot = await getDocs(q);
    const tasks = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      tasks.push({ id: doc.id, ...doc.data() });
    });
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    return [];  
  }
}

// function to delete a task
async function deleteTask(taskId) {
  const taskRef = doc(db, 'tasks', taskId);

  try {
    await deleteDoc(taskRef);
    console.log("Task successfully deleted!");
  } catch (error) {
    console.error("Error removing task: ", error);
  }
}

const updateUserData = async (userId, updates) => {
  const userRef = doc(db, 'users', userId);
  try {
      await updateDoc(userRef, updates);
      console.log("User data updated successfully");
  } catch (error) {
      console.error("Error updating user data:", error);
  }
};

export { useUserData, fetchTasksByUserId, deleteTask, updateUserData };
