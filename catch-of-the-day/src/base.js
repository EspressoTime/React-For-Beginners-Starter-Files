import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCF3G4Q2yGZWY-xwDvmHbcWI_Cfl8FNK1o",
    authDomain: "catch-of-the-day-f4886.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-f4886-default-rtdb.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// named export
export { firebaseApp };

// default export
export default base;