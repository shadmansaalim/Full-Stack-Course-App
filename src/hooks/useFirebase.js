import initializeAuthentication from "../Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

initializeAuthentication();

const useFirebase = () => {
    const auth = getAuth();
    const [user, setUser] = useState({})
    const [name, setName] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [error, setError] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    const history = useHistory();



    const handleNameChange = e => {
        setName(e.target.value);
    }

    const handleSignUpEmailChange = e => {
        setSignUpEmail(e.target.value);
    }

    const handlePhoneChange = e => {
        setPhone(e.target.value);
    }

    const handleImageChange = e => {
    }

    const handleSignUpPasswordChange = e => {
        setSignUpPassword(e.target.value);
    }


    const handleSignUp = () => {

        // if (!/(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}/.test(password)) {
        //     setError(<ul>
        //         <h4>Invalid Password! Please check whether your password contains the following characters</h4>
        //         <li>8 characters length</li>
        //         <li>2 letters in Upper Case</li>
        //         <li>1 Special Character (!@#$&*)</li>
        //         <li>2 numerals (0-9)</li>
        //         <li>3 letters in Lower Case</li>
        //     </ul>)
        //     return;
        // }

        return createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword);
    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                console.log('Inside State Change', user)
                setUser(user);
            }
        })
    }, []);

    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {

            })
            .catch(error => {

            })
    }

    const setUserDetails = () => {
        updateProfile(auth.currentUser, { displayName: name, email: signUpEmail })
            .then(result => {

            })
            .catch(error => {
                setError(error.message);
            })
    }

    const handleGoogleSignUp = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    const handleFacebookSignUp = () => {
        signInWithPopup(auth, facebookProvider)
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                console.log(error.message)
            })
    }


    const handleLogin = e => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            .then(result => {
                console.log('LOGIN', result.user);
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    const logOut = () => {
        signOut(auth)
            .then(() => {
                setUser({});
            })
    }

    const handleLoginEmailChange = e => {
        setLoginEmail(e.target.value);
    }
    const handleLoginPasswordChange = e => {
        setLoginPassword(e.target.value);
    }

    const handleForgetPassword = () => {
        sendPasswordResetEmail(auth, loginEmail)
            .then(() => {

            })
            .catch(error => {
                console.log(error.message)
            })
    }




    return {
        user,
        setUser,
        setError,
        error,
        handleNameChange,
        handleSignUpEmailChange,
        handlePhoneChange,
        handleImageChange,
        handleSignUpPasswordChange,
        handleSignUp,
        handleGoogleSignUp,
        handleFacebookSignUp,
        handleLogin,
        logOut,
        handleLoginEmailChange,
        handleLoginPasswordChange,
        handleForgetPassword,
        verifyEmail,
        setUserDetails
    }

}


export default useFirebase;