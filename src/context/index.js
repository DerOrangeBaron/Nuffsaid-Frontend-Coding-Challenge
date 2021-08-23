import React, { useReducer, createContext } from "react";
import MessagesReducer, { messagesInitialState } from "./reducers/Messages";
import Types from "./types";

export const GlobalContext = createContext();

export const DispatchTypes = Types;

const AppContextProvider = ({ children }) => {
    const [messagesState, messagesDispatch] = useReducer(
      MessagesReducer,
      messagesInitialState
    );
  
    const values = {
      globalMessages: [messagesState, messagesDispatch],
    };
  
    return (
      <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
    );
  };
  
  export default AppContextProvider;
