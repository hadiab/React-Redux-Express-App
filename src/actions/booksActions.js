const POST_BOOK   = 'POST_BOOK';
const DELETE_BOOK = 'DELETE_BOOK';
const UPDATE_BOOK = 'UPDATE_BOOK';

export function createBook(book){
  return {
    type: 'POST_BOOK',
    payload: book
  }
}

export function updateBook(book){
  return {
    type: 'UPDATE_BOOK',
    payload: book
  }
}

export function deleteBook(id){
  return {
    type: 'DELETE_BOOK',
    payload: id
  }
}