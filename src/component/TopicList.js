import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { writeData, database } from "../database/firebase";
import { getDatabase, ref, set, onValue, get, update } from "firebase/database";
import TopicListInput from "./TopicListInput";
const TopicList = ({ subjectName }) => {
  //States
  const [topicList, setTopicList] = useState([]);
  const [topic, setTopic] = useState("");

  //dataFetching
  useEffect(async () => {
    await onValue(ref(database, `/${subjectName}`), (snapshot) => {
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
  }, []);

  //deleting Functionality
  const deleteButtonListener = (event) => {
    console.log(event.target.value);

    const newList = topicList.filter((item) => item !== event.target.value);
    setTopicList(newList);
    writeData(`/${subjectName}`, newList.toString()).then(() =>
      console.log("SUCCESS")
    );
  };

  //edit functionality
  const editButtonListener = (event) => {
    topicList.map((topic, index) => {
      if (topic == event.target.value) {
        const newList = topicList;
        topicList[index] = topic;
        setTopicList(newList);
        writeData(`/${subjectName}`, topicList.toString()).then(() => {
          console.log("SUCCESS");
          event.target.value = "";
          setTopic("");
        });
      }
    });
  };

  //listeners
  const clickListener = (e) => {
    if (topic == "") {
      alert("Kindly add topic.");
      return "";
    }

    const tempList = topicList;
    tempList.push(topic);
    writeData(`/${subjectName}`, tempList.toString()).then(() => {
      setTopic("");
    });
    console.log(tempList);
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
          name=""
          id=""
          value={topic}
          placeholder="Type new Topic."
        />
        <button onClick={clickListener}>Add</button>
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
