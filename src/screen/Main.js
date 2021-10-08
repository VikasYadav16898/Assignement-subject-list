import React, { useEffect, useState } from "react";
import Subject from "../component/Subject";
import { getData, writeData, database } from "../database/firebase";
import { getDatabase, ref, set, onValue, get } from "firebase/database";

const Main = () => {
  //States
  const [subjectList, setSubjectList] = useState([]);
  const [subject, setSubject] = useState("");

  //Data Retrieval
  useEffect(async () => {
    await onValue(ref(database, "/subjects"), (snapshot) => {
      if (snapshot.exists()) {
        setSubjectList(snapshot.val().split(","));
      } else {
        console.log("No data available");
      }
    });
  }, []);

  //Listeners
  const clickListener = (e) => {
    const tempList = subjectList;
    tempList.push(subject);
    writeData("/subjects", tempList.toString());
    console.log(tempList);
  };

  const changeListener = (e) => {
    setSubject(e.target.value);
  };
  return (
    <>
      {subjectList.map((data, index) => {
        return <Subject key={index} subjectName={data} />;
      })}

      <input
        onChange={changeListener}
        type="text"
        name=""
        id=""
        value={subject}
      />
      <button onClick={clickListener}>Add</button>
    </>
  );
};

export default Main;
