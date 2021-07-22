import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AddNotes from './AddNotes'
import NotesList from './NotesList'

import './mynotes.css'

const Mynotes = (props) => {
    const [ notes, setNotes ] = useState([])
    const [ status, setStatus ] = useState(false)

    useEffect(() => {
        axios.get('https://dct-user-auth.herokuapp.com/api/notes', {
            headers : {
                'x-auth' : localStorage.getItem('token')
            }
        })
            .then((response) => {
                setNotes(response.data)
                setStatus(true)
            })
            .catch((error) => {
                alert('please login first')
                props.history.push('/login')
            })
    }, [])

    const addNote = (note) => {
        setNotes([ note, ...notes])
        //console.log(note)
    }

    const removeNote = (id) => {
        const result = notes.filter((note) => {
            return note._id !== id
        })
        setNotes(result)
    }

    return(
        <div className="mynotes-container">
            {status &&
                <>
                    <h1 className="mynotes-header">My Notes</h1>
                    <div className="mynotes-details">
                        <NotesList notes={notes} removeNote={removeNote} />
                        <AddNotes addNote={addNote} />
                    </div>
                </>
            }
            
        </div>
    )
}

export default Mynotes