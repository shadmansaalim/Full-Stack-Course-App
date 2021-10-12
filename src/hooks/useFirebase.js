import initializeAuthentication from "../Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, onAuthStateChanged, signOut, fetchSignInMethodsForEmail, EmailAuthProvider, getUser } from "firebase/auth";
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
    console.log(user);



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
        // fetchSignInMethodsForEmail(auth, 'shadmansaalim999@gmail.com')
        //     .then((signInMethods) => {
        //         // This returns the same array as fetchProvidersForEmail but for email
        //         // provider identified by 'password' string, signInMethods would contain 2
        //         // different strings:
        //         // 'emailLink' if the user previously signed in with an email/link
        //         // 'password' if the user has a password.
        //         // A user could have both.

        //         if ((signInMethods.indexOf(EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD) === -1) && (signInMethods.indexOf(FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD) === -1)) {
        //             // User can sign in with email/password.
        //             console.log('a');

        //         }

        //         else {
        //             setError('Account already exists with email')
        //         }


        //     })
        //     .catch((error) => {
        //         // Some error occurred, you can inspect the code: error.code
        //     });

        signInWithPopup(auth, googleProvider)
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                setError(error.message)
            })

    }

    const handleFacebookSignUp = () => {
        signInWithPopup(auth, facebookProvider)
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                setError(error.message)
            })
    }


    const handleLogin = () => {
        return signInWithEmailAndPassword(auth, loginEmail, loginPassword);
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