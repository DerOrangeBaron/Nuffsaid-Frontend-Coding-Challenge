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
        messagesDispatch({apiIsStarted: !apiIsStarted, type: DispatchTypes.Messages.API_START_STOP})
        forceUpdate()
    }

    return (
        <div>
            <Header>
                <Button text={apiButtonOption} action={handleApiButton} />
                <Button text="Clear" action={() => messagesDispatch({type: DispatchTypes.Messages.CLEAR_MESSAGES})}/>
            </Header>
            <MessageTable messages={messagesState.messages}/>
        </div>
      )
}

export default MainView;