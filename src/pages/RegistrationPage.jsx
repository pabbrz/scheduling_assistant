import '../stylesheets/RegistrationPage.css'
import peopleWorking from "../assets/peopleWorking.png"

import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
// import bcrypt from 'bcrypt';

{/* Firebase imports */}
import 'firebase/auth';
import 'firebase/firestore';
import app from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

const loginLink = "/Login";

//Sign up function allows the user to set up their name(first and last),
//their number, email, and password for their new account
function RegistrationPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');

  let navigate = useNavigate();
  
//   const db = getFirestore(app);   // imported now from firebaseConfig.js
  const userCollectionRef = collection(db, 'users');
  
//   const generatePasswordHash = async (password) => {
//     // Generate a salt to add randomness to the hash
//     const saltRounds = 10;
//     const salt = await bcrypt.genSalt(saltRounds);
//   const db = getFirestore(app);   // imported now from firebaseConfig.js 
//     // Generate the hash using the salt and the password
//     const hash = await bcrypt.hash(password, salt);
  
//     return hash;
//   };

  // form validation rules
  const validationSchema = Yup.object().shape({
    fname: Yup.string().required("First Name is required"),
    lname: Yup.string().required("Last name is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    password2: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
//   const passwordHash = generatePasswordHash(password);
  // Sends data to db if sign up credentials are proper
  const onSubmit = async (e) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
          // Signed in
          const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {  ///await addDoc(collection(db, "users"),{
            email: user.email,
            // password_hash: "******************************", // firebase authentication handles passwords securely from what i've read
            user_id: user.uid,
            fname: fname,
            lname: lname,
            username: fname + ' ' + lname
          });
          console.log(user);
          // setShowSignUp(!showSignUp);
          // ...
          navigate('/'); // navigate to login page
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          // ..
      });
  };

  return (
    <>
    <div className="regContainer">

    <div className="leftContainer">
        <div className="centered-element">
            <img src={peopleWorking} width="500" height="500"></img>
            <h3>Scheduling Assisstant - </h3>
            <h3>Simplify Your Life</h3>
            <h8>All your tasks and preferences in one place</h8>
        </div>
    </div>

    <div className="rightContainer">
        <div className="centered-element">
            <div className="row justify-content-center align-items-center">
                <form
                className="border rounded"
                onSubmit={handleSubmit(onSubmit)}
                id="signupform"
                >
                <h2 id="signUp">Sign Up</h2>
                <br />
                <div className="mb-3">
                    <label htmlFor="fname" className="form-label">
                    First Name
                    </label>
                    <input
                    type="text"
                    name="fname"
                    value={fname}
                    autoComplete="off"
                    style={{ textAlign: 'center' }}
                    {...register("fname")}
                    className={`form-control ${errors.fname ? "is-invalid" : ""}`}
                    id="fname"
                    onChange={(e) => setFname(e.target.value)}
                    />
                    <div className="invalid-feedback">{errors.fname?.message}</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="lname" className="form-label">
                    Last Name
                    </label>
                    <input
                    type="text"
                    name="lname"
                    value={lname}
                    autocomplete="off"
                    style={{ textAlign: 'center' }}
                    {...register("lname")}
                    className={`form-control ${errors.lname ? "is-invalid" : ""}`}
                    id="lname"
                    onChange={(e) => setLname(e.target.value)}
                    />
                    <div className="invalid-feedback">{errors.lname?.message}</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                    Email address
                    </label>
                    <input
                    type="email"
                    name="email"
                    value={email}
                    autocomplete="off"
                    style={{ textAlign: 'center' }}
                    {...register("email")}
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                    {/* <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                    </div> */}
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                    Password
                    </label>
                    <input
                    type="password"
                    name="password"
                    value={password}
                    autocomplete="off"
                    style={{ textAlign: 'center' }}
                    {...register("password")}
                    className={`form-control ${
                        errors.password ? "is-invalid" : ""
                    }`}
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="invalid-feedback">
                    {errors.password?.message}
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="password2" className="form-label">
                    Confirm Password
                    </label>
                    <input
                    type="password"
                    name="password2"
                    autocomplete="off"
                    style={{ textAlign: 'center' }}
                    {...register("password2")}
                    className={`form-control ${
                        errors.password2 ? "is-invalid" : ""
                    }`}
                    id="password2"
                    />
                    <div className="invalid-feedback">
                    {errors.password2?.message}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary mr-1 regButton">
                    Sign Up
                </button>
                <button
                    type="button"
                    onClick={() => reset()}
                    className="btn btn-secondary regButton"
                >
                    Reset
                </button>
                <div>
                    Have an account already?
                    <Link to="/" style={{ textDecoration: 'none' }}><p style={{ textDecorationLine: "none" }}>Login</p></Link>
                </div>
                </form>
            </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default RegistrationPage;