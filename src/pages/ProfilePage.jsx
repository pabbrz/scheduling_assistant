import '../stylesheets/ProfilePage.css';
import React, { useState } from 'react';

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
        e.preventDefault();
    };

    return (
        <div>
            <div id="profilePageContainer">
                <div id="profilePageHeader">
                    <h1>Profile Page</h1>
                </div>
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
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;