import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../Components/Button'
import { signIn } from '../feature/userSlice'
import Logger from './Logger'
import './login.css';

const Login = () => {

    const initialState = {
        email:'',
        password:''
    }
    const [values,setValues] = useState(initialState)

    const dispatch = useDispatch();

    const {loginError,loading} = useSelector(state=>state.user)

    const handleChange = (event) => {
        const {name,value} = event.target;
        setValues(prevState=>({
            ...prevState,
            [name]:value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(signIn({values}))
    }


  return (
    <div className='login__page'>
        <div className='login__heading'>
            <h2>Login to Your Account</h2>
        </div>
        {loginError && <Logger message={loginError} varient="danger"/>}
        <div className='page_content'>
            <form className='form' onSubmit={handleSubmit}>
                <div className='form__group'>
                    <input
                        name ="email"
                        value={values.email}
                        onChange={handleChange}
                        className='login__input'
                        type='email'
                        placeholder='Enter your email:'
                        required={true}
                    />
                </div>
                <div className='form__group'>
                    <input
                        name ="password"
                        value={values.password}
                        onChange={handleChange}
                        className='login__input'
                        placeholder='Enter your password:'
                        type='password'
                        required={true}
                    />
                </div>
                <Button buttonType = "button" type="submit" classess="login__button">Login</Button>
            </form>
        </div>
    </div>
  )
}

export default Login