import React from 'react';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from '../Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  collection,
  getFirestore,
  addDoc,
  setDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
import { useState, useEffect, useRef } from 'react';
import { db } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // 追加

import './css/GoogleButton.css';

const GoogleButton = () => {
  const [user, loading] = useAuthState(auth);

  const [isUser, setIsUser] = useState(false)

  const googleProvider = new GoogleAuthProvider();

  const userDataRef = useRef({});

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const { photoURL, displayName, email } = auth.currentUser;
      userDataRef.current = { ...userDataRef.current, photoURL, displayName, email };
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const docRef = doc(db, 'UserData', userDataRef.current.email, 'Data', 'profileData');
        const docSnap = await getDoc(docRef);
        const saveShot = docSnap.data();
        if (saveShot) {
          console.log(saveShot);
          setIsUser(true)
          
        } else {
          console.log("No Data")
          setIsUser(false)
        }
      }
    };

    fetchData();
  }, [user]);

  const signInwithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
    if(isUser){
      navigate('/')
    }else{
      navigate('/NewProfilePage')
    }
    
  };

  return (
    <div className="GoogleButton">
      <button onClick={()=>signInwithGoogle()}>
        <div className="icon">
          <img src="/Google-icon.png" alt="Google icon" />
        </div>
        <div className="text">
          <div>Google</div>
        </div>
      </button>
    </div>
  );
};

export default GoogleButton;
