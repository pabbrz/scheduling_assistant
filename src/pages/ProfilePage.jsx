import '../stylesheets/ProfilePage.css';
import React, { useState, useEffect } from 'react';
import peopleWorking from "../assets/peopleWorking.png";
import avatar from "../assets/peopleWorking.png";
import { Link } from "react-router-dom";
import { useUserData, updateUserData } from '../firebaseServices';
import { useAuth } from '../AuthContext';
import { getAuth, updatePassword } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';


const ProfilePage = () => {
    const { currentUser } = useAuth();
    const userID = currentUser.uid;
    const [userData, error] = useUserData(userID);

    useEffect(() => {
        if (userData) {
            console.log('User fname:', userData.fname);
        } else if (error) {
            console.log('Error fetching user data:', error);
        }
    }, [userData, error]);
    
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(avatar); // Initial default avatar

    // load user data
    useEffect(() => {
        if (userData) {
            setFname(userData.fname || '');
            setLname(userData.lname || '');
            setEmail(userData.email || '');
            setAvatarUrl(userData.avatarUrl || avatar);
        }
    }, [userData]);

    console.log('profile page userData:', userData);

    const handleFnameChange = (e) => {setFname(e.target.value);};
    const handleLnameChange = (e) => {setLname(e.target.value);};
    const handleEmailChange = (e) => {setEmail(e.target.value);};
    const handlePasswordChange = (e) => {setPassword(e.target.value);};
    
    // this is to update db with changes
    // const handleSubmit = (e) => {e.preventDefault();};
    const handleSubmit = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        const user = auth.currentUser;

        if (user && password.trim()) {  //if new password and not just white space
            updatePassword(user, password.trim()).then(() => {
                console.log("Password updated successfully.");
                setPassword('');
            }).catch((error) => {
                console.error("Error updating password: ", error);
            });
        }

        if (user) {
            await updateUserData(user.uid, {
                fname: fname,
                lname: lname,
                email: email,
                // TODO password
            });
        }
    };

    // code for uploading avatar
    const uploadImage = async (file, userID) => {
        const storage = getStorage();
        const storageRef = ref(storage, `avatars/${userID}`);
        try {
            const snapshot = await uploadBytes(storageRef, file);
            const url = await getDownloadURL(snapshot.ref);
            setAvatarUrl(url);
            // update user's document with new avatar URL
            const userDocRef = doc(db, 'users', userID);
            await updateDoc(userDocRef, { avatarUrl: url });
        } catch (error) {
            console.error("Error uploading image: ", error);
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            await uploadImage(file, currentUser.uid);
        }
    };


    return (
        <div>
            <div id="profilePageContainer">
               
               <div className="leftContainer">
                    
                    <div id="profilePageHeader">
                        <h1>Profile</h1>
                    </div>


                    <div className="centered-element-profilePG">
                        <label htmlFor="imageUpload">
                            <img src={avatarUrl} className="rounded-circle" id="avatar" alt="Avatar" style={{ cursor: 'pointer' }} />
                        </label>
                        <input type="file" id="imageUpload" style={{ display: 'none' }} onChange={handleImageChange} />
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
                                <input id="p" type="password" value={password} className="form-control profileInput" onChange={handlePasswordChange} placeholder='Enter new password'/>
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