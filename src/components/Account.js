import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './account.css'

const Account = (props) => {
    const [ user, setuser ] = useState({})
    const [ status, setStatus ] = useState(false)
    //console.log(props)

    useEffect(() => {
        axios.get('http://dct-user-auth.herokuapp.com/users/account', {
            headers : {
                'x-auth' : localStorage.getItem('token')
            }
        })
            .then((response) => {
                //console.log(response.data)
                setuser(response.data)
                setStatus(true)
            })
            .catch((error) => {
                alert('Please login first')
                console.log(error)
                props.history.push('/login')
            })

    }, [])

    return(
        <div>
            {status && 
                <div className="account-container">
                    <h1 className="account-header">User account details</h1>
                    <p className="account-details">Username - {user.username}</p>
                    <p className="account-details">Email - {user.email}</p>
                </div>
            }
            
        </div>
    )


    
}

export default Account