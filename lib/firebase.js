// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc } = require("firebase/firestore");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnH0Bkph6IHVw7bU0tT_JIhZ6dHUaBN-E",
  authDomain: "vercel-app-3bf91.firebaseapp.com",
  projectId: "vercel-app-3bf91",
  storageBucket: "vercel-app-3bf91.appspot.com",
  messagingSenderId: "89278473767",
  appId: "1:89278473767:web:890fd9c5789a1553689002",
  measurementId: "G-J72QKNWCXP"
};

// Initialize Firebase
let app;
let firestoreDb;

const initializeFirebaseApp = () => {
  try {
    app = initializeApp(firebaseConfig);
    firestoreDb = getFirestore();
    return app;
  } catch(e) {
    return {status: "bad"}
  }
};

const uploadProcessedData = async () => {
  const dataToUpload = {
    key1 : "test",
    key2 : 123,
    key3 : new Date(),
  };

  try {
    const document = doc(firestoreDb, "users", "some-testing-id");
    let dataUpdated = await setDoc(document, dataToUpload);
    return dataUpdated;
  } catch(e) {
    return {status: "bad"} 
  }
};

const getFirebaseApp = () => app;

module.exports = {
  initializeFirebaseApp,
  getFirebaseApp,
  uploadProcessedData,
};