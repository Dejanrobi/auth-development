import React, { useContext, useEffect, useState } from 'react'

// importing the modules to  from firebase auth
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateEmail, updatePassword } from 'firebase/auth'

// importing auth from firebase
import { auth } from '../firebase'

const AuthContext = React.createContext()

// A function to use the context
export function useAuth(){
    return useContext(AuthContext)
}

// taking in children inside our provider
export  function AuthProvider({children}) {
    // creating a current User state.
    const [currentUser, setCurrentUser]  = useState()
    // setting the loading state
    const [authLoading, setAuthLoading] = useState(true);

    // creating a signup function that takes in an email and password parameters
    // signing up the user using the auth module
    function signup(email, password){
        // creating the user with an email and password. (then pass in the email and the password)
        // this will return a promise where we will display an error if there is a failure or redirect the user to the dashboard page when there is a success
        const userResponse = createUserWithEmailAndPassword(auth, email, password);
        return userResponse;
    }

    // creating a login function
    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Logout function
    function logout(){
        return signOut(auth)
    }

    // Reset password function
    // the function takes in an email that we want to reset the password for
    function resetPassword(email){
        return sendPasswordResetEmail(auth, email)
    }

    // Update email function
    function updateEmailFunc(email){
        return updateEmail(auth.currentUser, email)

    }

    // update password function
    function updatePasswordFunc(password){
        return updatePassword(auth.currentUser, password)

    }

    // checking whether we have a current user
    useEffect(()=>{
        // using the onAuthStateChanged to check whether we have a current user.
        // after the user is checked, we need to unsubscribe the current onAuthStateChanged event.

        // this event returns a response of the current user hence we set the current user
        const unsubscribe = onAuthStateChanged(auth, (user)=>{
            setCurrentUser(user)
            // setting the loading state to false
            setAuthLoading(false);
            console.log(user)
        })

        // unsubscribing the event
        return ()=>{
            unsubscribe();
        }


    },[])

    // the useEffect will only run once
    
    // passing the states, the functions et.c. that we want to use throughout the website
    const value = {
        currentUser,
        signup,
        authLoading,
        login,
        logout,
        resetPassword,
        updateEmailFunc,
        updatePasswordFunc
    }

    
  return (
    // using the context inside our provider.
    
    <AuthContext.Provider value={value}>
        {/* rendering the children inside the auth context */}
        {children}
    </AuthContext.Provider>
  )
}
