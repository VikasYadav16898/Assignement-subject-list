import React from "react";
import styled from "styled-components";

const Nav = () => {
  return (
    <StyledContainer>
      <h2>Assignment with 💖 by Vikas.</h2>
    </StyledContainer>
  );
};

export default Nav;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e98f8f;
  height: 10vh;
  h2 {
    color: #fff;
    text-shadow: 1px 1px black;
  }
`;
