import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAfk50yO9rARJ8FlLtzWhmRfXVzqnYIB3A",
    authDomain: "react-ecom-577b8.firebaseapp.com",
    databaseURL: "https://react-ecom-577b8.firebaseio.com",
    projectId: "react-ecom-577b8",
    storageBucket: "react-ecom-577b8.appspot.com",
    messagingSenderId: "978118747504",
    appId: "1:978118747504:web:e321c6d4cf2471a629dbb5"
  };

firebase.initializeApp(config); 

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
