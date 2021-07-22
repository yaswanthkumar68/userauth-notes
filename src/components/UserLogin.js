import React, {useState} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import './login.css'

const UserLogin = (props) => {
    const [ loginError, setLoginError ] = useState('')
    const login = localStorage.getItem('token')

    const formik = useFormik({
        initialValues: {
            email: 'yaswanth04@gmail.com',
            password: 'secret123'
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('email cannot be blank'),
            password: Yup.string().required('password cannot be blank')
        }),
        onSubmit: (values) => {
            //console.log(values)
            axios.post('https://dct-user-auth.herokuapp.com/users/login', values)
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
                        props.history.push('/')
                        props.handleAuth()
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
        <div className="login-container">
            <h1>Login here</h1>
            {loginError && <p>{loginError}</p>}
            <form onSubmit={formik.handleSubmit}>
                <input  
                    className="login-input"
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
                    className="login-input"
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
            
                <input type="submit" value="Login" className="login-button"/>
            </form>
        </div>
    )

}
export default UserLogin