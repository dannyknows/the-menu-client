import React from "react";
import styled from "styled-components";
// const StyledNav = styled.nav`
//   display: flex;
//   justify-content: center;
//   background-color: ${(props) => props.style.backgroundColour};
//   h1 {
//     /* color: ${(props) => props.style.headerColour}; */
//   }
// `;
// const Button = styled.button`
//   align-self: flex-end;
// `

const Nav = (props) => {
  console.log(props.style[0].style_data)
  const styles = JSON.parse(props.style[0].style_data)
  console.log(styles);
  console.log("nav")
  // return (
    // <StyledNav style={props.style} theme={props.theme}>
    //   <h1>{props.name}</h1>
    //   <Button>---</Button>
    // </StyledNav>
  // );
};

export default Nav;
