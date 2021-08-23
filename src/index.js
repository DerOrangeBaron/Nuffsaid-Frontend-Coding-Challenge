import React from 'react'
import ReactDOM from 'react-dom'
import MainView from './screens/MainView'
import AppContextProvider from './context'

ReactDOM.render((
    <AppContextProvider>
        <MainView />
    </AppContextProvider>
    ), document.getElementById('root'));
