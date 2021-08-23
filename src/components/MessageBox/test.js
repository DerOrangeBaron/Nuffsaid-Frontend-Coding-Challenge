import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import MessageBox from './'

describe("<MessageBox />", () => {
    const testMessage = {message:'Ipsum Lorem'}
    const component = render(
        <>
            <MessageBox className="priority1" message={testMessage} />
            <MessageBox className="priority2" message={testMessage} />
            <MessageBox className="priority3" message={testMessage} />
        </>        
    )
    const [messageBox1, messageBox2, messageBox3] = component.getAllByTestId('message-box')

    it('Check is rendered', () => {
        expect(messageBox1).toBeDefined()
    });

    it('Check if have text', () => {
        expect(messageBox1).toHaveTextContent(testMessage.message)
    });

    it('Check have button clear', () => {
        expect(messageBox1).toHaveTextContent('Clear')
    });

    it('Check priority 1 background color', () => {
        expect(messageBox1).toHaveStyle('background-color: rgb(245, 98, 54)');
    });

    it('Check priority 2 background color', () => {
        expect(messageBox2).toHaveStyle('background-color: rgb(252, 231, 136)');
    });
    
    it('Check priority 3 background color', () => {
        expect(messageBox3).toHaveStyle('background-color: rgb(136, 252, 163)');
    });
})


// describe("<MessageBox />", () => {
//     
// })