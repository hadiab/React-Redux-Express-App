import axios from 'axios';

import { 
  GET_BOOKS, GET_BOOKS_ERROR, CREATE_BOOK, CREATE_BOOK_ERROR, DELETE_BOOK,
  DELETE_BOOK_ERROR, UPDATE_BOOK, RESET_BUTTON 
} from './types';

export function getBooks(book){
  return (dispatch) => {
    axios.get("/api/books")
    .then((res) => dispatch({ type: GET_BOOKS, payload: res.data }))
    .catch((err) => dispatch({ type: GET_BOOKS_ERROR, payload: "Error" }))
  }
}

export function createBook(book){
  return (dispatch) => {
    axios.post("/api/books", book)
    .then((res) => dispatch({ type: CREATE_BOOK, payload: res.data }))
    .catch((err) => dispatch({ type: CREATE_BOOK_ERROR, payload: "Error" }))
  }
}

export function deleteBook(id){
  return (dispatch) => {
    axios.delete(`/api/books/${id}`)
    .then((res) => dispatch({ type: DELETE_BOOK, payload: id }))
    .catch((err) => dispatch({ type: DELETE_BOOK_ERROR, payload: "Error" }))
  }
}

export function updateBook(book){
  return { type: UPDATE_BOOK, payload: book }
}

export function resetButton(){
  return { type: RESET_BUTTON }
}