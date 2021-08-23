import React, {useContext} from 'react'
import * as S from './styles'
import {Container, Grid, Button} from '@material-ui/core'
import { GlobalContext, DispatchTypes } from "../../context";

const MessageTable = ({className, message, onClear}) => {
    
    

    return (
        <S.MessageBox className={className}>
            <p>{message.message}</p>
            <S.MessageFooter>
                <S.ButtonClear onClick={onClear}>
                    Clear
                </S.ButtonClear>
            </S.MessageFooter>
        </S.MessageBox>    
    )
}

export default MessageTable;