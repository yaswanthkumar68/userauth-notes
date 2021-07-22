import React, { useState } from 'react'
import axios from 'axios'
import NotesForm from './NotesForm'

const AddNotes = (props) => {
    const [titleError, setTitleError ] = useState('')
    const { addNote } = props

    //console.log('titleError', titleError)
    const clearError = () => {
        setTitleError('')
    }
    const formSubmit = (details) => {
        axios.post('https://dct-user-auth.herokuapp.com/api/notes', details, {
            headers : {
                'x-auth' : localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                if(result.hasOwnProperty('errors')){
                    //console.log(result.errors.title.message)
                    setTitleError(result.errors.title.message)
                }
                else{
                    //console.log(result)
                    //setTitleError('')
                    addNote(response.data)
                }
                
            })
            .catch((error) => {
                alert(error.message)
            })
    }
    return(
        <div>
            <NotesForm 
                formSubmit={formSubmit}
                titleError={titleError}
                clearError={clearError}
            />

        </div>
        
    )
}
export default AddNotes