import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, remove } from "firebase/database";
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: "assignment-b6559",
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGE_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
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
