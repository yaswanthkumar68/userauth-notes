import React, { useState } from 'react'
import axios from 'axios'
import './login.css'

const Login = (props) => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ loginError, setLoginError ] = useState('')
    

    const handleChange = (e) => {
        if(e.target.name === 'email'){
            setEmail(e.target.value)
        }
        else if(e.target.name === 'password'){
            setPassword(e.target.value)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        const formDetails = {
            email : email,
            password : password
        }
        //console.log(formDetails)
        axios.post('http://dct-user-auth.herokuapp.com/users/login', formDetails)
            .then((response) => {
                const result = response.data
                if(result.hasOwnProperty('errors')){
                    //alert(result.errors)
                    setLoginError(result.errors)
                }
                else{
                    alert('successfully logged in')
                    //setLoginError('successfully logged in')
                    localStorage.setItem('token', result.token)
                    props.history.push('/Account')
                    props.handleAuth()
                }
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    return(
        <div className="login-container">
            <h1>Login Component</h1>
            {loginError && <p>{loginError}</p>}
            <form onSubmit={handleSubmit}>

                <input 
                    className="login-input"
                    type="text"
                    value={email}
                    placeholder="Enter your Email"
                    onChange={handleChange}
                    name='email'
                    
                /><br/><br/>

                <input 
                    className="login-input"
                    type="password"
                    value={password}
                    placeholder="Enter your password"
                    onChange={handleChange}
                    name='password'
                    
                /><br/><br/>

                <input type="submit" className="login-button"/>

            </form>

        </div>
    )
}

export default Login