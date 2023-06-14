import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render , screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

test('renders a note', () => {

    const note = {
        content: 'this a test content',
        important: true,
    }

    //render and search for content using screen()
    /* render(<Note note={note}/>)
     const element = screen.getByText('this a test content')
     expect(element).toBeDefined() */

    // use CSS-selectors to find rendered element
    const { container } = render(<Note note={note}/>)
    const element = screen.getByText('this a test content')
    screen.debug() // used to print the component html to the console
    screen.debug(element) // used to print the component html to the console

    const div = container.querySelector('.note')
    expect(div).toHaveTextContent('this a test content')
    
})

test('NoteForm updates parest state and calls onSubmit', async () => {
    
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }
    const mockHandler = jest.fn()

    render(<Note note={note} toggleImportance={mockHandler}/>) 

    const user = userEvent.setup()
    const element = screen.getByText('make not important')
    await user.click(element)

    expect(mockHandler.mock.calls).toHaveLength(1)

})