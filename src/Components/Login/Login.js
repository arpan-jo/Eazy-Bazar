import React, { useContext } from 'react';
import firebase from 'firebase/app';
import firebaseConfig from '../../firebaseConfig';
import 'firebase/auth';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

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

   const hanedleSignOut = () => {
      history.push('/login');
   };

   return (
      <div>
         {loggedInUser ? (
            <div>
               <button
                  className="btn btn-warning text-center"
                  onClick={() => hanedleSignOut()}
               >
                  Sign Out
               </button>
            </div>
         ) : (
            <div className="text-center">
               <h1>Sign in with google</h1>
               <button className="btn btn-warning" onClick={handleGoogleSignIn}>
                  <FontAwesomeIcon icon={faGoogle} />
                  {'    '}
                  Sign In
               </button>
            </div>
         )}
      </div>
   );
};

export default Login;
