import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, get, remove } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyAO-Tgd0joaE6ftxwsC3rewIDKPLs5C3Mw",
  authDomain: "assignment-b6559.firebaseapp.com",
  projectId: "assignment-b6559",
  storageBucket: "assignment-b6559.appspot.com",
  messagingSenderId: "19502637855",
  appId: "1:19502637855:web:22556799e97b236747c62a",
  measurementId: "G-KRFXF0W8G4",
};

// Initialize Firebase
const fireDb = initializeApp(firebaseConfig);
export const database = getDatabase(fireDb);

export const writeData = async (path, payLoad) => {
  await set(ref(database, path), payLoad).then(() => {
    console.log("Succcess from server.");
  });
};

export const getData = async (path) => {
  await get(ref(database, path)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  });
};

export const deleteData = async (path) => {
  await remove(ref(database, path));
};
