import React, { useState } from 'react'
import './notesform.css'

const NotesForm = (props) => {
    const [ title, setTitle ] = useState('')
    const [ body, setBody ] = useState('')

    const { formSubmit, titleError, clearError } = props

    const handleChange = (e) => {
        if(e.target.name === 'title'){
            setTitle(e.target.value)
            
        }
        else if(e.target.name === 'body'){
            setBody(e.target.value)
        }
    }

    const handleFocus = () => {
        clearError()
    }
   

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = {
            title : title, 
            body : body
        }
        //console.log(formData)
        formSubmit(formData)
        setTitle('')
        setBody('')
    }

    return(
        <div className="notesform-container">
            <h1>Add Notes</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    className="notesform-input"
                    type="text" 
                    value={title}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    placeholder="title"
                    name="title"
                    
                /><br/>
                {titleError && <span style={{color:'red'}}>{titleError}</span>}<br/>
                <textarea
                    className="notesform-textarea"
                    rows="8" cols="40"
                    value={body}
                    onChange={handleChange}
                    placeholder="Enter text here"
                    name="body"
                ></textarea><br/><br/>
                <input 
                    className="notesform-button"
                    type="submit" 
                    value="save" 
                />
            </form>
        </div>
    )
}

export default NotesForm