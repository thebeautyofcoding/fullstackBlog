

import { useState } from 'react'


import { forgotPassword } from '../../../actions/auth'
const ForgotPassword = () => {
    

    const [values, setValues] = useState({
        email: '',
        message: '',
        error: '',
        showForm:true
    })

    const { email, message, error, showForm } = values;


    

    
    const showError = () => error ? (<div>{error}</div>) :''
    
    const showMessage = () => message ? (<div>{message}</div>) : ''
    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, message: '', error: '' })
        
        forgotPassword({ email }).then(data => {
            if (data.error) {
                setValues({...values, error:data.error})
            } else {
                setValues({...values, message:data.message, email:'', showForm:false})
            }
        }).catch(err=>console.log(err))
        
    }

    const handleChange = (name) => (e) => {
        setValues({...values, error:false, [name]: e.target.value})
    }

    const passwordForgotForm = () => {
       return (<form onSubmit={handleSubmit}>
            <input type="email" name="email" onChange={handleChange('email')} value={email} placeholder="Type in your email..." required />
            <button type="submit">Click to send password reset link to your email</button>
        </form>)
    }

    return ( <>
        <h2>Forgot password?</h2>

        { showError() }
            {showMessage()}
        {showForm && passwordForgotForm()}
        
   
            </>
    )

}

export default ForgotPassword