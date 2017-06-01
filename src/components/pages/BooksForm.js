import React from 'react';
import { findDOMNode } from 'react-dom';
import { 
  Well, Panel, FormControl, FormGroup, ControlLabel, Button 
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { createBook, deleteBook } from '../../actions/booksActions';

class BooksForm extends React.Component {

  saveBook(){
    const book = [{
      title: findDOMNode(this.refs.title).value,
      description: findDOMNode(this.refs.description).value,
      price: findDOMNode(this.refs.price).value,
    }]
    this.props.createBook(book)
  }

  onDeleteBook(){
    let _id = findDOMNode(this.refs.deleteBook).value;
    this.props.deleteBook(_id);
  }

  render() {

    const booksList = this.props.books.map(book => {
      return <option key={book._id} value={book._id}>{ book.title }</option>
    });

    return (
      <Well>
        <Panel>
          <FormGroup controlId="title">
            <ControlLabel>Title</ControlLabel>
            <FormControl 
              type="text" 
              placeholder="Title..."
              ref="title" />
          </FormGroup>

          <FormGroup controlId="description">
            <ControlLabel>Description</ControlLabel>
            <FormControl 
              type="text" 
              placeholder="Description..."
              ref="description" />
          </FormGroup>

          <FormGroup controlId="price">
            <ControlLabel>Price</ControlLabel>
            <FormControl 
              type="text" 
              placeholder="Price..."
              ref="price" />
          </FormGroup>

          <Button 
            onClick={this.saveBook.bind(this)} 
            bsSize="small" 
            bsStyle="primary">Save</Button>
        </Panel>

        <Panel style={{ marginTop: '25px' }}>
          <FormGroup controlId="books">
            <ControlLabel>Select a book to delete</ControlLabel>
            <FormControl 
              componentClass="select" 
              placeholder="Select..."
              ref="deleteBook">
              <option value="select" disabled>Select a book</option>
              { booksList }
            </FormControl>
          </FormGroup>
          <Button
            onClick={this.onDeleteBook.bind(this)}
            bsStyle="danger" 
            bsSize="small">Delete</Button>
        </Panel>
      </Well>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.books.books
  }
}

export default connect(mapStateToProps, { createBook, deleteBook })(BooksForm);
