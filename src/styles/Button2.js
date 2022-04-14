import styled from "styled-components";

export const Button = styled.button`
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 1px solid #e5e5e5;
  padding: 0 16px 0 16px;
  margin: 0.1em;
  font-size: 1em;
  color: white;
  background: #232423;
  text-align: 'center';

  &:hover {
    cursor: pointer;
    background: #a4aba4;
  }
`