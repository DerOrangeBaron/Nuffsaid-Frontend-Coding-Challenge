import React, { useContext, useState, useReducer, useEffect, useRef, useCallback } from 'react'
import { GlobalContext, DispatchTypes } from "../../context";
import Header from '../../components/Header'
import Button from '../../components/Button'
import MessageTable from '../../components/MessageTable'
import Api from '../../services/api'

const MainView = () => {
    const [, forceUpdate] = useReducer(x => !x, true);
    const [api, setApi] = useState( null )

    const context = useContext(GlobalContext);
    const [messagesState, messagesDispatch] = context.globalMessages;

    // const messageReducer = (state, action) => { 
    //     let messages = [];
    //     if (action.type === 'add') {
    //         messages = [
    //             ...state.messages,
    //             action.message,
    //         ];
    //     }
    //     console.log(messages)     
    //     return {messages}
    // }
    // const [state, dispatch] = useReducer(messageReducer, {messages:[]});


    //Create the API
    useEffect(() => {
        setApi(new Api({
            messageCallback:  (message) => messagesDispatch({message, type: DispatchTypes.Messages.NEW_MESSAGE})
        }))
    }, [])

    // Start the API before created
    const isStart = useRef(true);
    useEffect(() => {
        if (!isStart.current) {
            api.start();
            messagesDispatch({apiIsStarted: true, type: DispatchTypes.Messages.API_START_STOP})
        } else isStart.current = false
    }, [api])


    //Start or stop the API
    const apiIsStarted = (api && api.isStarted());
    const apiButtonOption = apiIsStarted ? 'stop' : 'start';
    const handleApiButton = () => {
        api[apiButtonOption]();
        forceUpdate()
    }

    return (
        <div>
            <Header>
                <Button text={apiButtonOption} action={handleApiButton} />
                <Button text="Clear" action={() => dispatch({type: 'clear'})}/>
            </Header>
            <MessageTable messages={messagesState.messages}/>
        </div>
      )
}

export default MainView;