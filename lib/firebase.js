const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs, query, addDoc, orderBy } = require("firebase/firestore");

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

const getTheData = async (name) => {
  try {
    const finalData = [];
    const q = query(collection(firestoreDb, name), orderBy("date", "desc"));
    const docSnap = await getDocs(q);

    docSnap.forEach((doc) => {
      finalData.push(doc.data());
    });
  
    return finalData;

  } catch(e) {
    return {status: "bad"}
  }
}

const uploadProcessedData = async (name, username, comment, date) => {
  try {
    await addDoc(collection(firestoreDb, "users"), {
      name : name,
      username : username,
      comment : comment,
      date : date
    });
    return {status: "uploaded"}
  } catch(e) {
    return {status: "bad"}
  }
};

const getFirebaseApp = () => app;

module.exports = {
  initializeFirebaseApp,
  getFirebaseApp,
  uploadProcessedData,
  getTheData,
};