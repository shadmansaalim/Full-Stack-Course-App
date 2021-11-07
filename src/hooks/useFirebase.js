import initializeAuthentication from "../Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, signInWithEmailAndPassword, onAuthStateChanged, signOut, TwitterAuthProvider, getIdToken } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import swal from 'sweetalert';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


initializeAuthentication();
toast.configure()

const useFirebase = () => {
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    const twitterProvider = new TwitterAuthProvider();

    const auth = getAuth();


    const registerUser = (name, email, password, history) => {
        console.log(email, password);
        setIsLoading(false);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                const newUser = { email, displayName: name };
                setUser(newUser);

                //Add user to database


                // Send name to firebase
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                    history.replace('/');
                    swal("Account Created Successfully!", "You can now purchase courses and enjoy our services", "success");
                }).catch((error) => {

                });

            })
            .catch((error) => {
                console.log(error);
                // ..
            })
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getIdToken(user)
                    .then(courseIdToken => {
                        localStorage.setItem('courseIdToken', courseIdToken)
                        setUser(user);
                    })


            } else {
                setUser({})
            }
            setIsLoading(false);
        });
    }, [])






    const signInWithGoogle = (location, history) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                //Add user to db
                // saveUser(user.email, user.displayName, 'PUT');
                const destination = location?.state?.from || '/';
                history.replace(destination);

            }).catch((error) => {

            })
            .finally(() => setIsLoading(false));
    }
    const signInWithFacebook = (location, history) => {
        setIsLoading(true);
        signInWithPopup(auth, facebookProvider)
            .then((result) => {
                const user = result.user;
                //Add user to db
                // saveUser(user.email, user.displayName, 'PUT');
                const destination = location?.state?.from || '/';
                history.replace(destination);

            }).catch((error) => {

            })
            .finally(() => setIsLoading(false));
    }
    const signInWithTwitter = (location, history) => {
        setIsLoading(true);
        signInWithPopup(auth, twitterProvider)
            .then((result) => {
                const user = result.user;
                //Add user to db
                // saveUser(user.email, user.displayName, 'PUT');
                const destination = location?.state?.from || '/';
                history.replace(destination);

            }).catch((error) => {

            })
            .finally(() => setIsLoading(false));
    }



    const loginUser = (email, password, location, history) => {
        setIsLoading(false);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                //Using location to redirect the user to his/her desired destination if the user was redirected to login page by the system. Doing this to improve the UX of the user.
                const destination = location?.state?.from || '/';
                history.replace(destination);
                toast.success(`Welcome back ${auth.currentUser.displayName.split(' ')[0]}`)

            })
            .catch((error) => {
                if (error.message === "Firebase: Error (auth/wrong-password).") {
                    swal("Invalid Password!", "Please check your email & password and then try again", "error");
                }
                else if (error.message === "Firebase: Error (auth/user-not-found).") {
                    swal("User Not Found!", "Please check your email & password and then try again", "warning");
                }
            })
            .finally(() => setIsLoading(false));
    }
    const logOut = () => {
        setIsLoading(false);
        signOut(auth).then(() => {
            // Sign-out successful.
            setUser({});
        }).catch((error) => {
            // An error happened.
        })
            .finally(() => setIsLoading(false));
    }




    return {
        user,
        isLoading,
        registerUser,
        loginUser,
        signInWithGoogle,
        signInWithFacebook,
        signInWithTwitter,
        logOut,
    }

}


export default useFirebase;