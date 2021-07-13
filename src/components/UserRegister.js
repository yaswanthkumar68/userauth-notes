import React, { useEffect} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import './register.css'

const UserRegister = (props) => {
    const login = localStorage.getItem('token')
 
    const formik = useFormik({
        initialValues: {
        username: '',
        email: '',
        password: ''
        },
        validationSchema: Yup.object({
        username: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('username cannot be blank'),
        email: Yup.string().email('Invalid email address').required('email cannot be blank'),
        password: Yup.string()
                .min(8, 'password must be greater than 8 characters')
                .required('password cannot be blank')
        }),
    
        onSubmit: (values) => {
            //console.log(values)
            axios.post('http://dct-user-auth.herokuapp.com/users/register', values)
                .then((response) => {
                    const result = response.data
                    //console.log(result)
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
    })

    //console.log(formik.errors)
    return (
        !login &&
        <div className="register-container">
            <h1>Register here</h1>
            <form onSubmit={formik.handleSubmit}>
            {/* <label htmlFor="name">Name</label><br/> */}
            <input
                className="register-form"
                id="username"
                name="username"
                type="text"
                placeholder="Enter your name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                style={formik.touched.username && formik.errors.username && {border:"2px solid red"}}
            /><br/>
            {formik.touched.username && formik.errors.username ? (
                <span>{formik.errors.username}</span>
            ) : null}<br/>
        
            {/* <label htmlFor="email">Email Address</label><br/> */}
            <input  
                className="register-form"
                id="email"
                name="email"
                type="text"
                placeholder="Enter your email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                style={formik.touched.email && formik.errors.email && {border:"2px solid red"}}
            /><br/>
            {formik.touched.email && formik.errors.email ? (
                <span>{formik.errors.email}</span>
            ) : null}<br/>
        
            {/* <label htmlFor="password">Password</label><br/> */}
            <input
                className="register-form"
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                style={formik.touched.password && formik.errors.password && {border:"2px solid red"}}
            /><br/>
            {formik.touched.password && formik.errors.password ? (
                <span>{formik.errors.password}</span>
            ) : null}<br/>
        
            <input type="submit" value="Signup" className="register-button"/>
            </form>
        </div>
        
    )
}

export default UserRegister