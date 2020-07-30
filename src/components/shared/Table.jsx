import styled from 'styled-components'

const Table = styled.div`
  width:50%;
  background: #AFBA6A;
  border: solid 1px black;
  border-radius: 20px;
  color: white;
  box-shadow: 0px 0px 20px #888888;
  font-family: Arial, Helvetica, sans-serif;

  ul{
    border-radius: 20px;
    padding: 0;
    margin: 0;
    display:flex;
    color: green;
    list-style-type: none;
    justify-content: center;
    li{
      padding: 5px;
      border: solid 1px black;
      width: 130px;
      input, select, button{
        width: 80px;
      }
    }
  }
  `

export default Table;