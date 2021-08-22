import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export const Default = styled(Button)`
  &&{
    background-color: #88FCA3;
    color: #000;
    box-shadow: 0px 3px 2px -1px rgba(0,0,0,0.25);
    padding: 5px 20px;
    font-weight: bold;
    margin: 4px 2px;
    &:hover {
      background-color: #58ff7f;
    }
  }
`;