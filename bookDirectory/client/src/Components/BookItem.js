import React from 'react'
import Button from './Button';
import './bookItem.css'
import { useDispatch } from 'react-redux';
import { deleteBook, getBooks } from '../feature/bookSlice';

const BookItem = ({name,publishedOn,price,author,id}) => {

    const dispatch = useDispatch()
    const deleteHandle = (id) => {
        dispatch(deleteBook({id}))
        dispatch(getBooks())

    }
  return (
    <li className='book_item'>
        <div className='item__left'>
            <h3>Name: {name}</h3>
            <p className='text'>Published On:{publishedOn.getFullYear()+'-' + (publishedOn.getMonth()+1) + '-'+publishedOn.getDate()}</p>
        </div>
        <div className='item__center'>
            <h3>Price: {price}</h3>
            <p className='text'>Author: {author}</p>
        </div>
        <div className='item__right'>
            <Button buttonType="button" type="submit" click = {() => deleteHandle(id)} classess="deleteButton">
                Delete
            </Button>
        </div>
    </li>
  )
}

export default BookItem