import React from 'react'
import ReactDOM from 'react-dom'
import MainView from './screens/MainView'
import SnackbarManager from './screens/SnackbarManager'
import AppContextProvider from './context'

ReactDOM.render((
    <AppContextProvider>
        <SnackbarManager />
        <MainView />
    </AppContextProvider>
    ), document.getElementById('root'));
