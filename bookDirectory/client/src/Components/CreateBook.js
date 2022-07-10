import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from './Button'
import { createBook, reset } from '../feature/bookSlice'
import './login.css'
import Logger from './Logger'


const CreateBook = () => {

    const initialState = {
        name:'',
        price:0,
        author:'',
        publishedOn:''
    }
    const [values,setValues] = useState(initialState)

    const dispatch = useDispatch();
    const {users} = useSelector(state => state.user);
    const {createBookError,message} = useSelector(state => state.book);

    // const [error,setError] = useState(null)


    const handleChange = (event) => {
        const {name,value} = event.target;
        setValues(prevState=>({
            ...prevState,
            [name]:value
        }))
        dispatch(reset())
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(createBook({values}));
        dispatch(reset())
    }

  return (
    <div className='login__page'>
        <div className='login__heading'>
            <h2>Create a New Book</h2>
        </div>
        {createBookError && <Logger message={createBookError} varient="danger"/>}
        {message && <Logger message={message} varient="info"/>}
        <div className='page_content'>
            <form className='form' onSubmit={handleSubmit}>
                <div className='form__group'>
                    <label className='form_lable'></label>
                    <input
                        name ="name"
                        value={values.name}
                        onChange={handleChange}
                        type='text'
                        required={true}
                        className='form__input'
                        placeholder='Enter Book Name'
                    />
                </div>
                <div className='form__group'>
                    <label className='form_lable'></label>
                    <select  onChange={handleChange} className='form__input' name="author" >
                        {
                            users && users.length > 0 && users.map(user => (
                                <option key={user._id} value={user._id}>{user.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='form__group'>
                    <label className='form_lable'></label>
                    <input
                        name ="price"
                        value={values.price}
                        onChange={handleChange}
                        type='number'
                        required={true}
                        placeholder='Enter Book Price'
                        className='form__input'
                    />
                </div>
                <div className='form__group'>
                    <label className='form_lable'></label>
                    <input
                        name ="publishedOn"
                        value={values.publishedOn}
                        onChange={handleChange}
                        type='date'
                        required={true}
                        className='form__input'
                    />
                </div>
                <Button buttonType = "button" type="submit" classess="login__button">CreateBook</Button>
            </form>
        </div>
    </div>
  )
}

export default CreateBook