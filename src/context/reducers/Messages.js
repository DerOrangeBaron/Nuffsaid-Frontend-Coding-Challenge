import { DispatchTypes } from "../";
import random from 'lodash/random';


export const messagesInitialState = {
    message: "",
    messages: [],
    apiIsStarted: false,
    messagesCount: 0,
};



const MessagesReducer = (currentState, action) => {
    switch (action.type) {
        case DispatchTypes.Messages.NEW_MESSAGE:
            currentState.messages = [{...action.message, id: currentState.messagesCount++}, ...currentState.messages];
            currentState.message = action.message;
            return { ...currentState };
        case DispatchTypes.Messages.API_START_STOP:
            currentState.apiIsStarted = action.apiIsStarted;
            return { ...currentState };
        case DispatchTypes.Messages.CLEAR_MESSAGES:
            currentState.messages = [];
            return { ...currentState };
        case DispatchTypes.Messages.CLEAR_MESSAGE:
            currentState.messages = currentState.messages.filter(message => message.id !== action.id);
            return { ...currentState };
        default:
            return currentState;
     }
};

export default MessagesReducer;
