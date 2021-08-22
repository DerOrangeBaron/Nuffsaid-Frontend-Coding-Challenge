import styled from 'styled-components';

export const MessageBox = styled.div`
    box-shadow: 0px 3px 2px -1px rgba(0,0,0,0.25);
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 5px;
    font-weight: 100;
    &&.priority1 {
        background-color: #F56236;
    }
    &&.priority2 {
        background-color: #FCE788;
    }
    &&.priority3 {
        background-color: #88FCA3;  
    }
`

