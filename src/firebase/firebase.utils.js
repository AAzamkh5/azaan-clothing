import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config ={
    apiKey: "AIzaSyDR9NAsk4-lD_qW2nH87IVD5qgoL_0q8Ak",
    authDomain: "azaan-db.firebaseapp.com",
    databaseURL: "https://azaan-db.firebaseio.com",
    projectId: "azaan-db",
    storageBucket: "azaan-db.appspot.com",
    messagingSenderId: "588707928421",
    appId: "1:588707928421:web:85aa66013b40c9d4a0e98c",
    
    
};
    export const createUserProfileDocument = async (userAuth , additionalData) => {
  if (!userAuth) return;

   
   const userRef = firestore.doc(`users/${userAuth.uid}`) ;
   const snapShot = await userRef.get();
   

 
  
  if (!snapShot.exists){
      const{ displayName, email } = userAuth;
      const createdAt = new Date();

    try {
     await userRef.set({
         displayName,
         email,
         createdAt,
         ...additionalData
     })
    } catch (error){
    console.log('error creating user', error.message);
    }
  }
  return userRef;
  }

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters ({ prompt : 'select_account' });

export const signInWithGoogle = ()=> auth.signInWithPopup(provider);

export default firebase;