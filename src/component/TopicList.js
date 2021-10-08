import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { writeData, database } from "../database/firebase";
import { getDatabase, ref, set, onValue, get } from "firebase/database";

const TopicList = ({ subjectName }) => {
  //States
  const [topicList, setTopicList] = useState([]);
  const [topic, setTopic] = useState("");

  //dataFetching
  useEffect(async () => {
    await onValue(ref(database, `/${subjectName}`), (snapshot) => {
      if (snapshot.exists()) {
        setTopicList(snapshot.val().split(","));
        console.log();
      } else {
        console.log("No data available");
      }
    });
  }, []);

  //listeners
  const clickListener = (e) => {
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
          <li key={index}>
            {item} <button onClick={clickListener}>ed</button>
            <button>X</button>
          </li>
        );
      })}

      <li>
        <input
          onChange={changeListener}
          type="text"
          name=""
          id=""
          value={topic}
        />
        <button onClick={clickListener}>Add</button>
      </li>
    </StyledContainer>
  );
};

export default TopicList;

const StyledContainer = styled.ul`
  list-style: none;
  background-color: aqua;
  max-width: 10rem;
  li {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
