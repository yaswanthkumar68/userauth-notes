import React, { useState } from 'react'
import axios from 'axios'
import validator from 'validator'
import './register.css'

const Register = (props) => {
    const [ userName, setUserName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ formErrors, setFormErrors ] = useState({})

    const error = {}

    const handleChange = (e) => {
        if(e.target.name === 'username'){
            setUserName(e.target.value)
        }
        else if(e.target.name === 'email'){
            setEmail(e.target.value)
        }
        else if(e.target.name === 'password'){
            setPassword(e.target.value)
        }
    }

    const formValidation = () => {
        if(userName.trim().length === 0){
            error.username = "Username cannot be blank"
        }
        else if(!validator.isAlpha(userName)){
            error.username = "Username must be in alphabets only"
        }

        if(email.trim().length === 0){
            error.email = "Email cannot be blank"
        }
        else if(!validator.isEmail(email)){
            error.email = "Invalid email format"
        }

        if(password.trim().length === 0){
            error.password = "password cannot be blank"
        }
        else if(password.trim().length < 8 || password.trim().length > 15){
            error.password = "password should be between 8 - 15 characters"
        }

    }

    const handleFocus = () => {
        setFormErrors(error)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        formValidation()

        if(Object.keys(error).length === 0){
            setFormErrors({})

            const formData = {
                username : userName,
                email : email,
                password : password
            }
            //console.log(formData)
            axios.post('http://dct-user-auth.herokuapp.com/users/register', formData)
                .then((response) => {
                    const result = response.data
                    if(result.hasOwnProperty('errors')){
                        alert(result.message)
                    }
                    else{
                        alert('account created successfully')
                        props.history.push('/login')
                    }
                })
                .catch((error) => {
                    console.log(error.message)
                })
        }
        else{
            setFormErrors(error)
        }
    }

    return(
        <div className="register-container">
            <h1>Register Component</h1>
            <form onSubmit={handleSubmit}>
                <input style={formErrors.username && {border : "2px solid red"}}
                    className="register-form"
                    type="text"
                    value={userName}
                    placeholder="Enter your username"
                    onChange={handleChange}
                    name='username'
                    onFocus={handleFocus}
                /><br/>
                {formErrors.username && <span>{formErrors.username}</span>}<br/>

                <input style={formErrors.email && {border : "2px solid red"}}
                    className="register-form"
                    type="text"
                    value={email}
                    placeholder="Enter your Email"
                    onChange={handleChange}
                    name='email'
                    onFocus={handleFocus}
                /><br/>
                {formErrors.email && <span>{formErrors.email}</span>}<br/>

                <input style={formErrors.password && {border :"2px solid red"}}
                    className="register-form"
                    type="password"
                    value={password}
                    placeholder="Enter your password"
                    onChange={handleChange}
                    name='password'
                    onFocus={handleFocus}
                /><br/>
                {formErrors.password && <span>{formErrors.password}</span>}<br/>

                <input type="submit" className="register-button" />

            </form>

        </div>
    )
}

export default Register