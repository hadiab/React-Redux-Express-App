import React from 'react';
import { findDOMNode } from 'react-dom';
import { 
  Well, Panel, FormControl, FormGroup, ControlLabel, Button 
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { createBook } from '../../actions/booksActions';

class BooksForm extends React.Component {

  saveBook(){
    const book = [{
      title: findDOMNode(this.refs.title).value,
      description: findDOMNode(this.refs.description).value,
      price: findDOMNode(this.refs.price).value,
    }]
    this.props.createBook(book)
  }

  render() {
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

          <Button onClick={this.saveBook.bind(this)} bsStyle="primary">Save</Button>
        </Panel>
      </Well>
    );
  }
}

export default connect(null, { createBook })(BooksForm);
