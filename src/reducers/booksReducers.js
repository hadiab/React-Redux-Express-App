import { 
  GET_BOOKS, DELETE_BOOK, UPDATE_BOOK, CREATE_BOOK 
} from '../actions/booksActions';

const initState = { 
  books: [
    {
      _id: 1, 
      title: 'Harry Potter', 
      description: 'New book was added since 1998',
      price: 33.90
    },
    {
      _id: 2, 
      title: 'Node js', 
      description: 'Node js Book 2011',
      price: 70.00
    },
  ] 
};

export default (state=initState, action) => {
  switch(action.type){
    case GET_BOOKS: {
      return { ...state, books: [ ...state.books ] }
    }

    case CREATE_BOOK: {
      return { books: [...state.books, ...action.payload] };
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
  }
  return state;
}