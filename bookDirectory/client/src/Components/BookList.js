import React from 'react'
import { useSelector } from 'react-redux'
import BookItem from './BookItem'
import './bookList.css'



const BookList = () => {
  const {books,error,loading,message} = useSelector(state => state.book)
    return (
    <ul className='book__list'>
        {
            books && books.map(book => {
              return(
              <BookItem
                key={book._id}
                id={book._id}
                name={book.name}
                publishedOn={new Date(book.publishedOn)}
                price={book.price}
                author={book.author}
              />
              )
            })
        }
    </ul>
  )
}

export default BookList