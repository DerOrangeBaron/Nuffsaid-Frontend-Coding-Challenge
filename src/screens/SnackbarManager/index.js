import React, { useContext, useState, useEffect} from 'react'
import { GlobalContext } from "../../context";
import Snackbar from '@material-ui/core/Snackbar';
import MessageBox from '../../components/MessageBox'


const SnackbarManager = () => {
    const context = useContext(GlobalContext);
    const [messagesState] = context.globalMessages;
    const {message} = messagesState;

    const [snackMessage, setSnackMessage] = useState('')
    const [closeMessage, setCloseMessage] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (message.priority === 1) {   
            setSnackMessage(message)
        }
    }, [message])

    useEffect(() => {
        // Prevent open the Snackbar at the beginning
        if(snackMessage.message) {
            setOpen(true)
            setTimeout(() => {setCloseMessage(snackMessage.message)}, 2000)
        }
    }, [snackMessage])
    
    useEffect(() => {
        if(snackMessage.message === closeMessage) {
            setOpen(false)
        }
    }, [closeMessage])

    const handleClose = (event, reason) => {
        if ( reason !== 'clickaway') {
            setOpen(false);
        }
    };

    return (
        <div>
            <Snackbar 
                open={open} 
                onClose={handleClose}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            >
                <div>
                {  open && 
                    <MessageBox 
                        message={snackMessage} 
                        className="priority1" 
                        onClear={handleClose}
                        data_testid="message-box-snack"
                    />
                }
                </div>
            </Snackbar>
        </div>
    )
}

export default SnackbarManager;