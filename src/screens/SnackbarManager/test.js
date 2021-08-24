import React, {useContext} from "react";
import MainView from '../MainView'
import SnackbarManager from './'
import AppContextProvider, { GlobalContext, DispatchTypes } from '../../context'
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {act} from '@testing-library/react'

Enzyme.configure({ adapter: new Adapter() });

describe("Snackbar", () => {
    const testMessage = {message:'Ipsum Lorem'}

    const Dispatcher = (options) => {
        const context = useContext(GlobalContext);
        const [messagesState, messagesDispatch] = context.globalMessages;
        return(
            <>
                <button data-testid="new-message" onClick={() => messagesDispatch({message: {...testMessage, priority: 1}, type: DispatchTypes.Messages.NEW_MESSAGE})}></button>
            </>
        )
    }
    const wrapper = Enzyme.mount(
        <AppContextProvider>
            <Dispatcher />
            <SnackbarManager />
            <MainView />
        </AppContextProvider>
    );
    
   
    wrapper.find('[data-testid="api-button"]').simulate('click')
    
    jest.setTimeout(5000);

    
    it ('Snackbar showed when priority 1 message appears', () => {

        //Close snackbar if exist
        const snackbar = wrapper.find('[data-testid="message-box-snack"]').length;
        if(snackbar) {
            wrapper.find('[data-testid="message-box-snack"] button').simulate('click')
        }
        // Verify there are not snackbars
        expect(wrapper.find('[data-testid="message-box-snack"]').length).toEqual(0)
        
        // Add an error message to the context
        wrapper.find('[data-testid="new-message"]').simulate('click')
        jest.setTimeout(100);

        // verify if there are one snackbar
        expect(wrapper.find('[data-testid="message-box-snack"]').length).toEqual(2) // is 2 because it create a styled.div and a div with the data-testid
        // console.log(wrapper.debug())
    })

    it ('Snackbar didn`t close when click outside of the snackbar', () => {
        wrapper.find('h1').simulate('click')
        jest.setTimeout(100);
        expect(wrapper.find('[data-testid="message-box-snack"]').length).toEqual(2)

    })

    it ('Snackbar close when click the clear button', () => {
        wrapper.find('[data-testid="message-box-snack"] button').simulate('click')
        jest.setTimeout(100);
        expect(wrapper.find('[data-testid="message-box-snack"]').length).toEqual(0)

    })

    // it ('Snackbar it`s open', () => {
    //     // Add an error message to the context
    //     jest.useFakeTimers();
    //     jest.advanceTimersByTime(6000);
    //     wrapper.find('[data-testid="new-message"]').simulate('click')
    //     expect(wrapper.find('[data-testid="message-box-snack"]').length).toEqual(2)

    //     act(()=>jest.advanceTimersByTime(2000));
    //     // verify if there are not snackbar
    //     // console.log(wrapper.debug())
    //     expect(wrapper.find('[data-testid="message-box-snack"]').length).toEqual(0)     
        
    // })

    it ('Start button work', () => {
        wrapper.find('[data-testid="clear-button"]').simulate('click')
        wrapper.find('[data-testid="api-button"]').simulate('click')
        expect(wrapper.find('[data-testid="api-button"]').text()).toEqual("stop")
        jest.setTimeout(5000);
        expect(wrapper.find('[data-testid="message-box"]').length).not.toBe(0)
    })

    

    
    
})