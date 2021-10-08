import React, { useState } from "react";
import styled from "styled-components";
import TopicList from "./TopicList";
import { writeData } from "../database/firebase";

const Subject = ({ subjectName }) => {
  const [subject, setSubject] = useState(subjectName);

  const [subjectList, setSubjectList] = useState([]);

  const clickListener = () => {
    writeData("/english", {
      name: "Vikas",
    });
  };

  const changeListener = (e) => {
    setSubject(e.target.value);
  };

  return (
    <>
      <StyledDiv>
        <input
          onChange={changeListener}
          value={subject}
          type="text"
          name="input hai"
          id=""
        />
        <button onClick={clickListener}>ed</button>
        <button>X</button>
      </StyledDiv>

      <TopicList subjectName={subjectName} />
    </>
  );
};

const StyledDiv = styled.div`
  background-color: #f05454;
  color: white;
  max-width: 10rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  input {
    text-align: center;
  }
`;
export default Subject;
