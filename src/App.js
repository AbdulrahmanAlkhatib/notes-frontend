/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react'

import Note from './components/Note'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'
import loginService from './services/login'
import logoutService from './services/logout'


const App = () => {
    const [notes, setNotes] = useState([])
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)


    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
    }, [])

    useEffect(() => {
        const loggedUserJson = window.localStorage.getItem('loggedNoteappUser')
        if(loggedUserJson) {
            const user = JSON.parse(loggedUserJson)
            setUser(user)
            noteService.setToken(user.token)
        }
    }, [])

    const noteFormRef = useRef()

    const addNote = (noteObject) => {
        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                noteFormRef.current.toggleVisibility()
            })
    }

    const handleCredintialChange = (e) => {
        e.preventDefault()
        if(e.target.name === 'Username') setUsername(e.target.value)
        else if (e.target.name === 'Password') setPassword(e.target.value)
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try{
            const user = await loginService.login({ username, password })

            window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

            noteService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch {
            setErrorMessage('invalid credintials!')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = () => {
        logoutService.logout()
        window.location.reload()
    }


    const toggleImportanceOf = id => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnedNote))
            })
            .catch(error => {
                setErrorMessage(
                    `Note '${note.content}' was already removed from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setNotes(notes.filter(n => n.id !== id))
            })
    }

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important)

    const logoutButton = () => (
        <button onClick={() => handleLogout()}>Logout</button>
    )

    return (
        <div>
            <h1>Notes</h1>

            <Notification message={errorMessage} />

            {user && <div>
                <p>{user.name} logged in</p>
            </div>
            }

            { !user &&
        <Togglable buttonLabel='login'>
            <LoginForm
                username={username}
                password={password}
                handleLogin={handleLogin}
                handleCredintialChange={(e) => handleCredintialChange(e)}
            />
        </Togglable>

            }

            { user &&
        <Togglable buttonLabel='new note' ref={noteFormRef}>
            <NoteForm
                addNote={addNote}
            />
        </Togglable>
            }


            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all' }
                </button>
            </div>
            <ul>
                {notesToShow.map(note =>
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportance={() => toggleImportanceOf(note.id)}
                    />
                )}
            </ul>

            {user === null ? <div></div> : logoutButton()}


            <Footer />
        </div>
    )
}

export default App