import React from 'react';
import { findDOMNode } from 'react-dom';
import { 
  Grid, Panel, FormControl, FormGroup, ControlLabel, Button, DropdownButton, InputGroup, Image, Col, Row, MenuItem
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { 
  createBook, deleteBook, getBooks, resetButton 
} from '../../actions/booksActions';
import axios from 'axios';

class BooksForm extends React.Component {

  constructor(props) {
    super(props);
  
    this.state = {
      images: [],
      img: ''
    };
  }

  componentDidMount() {
    // Get the books list
    this.props.getBooks();

    // Get the images list
    axios.get('/api/books/images')
    .then(res => {
      console.log(res.data);
      this.setState({ images: res.data })
    })
    .catch(err => {
      console.log(err);
    })
  }

  saveBook(){
    const book = [{
      title: findDOMNode(this.refs.title).value,
      description: findDOMNode(this.refs.description).value,
      price: findDOMNode(this.refs.price).value,
      images: findDOMNode(this.refs.image).value,
    }]
    this.props.createBook(book)
  }

  onDeleteBook(){
    let _id = findDOMNode(this.refs.deleteBook).value;
    this.props.deleteBook(_id);
  }

  selectImage(imgName){
    this.setState({ img: `/img/${imgName}` })
  }

  resetForm(){
    this.props.resetButton();
    findDOMNode(this.refs.title).value = '';
    findDOMNode(this.refs.description).value = '';
    findDOMNode(this.refs.price).value = '';
    this.setState({ img: '' });
  }

  render() {

    const booksList = this.props.books.map(book => {
      return <option key={book._id} value={book._id}>{ book.title }</option>
    });

    const imgList = this.state.images.map((img, i) => {
      return (
        <MenuItem 
          key={i} 
          eventKey={img.name}
          onClick={this.selectImage.bind(this, img.name)}>{img.name}
        </MenuItem>
      );
    });

    return (
      <Grid>
        <Row>
          <Col xs={12} sm={6}>
            <Panel>
              <InputGroup>
                <FormControl type="text" ref="image" value={this.state.img} />
                <DropdownButton
                  componentClass={InputGroup.Button}
                  id="input-dropdown-addon"
                  title="Select an Image"
                  bsStyle="primary">
                  { imgList }
                </DropdownButton>
              </InputGroup>
              <Image src={this.state.img} responsive />
            </Panel>
          </Col>

          <Col xs={12} sm={6}>
            <Panel>
              <FormGroup controlId="title" validationState={this.props.validation}>
                <ControlLabel>Title</ControlLabel>
                <FormControl 
                  type="text" 
                  placeholder="Title..."
                  ref="title" />
                <FormControl.Feedback />
              </FormGroup>

              <FormGroup controlId="description" validationState={this.props.validation}>
                <ControlLabel>Description</ControlLabel>
                <FormControl 
                  type="text" 
                  placeholder="Description..."
                  ref="description" />
                <FormControl.Feedback />
              </FormGroup>

              <FormGroup controlId="price" validationState={this.props.validation}>
                <ControlLabel>Price</ControlLabel>
                <FormControl 
                  type="text" 
                  placeholder="Price..."
                  ref="price" />
                <FormControl.Feedback />
              </FormGroup>

              <Button 
                onClick={
                  !this.props.msg ? 
                  this.saveBook.bind(this) : 
                  this.resetForm.bind(this)
                } 
                bsSize="small" 
                bsStyle={ !this.props.style ? 'primary' : this.props.style}>
                { !this.props.msg ? 'Save Book' : this.props.msg}
              </Button>
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
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.books.books,
    msg: state.books.msg,
    style: state.books.style,
    validation: state.books.validation,
  }
}

export default connect(mapStateToProps, { 
  createBook, deleteBook, getBooks, resetButton
})(BooksForm);
