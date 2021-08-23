import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export const MessageBox = styled.div`
    box-shadow: 0px 3px 2px -1px rgba(0,0,0,0.25);
    padding: 10px 15px;
    margin-bottom: 10px;
    border-radius: 5px;
    font-weight: 100;
    max-width: 90vw;
    &&.priority1 {
        background-color: #F56236;
    }
    &&.priority2 {
        background-color: #FCE788;
    }
    &&.priority3 {
        background-color: #88FCA3;  
    }
    p {
        margin: 0;
        margin-right: 70px;
    }
`

export const MessageFooter = styled.div`
    display: flex;
    justify-content: flex-end;
`

export const ButtonClear = styled(Button)`
    && {
        padding: 0;
        margin: 0;
        text-transform: capitalize;
    }
`


