import { 
  GET_BOOKS, DELETE_BOOK, UPDATE_BOOK, CREATE_BOOK, CREATE_BOOK_ERROR, RESET_BUTTON
} from '../actions/types';

const initState = { 
  books: [] 
};

export default (state=initState, action) => {
  switch(action.type){
    case GET_BOOKS: {
      return { ...state, books: [ ...action.payload ] }
    }

    case CREATE_BOOK: {
      return { 
        ...state, 
        books: [...state.books, ...action.payload], 
        msg: 'Saved! click to continue',
        style: 'success',
        validation: 'success',
      };
    }

    case CREATE_BOOK_ERROR: {
      return { 
        ...state, 
        msg: "Please try again", 
        style: 'danger', 
        validation: 'error', 
      };
    }

    case DELETE_BOOK: {
      const bookToDelete = [ ...state.books ];

      const indexToDelete = bookToDelete.findIndex((book) => {
        return book._id == action.payload;
      });

      let books = [ 
        ...bookToDelete.slice(0, indexToDelete),
        ...bookToDelete.slice(indexToDelete + 1)
      ];

      return { ...state, books: books };
    }

    case UPDATE_BOOK: {
      const bookToUpdate = [ ...state.books ];

      const indexToUpdate = bookToUpdate.findIndex((book) => {
        return book._id === action.payload._id;
      });

      const newBookToUpdate = {
        ...bookToUpdate[indexToUpdate],
        title: action.payload.title
      }

      return { books: [ 
        ...bookToUpdate.slice(0, indexToUpdate),
        newBookToUpdate,
        ...bookToUpdate.slice(indexToUpdate + 1)
      ] }
    }

    case RESET_BUTTON: {
      return { ...state, msg: null, style: 'primary', validation: null, };
    }
  }

  return state;
}