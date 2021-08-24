import React, {useContext} from 'react'
import * as S from './styles'
import {Container, Grid, Button} from '@material-ui/core'
import { GlobalContext, DispatchTypes } from "../../context";

const MessageBox = ({className, message, onClear, data_testid}) => {
    

    return (
        <S.MessageBox className={className} data-testid={data_testid}>
            <p>{message.message}</p>
            <S.MessageFooter>
                <S.ButtonClear onClick={onClear}  data-testid="box-clear-button">
                    Clear
                </S.ButtonClear>
            </S.MessageFooter>
        </S.MessageBox>    
    )
}

export default MessageBox;