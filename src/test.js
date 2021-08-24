import React, {useContext} from "react";
import MainView from './screens/MainView'
import SnackbarManager from './screens/SnackbarManager'
import AppContextProvider, { GlobalContext, DispatchTypes } from './context'
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe("AppContext & GlobalContext", () => {
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
    
    //Waite to have some boxex
    jest.setTimeout(4000);
    
    it ('Stop button is showed at the beginning', () => {
        expect(wrapper.find('[data-testid="api-button"]')).toBeVisible;
        expect(wrapper.find('[data-testid="api-button"]').text()).toEqual("stop")
    })

    // Stop to pooling messages
    it ('Stop button works', () => {
        wrapper.find('[data-testid="api-button"]').simulate('click')
        expect(wrapper.find('[data-testid="api-button"]').text()).toEqual("start")
    })
    jest.setTimeout(5000);

    const initialBoxes = wrapper.find('[data-testid="grid"] [data-testid="message-box"]').length
    jest.setTimeout(6000);

    // Check API sttoped
    it ('Not new messages after timer', () => {
        expect(wrapper.find('[data-testid="grid"] [data-testid="message-box"]').length).toEqual(initialBoxes);
    })
    
    it ('Clear button works', () => {    
        wrapper.find('[data-testid="clear-button"]').simulate('click')
        jest.setTimeout(100);
        expect(wrapper.find('[data-testid="message-box"]').length).toEqual(0)
    })

    
    it ('Start button works', () => {
        wrapper.find('[data-testid="clear-button"]').simulate('click')
        wrapper.find('[data-testid="api-button"]').simulate('click')
        expect(wrapper.find('[data-testid="api-button"]').text()).toEqual("stop")
        jest.setTimeout(5000);
        expect(wrapper.find('[data-testid="message-box"]').length).not.toBe(0)
    })

    it ('MessageBox Clear button Exist', () => {
        expect(wrapper.find('[data-testid="message-box"] button').text()).toEqual('Clear')
    })
    
    it ('MessageBox clear button work', () => {
        const initialButtons = wrapper.find('[data-testid="message-box"] button').length
        wrapper.find('[data-testid="message-box"] button').simulate('click')
        expect(wrapper.find('[data-testid="message-box"]').length).toBe(initialButtons -1)
    })
    
    
})