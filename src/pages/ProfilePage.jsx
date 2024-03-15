import '../stylesheets/ProfilePage.css';
import React, { useState } from 'react';
import peopleWorking from "../assets/peopleWorking.png";
import avatar from "../assets/Nola.jpg";
import { Link } from "react-router-dom";

const ProfilePage = () => {
    const [fname, setFname] = useState('Joshua');
    const [lname, setLname] = useState('Sterken');
    const [email, setEmail] = useState('joshuasterken@my.unt.edu');
    const [password, setPassword] = useState('thisismypassword');

    const handleFnameChange = (e) => {
        setFname(e.target.value);
    };

    const handleLnameChange = (e) => {
        setLname(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();                             // TODO: Add functionality to update user info in database
    };

    return (
        <div>
            <div id="profilePageContainer">
               
               <div className="leftContainer">
                    
                    <div id="profilePageHeader">
                        <h1>Profile</h1>
                    </div>


                    <div className="centered-element-profilePG">
                        <img src={avatar} className="rounded-circle" id="avatar" alt="Avatar" />
                        <form onSubmit={handleSubmit}>
                            <label>
                                {/* First Name: */}
                                <input type="text" value={fname} className="form-control profileInput" onChange={handleFnameChange} />
                            </label>
                            <br />
                            <label>
                                {/* Last Name: */}
                                <input type="text" value={lname} className="form-control profileInput" onChange={handleLnameChange} />
                            </label>
                            <br />
                            <label>
                                {/* Email: */}
                                <input type="email" value={email} className="form-control profileInput" onChange={handleEmailChange} />
                            </label>
                            <br />
                            <label>
                                {/* Password: */}
                                <input type="password" value={password} className="form-control profileInput" onChange={handlePasswordChange} />
                            </label>
                            <br />
                            <button type="submit" className="btn btn-light" id="update">Update</button>
                            
                            <div>
                                <Link to="/overview">
                                <button id="backButton" className="btn btn-lg text-center">
                                    <span><i id="backButtonArrow"className="bi bi-arrow-left-circle-fill"></i></span>
                                </button>
                                </Link>
                            </div>

                        </form>
                    </div>
               </div>

                <div className="rightContainer">
                    <div className="centered-element">
                    <img src={peopleWorking} width="500" height="500"></img>
                    <h3>Scheduling Assisstant - </h3>
                    <h3>Simplify Your Life</h3>
                    <h8>All your tasks and preferences in one place</h8>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;