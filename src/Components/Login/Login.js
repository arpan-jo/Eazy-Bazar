import React, { useContext } from 'react';
import firebase from 'firebase/app';
import firebaseConfig from '../../firebaseConfig';
import 'firebase/auth';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
}
const Login = () => {
   const [loggedInUser, setLoggedInUser] = useContext(UserContext);

   const history = useHistory();
   const location = useLocation();
   const { from } = location.state || { from: { pathname: '/' } };

   const googleProvider = new firebase.auth.GoogleAuthProvider();
   const handleGoogleSignIn = () => {
      firebase
         .auth()
         .signInWithPopup(googleProvider)
         .then(result => {
            const user = result.user;
            setLoggedInUser(user);
            history.replace(from);
         })
         .catch(error => {
            const errorMessage = error.message;
            console.log(errorMessage);
         });
   };

   // console.log(loggedInUser);
   return (
      <div>
         <h1>Sign in with google</h1>
         <h3>Name: </h3>
         {!loggedInUser ? (
            <button onClick={handleGoogleSignIn}>sign in</button>
         ) : (
            <button>Sign Out</button>
         )}
      </div>
   );
};

export default Login;
