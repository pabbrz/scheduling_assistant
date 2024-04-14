import '../stylesheets/ProfilePage.css';
import React, { useState, useEffect } from 'react';
import peopleWorking from "../assets/peopleWorking.png";
import avatar from "../assets/Nola.jpg";
import { Link } from "react-router-dom";
import { useUserData, updateUserData } from '../firebaseServices';
import { useAuth } from '../AuthContext';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

    // load user data
    useEffect(() => {
        if (userData) {
            setFname(userData.fname || '');
            setLname(userData.lname || '');
            setEmail(userData.email || '');
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
    const [image, setImage] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(avatar); // Initial default avatar

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const uploadImage = async () => {
        if (image && currentUser) {
            const storage = getStorage();
            const storageRef = ref(storage, `avatars/${currentUser.uid}`);
            try {
                const snapshot = await uploadBytes(storageRef, image);
                const downloadUrl = await getDownloadURL(snapshot.ref);
                setAvatarUrl(downloadUrl);
                await updateUserData(currentUser.uid, { avatarUrl: downloadUrl });
                console.log("Image uploaded and user profile updated.");
            } catch (error) {
                console.error("Failed to upload image: ", error);
            }
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
                        <button onClick={uploadImage}>
                            <img src={avatarUrl} className="rounded-circle" id="avatar" alt="Avatar" />
                        </button>
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