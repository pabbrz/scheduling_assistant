import { db } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';


// fetch user data from firestore
const useUserData = (userId) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        console.log('No user data found');
      }
    };

    fetchUserData();
  }, [userId]);

  return userData;
};

export default useUserData;