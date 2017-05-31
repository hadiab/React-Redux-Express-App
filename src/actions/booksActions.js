export const GET_BOOKS   = 'GET_BOOKS';
export const CREATE_BOOK = 'CREATE_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';
export const UPDATE_BOOK = 'UPDATE_BOOK';

export function getBooks(book){
  return { type: GET_BOOKS }
}

export function createBook(book){
  return {
    type: CREATE_BOOK,
    payload: book
  }
}

export function updateBook(book){
  return {
    type: UPDATE_BOOK,
    payload: book
  }
}

export function deleteBook(id){
  return {
    type: DELETE_BOOK,
    payload: id
  }
}