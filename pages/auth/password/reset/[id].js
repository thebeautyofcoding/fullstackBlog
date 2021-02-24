import { resetPassword } from "../../../../actions/auth"
import { withRouter } from 'next/router';
import{useState}from 'react'

const ResetPassword = ({router}) => {
    const [values, setValues] = useState({
        name: '',
        newPassword: '',
        error: '',
        message: '',
        showForm: true
    })

    const { name, newPassword, error, message, showForm } = values
    

    const handleSubmit = () => {
        e.preventDefault()
        console.log(router.query.id)
        resetPassword({ newPassword, resetPasswordLink: router.query.id }).then(data => {
            if (data.error) {
                setValues({
                    ...values, error: data.error, showForm:true, newPassword:''
                })
            } else {
                setValues({
                    ...values, message: data.message, showForm:false, newPassword:''
                })
            }
        })
    }

    const passwordResetForm = () => {
       return <form onSubmit={handleSubmit}>
            <input type="password" name="newPassword" onChange={e => setValues({ ...values, newPassword: e.target.value })} placeholder="Please type your new password" required />
        
            <button type="submit">Update your password</button>
        </form>
    }


    const showError = () => error ? (<div>{error}</div>) :''
    
    const showMessage = () => message ? (<div>{message}</div>) : ''
    

    return <>
        {passwordResetForm()}
        {showError()}
        {showMessage()}
    </>

}
export default withRouter(ResetPassword)