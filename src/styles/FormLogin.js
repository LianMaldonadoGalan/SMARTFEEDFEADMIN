import styled, {createGlobalStyle } from "styled-components";

export const StyledForm = styled.form`
    width: 43%;
    max-width: 1000px;
    padding: 40px;
    background-color: #fff;
    border-radius: 10px;
    box-sizing: border-box;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
`;

export const StyledFormWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 110vh;
    padding: 0 20px;
`;

export const GlobalStyle = createGlobalStyle`
    html {
        height: 120%
    }
    body {
        font-family: Arial, Helvetica, sans-serif;
        background: linear-gradient(to bottom, #ecffeb, #74cc74);
        height: 95%;
        margin: 0;
        color: #555;
    }
`;

