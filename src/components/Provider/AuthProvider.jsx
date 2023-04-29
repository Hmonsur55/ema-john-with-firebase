import React from 'react';
import { createContext } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
    signOut,
  onAuthStateChanged,
  
} from "firebase/auth";
import app from '../../firebase/firebase.config';
import { useState } from 'react';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
export const authContext = createContext(null)

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    
    
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        return signOut(auth);
    }

    const authInfo = {
        user,
        loading,
      createUser,
      signIn,
      logOut,
    };
    // user ovservation user ase ki na check korar

    useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, currentUser => {
           setUser(currentUser);
           setLoading(false)
       })
        return () => {
            return unsubscribe();
        }
    }, [])
    
    return (
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;