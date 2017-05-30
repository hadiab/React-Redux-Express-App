const initState = { books: [] };

export default (state=initState, action) => {
  switch(action.type){
    case 'POST_BOOK': {
      return { books: [...state.books, ...action.payload] };
    }
    case 'DELETE_BOOK': {
      const bookToDelete = [ ...state.books ];

      const indexToDelete = bookToDelete.findIndex((book) => {
        return book.id === action.payload.id;
      });

      return { books: [ 
        ...bookToDelete.slice(0, indexToDelete),
        ...bookToDelete.slice(indexToDelete + 1)
      ] }
    }
    case 'UPDATE_BOOK': {
      const bookToUpdate = [ ...state.books ];

      const indexToUpdate = bookToUpdate.findIndex((book) => {
        return book.id === action.payload.id;
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