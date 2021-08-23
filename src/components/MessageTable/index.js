import React, {useContext} from 'react'
import {Container, Grid, Button} from '@material-ui/core'
import { GlobalContext, DispatchTypes } from "../../context";
import MessageBox from '../MessageBox'

const MessageTable = ({props}) => {
    
    const context = useContext(GlobalContext);
    const [messagesState, messagesDispatch] = context.globalMessages;
    const {messages} = messagesState
    if(!messages) return null;
    
    const titles = ['Error Type 1', 'Warning Type 2', 'Info Type 3']

    return (
        <Container fixed>
            <Grid container spacing={2}>
                { [1,2,3].map( priority => {
                    return (
                        <Grid item sm={4} key={priority}>
                            <h2 style={{margin: 0}}>{ titles[priority -1] }</h2>
                            <p style={{margin: '0 0 10px 0'}}>Count: {messages.filter( m => m.priority === priority).length}</p>
                            {   
                                messages.filter( m => m.priority === priority).map( (message, idx) => (
                                    <MessageBox key={message.message.split(' ')[0] + idx} className={`priority${priority}`} message={message} onClear={() => messagesDispatch({id: message.id, type: DispatchTypes.Messages.CLEAR_MESSAGE})}/>
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