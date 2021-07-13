import React from 'react'
import NotesInfo from './NotesInfo'

const NotesList = (props) => {
    const { notes, removeNote } = props

    return(
        <div>
            {notes.length === 0 ? (
                <div>
                    <h1>No notes found</h1>
                    <h1>Create your first note</h1>
                </div>  
                ) : (
                    <div>
                        <h1>My Notes - {notes.length}</h1>
                        {notes.map((note) => {
                            return <NotesInfo 
                                        key={note._id}
                                        {...note}
                                        removeNote={removeNote}
                                    />
                        })}
                    </div>
                )      
            }
            
        </div>
    )
}

export default NotesList