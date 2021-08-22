import React from 'react'
import * as S from './styles'
import {Container, Grid} from '@material-ui/core'

const MessageTable = ({messages, closeMessage}) => {
    if(!messages) return null;

    return (
        <Container fixed>
            <Grid container spacing={2}>
                { [1,2,3].map( priority => {
                    return (
                        <Grid item sm={4} key={priority}>
                            {
                                messages.filter( m => m.priority === priority).map( (message, idx) => (
                                    <S.MessageBox key={message.message.split(' ')[0] + idx} className={`priority${priority}`}>{message.message}</S.MessageBox>    
                                ))
                            }
                        </Grid>
                    )
                    })
                }
            </Grid>
        </Container>
    )
}

export default MessageTable;