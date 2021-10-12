import React, { useState } from "react";
import { writeData } from "../database/firebase";
import styled from "styled-components";

const TopicListInput = ({ topic, topicList, setTopicList, subjectName }) => {
  //states
  const [editedTopic, seteditedTopic] = useState(topic);

  //listeners
  const editButtonListener = (e) => {
    if (editedTopic === "") {
      alert("Kindly add topic name");
      return "";
    }

    topicList.forEach((item, index) => {
      if (topic === item) {
        const newList = topicList;
        newList[index] = editedTopic;
        setTopicList(newList);
        writeData(`/${subjectName}`, topicList.toString()).then(() => {
          console.log("SUCCESS");
        });
      }
    });
  };

  const deleteButtonListener = (e) => {
    console.log(e.target.value);

    const newList = topicList.filter((item) => item !== e.target.value);
    setTopicList(newList);
    writeData(`/${subjectName}`, newList.toString()).then(() =>
      console.log("SUCCESS")
    );
  };

  const changeListener = (e) => {
    seteditedTopic(e.target.value);
  };

  return (
    <StyledContainer>
      <input
        onChange={changeListener}
        type="text"
        value={editedTopic}
        placeholder="Edit Topic"
      />
      <button onClick={editButtonListener} value={editedTopic}>
        ed
      </button>
      <button onClick={deleteButtonListener} value={editedTopic}>
        X
      </button>
    </StyledContainer>
  );
};

export default TopicListInput;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  margin-bottom: 1rem;
  input {
    text-align: left;
    border: none;
  }
  button {
    background-color: #e98f8f;
    color: #fff;
    text-shadow: 1px 1px #000;
    border: none;
  }
`;
