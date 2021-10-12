import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { writeData, database } from "../database/firebase";
import { ref, onValue } from "firebase/database";
import TopicListInput from "./TopicListInput";
const TopicList = ({ subjectName }) => {
  //States
  const [topicList, setTopicList] = useState([]);
  const [topic, setTopic] = useState("");

  //dataFetching
  useEffect(() => {
    onValue(ref(database, `/${subjectName}`), (snapshot) => {
      if (snapshot.exists()) {
        if (snapshot.val().split(",")[0] == "") {
          setTopicList([]);
        } else {
          setTopicList(snapshot.val().split(","));
        }
      } else {
        console.log("No data available");
      }
    });
  }, [subjectName]);

  //listeners
  const addTopicListener = (e) => {
    if (topic === "") {
      alert("Kindly add topic.");
      return "";
    }

    const tempList = topicList;
    tempList.push(topic);
    writeData(`/${subjectName}`, tempList.toString()).then(() => {
      setTopic("");
    });
  };

  const changeListener = (e) => {
    setTopic(e.target.value);
  };
  return (
    <StyledContainer>
      {topicList.map((item, index) => {
        return (
          <TopicListInput
            key={index}
            setTopicList={setTopicList}
            topicList={topicList}
            topicIndex={index}
            subjectName={subjectName}
            topic={item}
          />
        );
      })}

      <StyledAddTopicContainer>
        <input
          onChange={changeListener}
          type="text"
          value={topic}
          placeholder="Type new Topic."
        />
        <button onClick={addTopicListener}>Add</button>
      </StyledAddTopicContainer>
    </StyledContainer>
  );
};

export default TopicList;

const StyledContainer = styled.div`
  padding: 1rem;
  background-color: #fff;
`;

const StyledAddTopicContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    border: 1px solid #f38888;
  }
  button {
    background-color: #e98f8f;
    border: none;
    color: white;
    text-shadow: 1px 1px black;
  }
`;
