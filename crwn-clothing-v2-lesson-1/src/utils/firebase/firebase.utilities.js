// Import the functions you need from the SDKs you need
import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJSw4tegVYrg4l-agpL73SISKOt7N0Ns4",
  authDomain: "crwn-clothing-eb356.firebaseapp.com",
  projectId: "crwn-clothing-eb356",
  storageBucket: "crwn-clothing-eb356.appspot.com",
  messagingSenderId: "1093651821072",
  appId: "1:1093651821072:web:adcc1fac81333103f5d095",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const goggleProvider = new GoogleAuthProvider();

goggleProvider.setCustomParameters({
  prompt: "select_account",
});
// export const createUserProfileDocument = async (userAuth, additionalData) => {
//   if (!userAuth) return;

//   console.log(userAuth);
// };
export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, goggleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, goggleProvider);
export const db = getFirestore();
export const addCollectionsAndDocument = async (
  collectionKey,
  objectsToAdd,
  field
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log("done");
};
// export const getCategoriesAndDocument = async () => {
//   const collectionRef = collection(db, "collections");
//   const q = query(collectionRef);

//   const querySnapshot = await getDocs(q);
//   const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
//     const { title, items } = docSnapshot.data();
//     acc[title.toLowerCase()] = items;
//     return acc;
//   }, {});
//   return categoryMap;
// };
export const getCategoriesAndDocument = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());

  // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
  //   const { title, items } = docSnapshot.data();
  //   acc[title.toLowerCase()] = items;
  //   return acc;
  // }, {});

  // return categoryMap;
};
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userSnapshot;
};
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
export const signOutUser = async () => {
  return await signOut(auth);
};
export const onAuthStateChangeListener = (callback) =>
  onAuthStateChanged(auth, callback);
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
