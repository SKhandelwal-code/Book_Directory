import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from './Button'
import { createAuthor, getAuthors } from '../feature/userSlice'
import './register.css'
import Logger from './Logger'

const CreateAuthor = () => {

    const initialState = {
        name:'',
        email:'',
        age:'',
        dob:''
    }
    const [values,setValues] = useState(initialState)

    const dispatch = useDispatch();
    const {authorError,loading} = useSelector(state => state.user);


    const handleChange = (event) => {
        const {name,value} = event.target;
        setValues(prevState=>({
            ...prevState,
            [name]:value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(createAuthor({values}));
        setValues(initialState)
        dispatch(getAuthors())

    }

  return (
    <div className='register__page'>
        <div className='page__heading'>
            <h2>Create New Author</h2>
        </div>
        {authorError && <Logger message={authorError} varient="danger"/>}
        <div className='page_content'>
            <form className='form' onSubmit={handleSubmit}>
                <div className='form__group'>
                    <input
                        name ="name"
                        value={values.name}
                        onChange={handleChange}
                        type='text'
                        className='form__input'
                        required={true}
                        placeholder="Enter Author Name"
                    />
                </div>
                <div className='form__group'>
                    <input
                        name ="email"
                        value={values.email}
                        onChange={handleChange}
                        type='email'
                        required={true}
                        className='form__input'
                        placeholder="Enter Author Email"
                    />
                </div>
                <div className='form__group'>
                    <input
                        name ="age"
                        value={values.age}
                        onChange={handleChange}
                        type='number'
                        required={true}
                        className='form__input'
                        placeholder="Enter Age"
                    />
                </div>
                <div className='form__group'>
                    <input
                        name ="dob"
                        value={values.dob}
                        onChange={handleChange}
                        type='date'
                        required={true}
                        className='form__input'
                        placeholder="Enter Date of Birth"
                    />
                </div>
                <Button buttonType = "button" type="submit" classess="register__button">CreateAuthor</Button>
            </form>
        </div>
    </div>
  )
}

export default CreateAuthor