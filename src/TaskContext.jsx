import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Create context
const TaskContext = createContext();

// Provider component
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);  // Update user in state when auth state changes
      setTasks([]);  // Clear tasks on auth change
    });

    return () => unsubscribeAuth();  // Cleanup auth listener
  }, []);

  useEffect(() => {
    if (user) {
      const tasksRef = collection(db, 'tasks');
      const q = query(tasksRef, where('userID', '==', user.uid));

      const unsubscribeTasks = onSnapshot(q, (snapshot) => {
        const newTasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTasks(newTasks);  // Update tasks based on the current user
      }, error => {
        console.error("Error fetching tasks: ", error);
      });

      return () => unsubscribeTasks();  // Cleanup tasks listener when user changes or logs out
    } else {
      setTasks([]);  // Clear tasks if there is no user logged in
    }
  }, [user]);  // React to changes in user

  return (
    <TaskContext.Provider value={tasks}>
      {children}
    </TaskContext.Provider>
  );
};

// Hook to use tasks
export const useTasks = () => useContext(TaskContext);
