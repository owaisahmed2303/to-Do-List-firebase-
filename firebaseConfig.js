// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/13.3.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/13.3.0/firebase-analytics.js";
  import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc} from "https://www.gstatic.com/firebasejs/13.3.0/firebase-firestore.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCeJKnX3MHT2oCJt2qhN3T5yIgtzCIWbZk",
    authDomain: "todolist-dedac.firebaseapp.com",
    projectId: "todolist-dedac",
    storageBucket: "todolist-dedac.firebasestorage.app",
    messagingSenderId: "975973036845",
    appId: "1:975973036845:web:c1bc85e3ff29b11e6699a4",
    measurementId: "G-VEQ2WZ88PD"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
 const db = getFirestore(app);

 export{db, collection, addDoc, getDocs, deleteDoc, doc}