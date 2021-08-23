import { DispatchTypes } from "../";

export const messagesInitialState = {
    message: "",
    messages: [],
    apiIsStarted: false
};



const MessagesReducer = (currentState, action) => {
    switch (action.type) {
        case DispatchTypes.Messages.NEW_MESSAGE:
            currentState.messages = [...currentState.messages, action.message];
            currentState.message = action.message;
            return { ...currentState };
        case DispatchTypes.Messages.API_START_STOP:
            currentState.apiIsStarted = action.apiIsStarted;
            return { ...currentState };
        case DispatchTypes.Messages.CLEAR_MESSAGES:
            currentState.messages = [];
            return messagesInitialState;
        default:
            return currentState;
     }
};

export default MessagesReducer;
