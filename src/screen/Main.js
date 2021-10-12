import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Subject from "../component/Subject";
import { writeData, database } from "../database/firebase";
import { ref, onValue } from "firebase/database";
import Nav from "../component/Nav";

const Main = () => {
  //States
  const [subjectList, setSubjectList] = useState([]);
  const [subject, setSubject] = useState("");

  //Data Retrieval
  useEffect(() => {
    onValue(ref(database, "/subjects"), (snapshot) => {
      if (snapshot.exists()) {
        setSubjectList(snapshot.val().split(","));
      } else {
        console.log("No data available");
      }
    });
  }, []);

  //Listeners
  const clickListener = (e) => {
    if (subject === "") {
      return alert("Kindly enter subject name");
    } else {
      var isPresent;
      subjectList.forEach((item, index) => {
        if (item === subject) {
          isPresent = true;
        }
      });
      if (isPresent) {
        return alert("Subject already exist.");
      }
    }
    const tempList = subjectList;
    console.log(subjectList, "subjectList");
    if (tempList[0] === "") {
      tempList[0] = subject;
    } else {
      tempList.push(subject);
      setSubjectList([...subjectList, subject]);
    }

    writeData("/subjects", subjectList.toString());
    console.log(tempList, "TempList");
  };

  const changeListener = (e) => {
    setSubject(e.target.value);
  };

  return (
    <StyledMainDiv>
      <Nav />
      <StyledDiv>
        {subjectList === "" && <h1>Add Subject Please</h1>}
        {subjectList === "" ||
          subjectList.map((data, index) => {
            return (
              <Subject
                key={data}
                subjectName={data}
                subjectList={subjectList}
                setSubjectList={(value) => {
                  setSubjectList(value);
                }}
              />
            );
          })}
      </StyledDiv>

      <StyledNewSubjectContainer>
        <input
          onChange={changeListener}
          type="text"
          value={subject}
          placeholder="Type Subject"
        />
        <button onClick={clickListener}>Add Subject</button>
      </StyledNewSubjectContainer>
    </StyledMainDiv>
  );
};

export default Main;

const StyledDiv = styled.div`
  display: flex;
  position: sticky;
  height: 80vh;
  width: 100vw;
  background-color: #dfd9d9;
  justify-content: flex-start;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  overflow-y: scroll;
`;
const StyledMainDiv = styled.div`
  input,
  button {
    border-radius: 5px;
    margin: 0.2rem;
    text-align: center;
    height: 1.5rem;
    padding: 0.2rem;
    box-shadow: 2px 2px 3px #fff;
  }
`;

const StyledNewSubjectContainer = styled.div`
  height: 10vh;
  background: #e98f8f;
  display: flex;
  align-items: center;
  justify-content: center;
  input,
  button {
    border: none;
  }
`;
