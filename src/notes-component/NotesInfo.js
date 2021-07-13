import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

import './notesinfo.css'


const NotesInfo = (props) => {
    const [ info, setInfo ] = useState({})
    const [ status, setStatus ] = useState(false)

    const { _id, title, body, user, removeNote } = props
    

    const handleRemove = () => {
        //console.log(_id)
        axios.delete(`http://dct-user-auth.herokuapp.com/api/notes/${_id}`, {
            headers : {
                'x-auth' : localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                removeNote(result._id)
            })
            .catch((error) => {
                alert(error.message)
            })
    }

    const handleShow = () => {  
        axios.get(`http://dct-user-auth.herokuapp.com/api/notes/${_id}`, {
            headers : {
                'x-auth' : localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                setInfo(result)
                setStatus(true)
            })
            .catch((error) => {
                alert(error.message)
            })


    }
    if(status){
        Swal.fire({
            title: info.title,
            text: info.body,
            showConfirmButton:false,
            showCloseButton:true,
            allowOutsideClick:false,
            allowEscapeKey:true

        })
        setStatus(false)
    }

    return(
        <div>
            <div className="notesinfo-container">
                <h2 className="notesinfo-heading" onClick={handleShow}>{title}</h2>
                <button className="notesinfo-button"onClick={handleRemove}>Remove</button>
            </div>   
        </div>
    )
}

export default NotesInfo