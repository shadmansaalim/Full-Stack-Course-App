import initializeAuthentication from "../Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, onAuthStateChanged, signOut, TwitterAuthProvider, getIdToken } from "firebase/auth";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

initializeAuthentication();

const useFirebase = () => {
    const auth = getAuth();
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    const twitterProvider = new TwitterAuthProvider();
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
        return createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword);
    }

    useEffect(() => {

        onAuthStateChanged(auth, user => {
            if (user) {
                getIdToken(user)
                    .then(courseIdToken => localStorage.setItem('courseIdToken', courseIdToken))
                setUser(user);
            }
            else {
                setUser({});
            }
            setIsLoading(false);
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
            .then(() => {
            })
            .catch(error => {

            })
            .finally(() => setIsLoading(false));
    }

    const handleGoogleSignUp = () => {
        setIsLoading(true);

        signInWithPopup(auth, googleProvider)
            .then(result => {
            })
            .catch(error => {

            })
            .finally(() => setIsLoading(false));

    }

    const handleFacebookSignUp = () => {
        setIsLoading(true);
        signInWithPopup(auth, facebookProvider)
            .then(result => {

            })
            .catch(error => {

            })
            .finally(() => setIsLoading(false));
    }

    const handleTwitterSignUp = () => {
        setIsLoading(true);
        signInWithPopup(auth, twitterProvider)
            .then((result) => {

            })
            .catch(error => {

            })
            .finally(() => setIsLoading(false));
    }


    const handleLogin = () => {
        return signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    }

    const logOut = () => {
        signOut(auth)
            .then(() => {
                setUser({});
            })
            .finally(() => setIsLoading(false));
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
            })
    }


    return {
        user,
        setUser,
        handleNameChange,
        handleSignUpEmailChange,
        handleImageChange,
        handleSignUpPasswordChange,
        handleSignUp,
        handleGoogleSignUp,
        handleFacebookSignUp,
        handleLogin,
        logOut,
        handleLoginEmailChange,
        loginEmail,
        handleLoginPasswordChange,
        handleForgetPassword,
        verifyEmail,
        setUserDetails,
        handleTwitterSignUp,
        setIsLoading,
        isLoading,
        setName,
        setSignUpEmail
    }

}


export default useFirebase;