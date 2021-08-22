import React, { useState, useReducer, useEffect, useRef, useCallback } from 'react'
import Header from '../../components/Header'
import Button from '../../components/Button'
import MessageTable from '../../components/MessageTable'
import Api from '../../api'

const MainView = () => {
    const [, forceUpdate] = useReducer(x => !x, true);
    const [api, setApi] = useState( null )

    const messageReducer = (state, action) => { 
        let messages = [];
        if (action.type === 'add') {
            messages = [
                ...state.messages,
                action.message,
            ];
        }
        console.log(messages)     
        return {messages}
    }
    const [state, dispatch] = useReducer(messageReducer, {messages:[]});

    

    //Create the API
    useEffect(() => {
        setApi(new Api({
            messageCallback:  (message) => dispatch({message, type: 'add'})
        }))
    }, [])

    // Start the API before created
    const isStart = useRef(true);
    useEffect(() => {
        if (!isStart.current) api.start()
        else isStart.current = false
    }, [api])


    //Start or stop the API
    const apiButtonOption = (api && api.isStarted()) ? 'stop' : 'start';
    const handleApiButton = () => {
        api[apiButtonOption]();
        forceUpdate()
    }

    return (
        <div>
          <Header>
            {/* {this.renderButton()} */}
            <Button text={apiButtonOption} action={handleApiButton} />
            <Button text="Clear" action={() => dispatch({type: 'clear'})}/>
          </Header>
        <MessageTable messages={state.messages}/>
        </div>
      )
}

export default MainView;