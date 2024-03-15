import 'bootstrap/dist/css/bootstrap.min.css'
import '../stylesheets/LandingPage.css'
import peopleWorking from "../assets/peopleWorking.png"

import { useNavigate, Link } from 'react-router-dom';
import React, { useState } from 'react';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { auth } from '../firebaseConfig';

import Snackbar from '../components/Snackbar';

function LandingPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  let navigate = useNavigate();

  const handleLogIn = async (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            setError(null);

            navigate('/overview');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            setError('Invalid email or password');
        });
      
    };
  
    return (
      <div className="LandingPageContainer">
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
              <div className="left-align">
                <h3 id="logInText">Login</h3>
                <div>
                    {/* <h4>Email</h4> */}
                    <input id="emailInput" className="form-control placeholderColor" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <br></br>
                    {/* <h4>Password</h4> */}
                    <input id="passwordInput" className="form-control placeholderColor" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <button type="button" className="btn btn-light" id="logInButton" onClick={handleLogIn}>Log in</button>
                    <h8><a href="url">Forgot your password?</a></h8>
                    <div><h8><a href="/Registration">Sign up!</a></h8></div>
                    <Link to="/overview" style={{ textDecoration: 'none' }}><p style={{ textDecorationLine: "none", color: "#000" }}>Temporary Link to Overview Page</p></Link>
                </div>
  
                <div>
                    {error && <Snackbar message={error} />}
                    
                </div>
              </div>
            </div>
          </div>
      </div>
    );
}

export default LandingPage;