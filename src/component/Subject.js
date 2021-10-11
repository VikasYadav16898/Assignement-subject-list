import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import { subjectListAnimation } from "../animation";

import TopicList from "./TopicList";
import { writeData, deleteData, database } from "../database/firebase";
import { ref, get, remove } from "firebase/database";

const Subject = ({ subjectName, subjectList, setSubjectList }) => {
  const [editedSubject, setEditedSubject] = useState(subjectName);
  const [topicList, setTopicList] = useState([]);

  //Listeners

  const editButtonListener = (e) => {
    if (editedSubject == "") {
      alert("Kindly add subject name.");
    } else {
      subjectList.map(async (item, index) => {
        if (item == subjectName) {
          var newName = "";
          const newList = subjectList;
          newList[index] = editedSubject;
          // setSubjectList(newList);

          await get(ref(database, `/${subjectName}`)).then((snapshot) => {
            if (snapshot.exists()) {
              // setTopicList(snapshot.val().split(","));
              console.log(subjectName, "Subject Name");
              newName = snapshot.val().split(",");
              console.log(newList, "snapshot hai");
            } else {
              console.log("No data available");
            }
          });

          writeData(`/${editedSubject}`, newName.toString()).then(() => {
            console.log("SUCCESS");
          });

          writeData(`/subjects`, subjectList.toString())
            .then(() => {
              console.log("SUCCESS");
            })
            .then(() => {
              deleteData(`/${subjectName}`);
              setSubjectList(newList);
            });
        }
      });
    }
  };

  const deleteButtonListener = (e) => {
    console.log(e.target.value);

    const newList = subjectList.filter((item) => item !== subjectName);
    setSubjectList(newList);
    writeData(`/subjects`, newList.toString()).then(() =>
      console.log("SUCCESS")
    );
    remove(ref(database, `/${subjectName}`));
  };

  const changeListener = (e) => {
    setEditedSubject(e.target.value);
    console.log(e.target.value);
  };

  return (
    <AnimatePresence>
      <StyledContainer
        key={subjectName}
        variants={subjectListAnimation}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        <StyledDiv>
          <input
            onChange={changeListener}
            value={editedSubject}
            type="text"
            placeholder="Type new subject name."
          />
          <button onClick={editButtonListener}>ed</button>
          <button onClick={deleteButtonListener}>X</button>
        </StyledDiv>

        <TopicList subjectName={subjectName} />
      </StyledContainer>
    </AnimatePresence>
  );
};

const StyledContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0.5rem;
`;

const StyledDiv = styled.div`
  padding: 1rem;
  border-radius: 10px 10px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e98f8f;
  input,
  button {
    border: none;
  }
`;
export default Subject;
