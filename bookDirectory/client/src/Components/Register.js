import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from './Button'
import { signUp } from '../feature/userSlice'
import './register.css'
import Create from '../Screens/Create';
import Logger from './Logger'

const Register = () => {

    const initialState = {
        name:'',
        email:'',
        age:'',
        dob:'',
        password:'',
        confirmPassword:''
    }
    const [values,setValues] = useState(initialState)

    const dispatch = useDispatch();
    const {registerError,loading} = useSelector(state => state.user);

    const [error,setError] = useState(registerError)

    const handleChange = (event) => {
        const {name,value} = event.target;
        setValues(prevState=>({
            ...prevState,
            [name]:value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if(values.password.length < 6){
            return setError("Password is too short")
        }
        dispatch(signUp({values}));
        // setValues(initialState)
    }

  return (
    <div className='register__page'>
        <div className='register__heading'>
            <h2>Create An Account</h2>
        </div>
        {error && <Logger message={error} varient="danger"/>}
        {registerError && <Logger message={registerError} varient="danger"/>}
        <div className='page_content'>
            <form className='form' onSubmit={handleSubmit}>
                <div className='form__group'>
                    <input
                        name ="name"
                        value={values.name}
                        onChange={handleChange}
                        type='text'
                        className='form__input'
                        placeholder='Enter your name'
                        required={true}

                    />
                </div>
                <div className='form__group'>
                    <input
                        name ="email"
                        value={values.email}
                        onChange={handleChange}
                        type='email'
                        placeholder='Enter your email'
                        className='form__input'
                        required={true}
                    />
                </div>
                <div className='form__group'>
                    <input
                        name ="age"
                        value={values.age}
                        onChange={handleChange}
                        type='number'
                        placeholder='Enter your age'
                        className='form__input'
                        required={true}

                    />
                </div>
                <div className='form__group'>
                    <input
                        name ="dob"
                        value={values.dob}
                        onChange={handleChange}
                        type='date'
                        placeholder='Enter your Date of Birth'
                        className='form__input'
                        required={true}

                    />
                </div>
                <div className='form__group'>
                    <input
                        name ="password"
                        value={values.password}
                        onChange={handleChange}
                        type='password'
                        placeholder='Enter your password'
                        required={true}
                        className='form__input'

                    />
                </div>
                <div className='form__group'>
                    <input
                        name ="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        className='form__input'
                        placeholder='Confirm your password'
                        type='password'
                        required={true}
                    />
                </div>
                <Button buttonType = "button" type="submit" classess="register__button">Register</Button>
            </form>
        </div>
    </div>
  )
}

export default Register