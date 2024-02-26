import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const auth = getAuth();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in successfully');
        } catch (error) {
            console.error('Login error:', error.message);
        }
    };
};

import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User registered:', user);
    } catch (error) {
      console.error('Registration error:', error.message);
    }
  };
