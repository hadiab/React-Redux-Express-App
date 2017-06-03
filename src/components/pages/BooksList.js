import React from 'react';
import { connect } from 'react-redux';
import { getBooks } from '../../actions/booksActions';
import { Grid, Row, Col, Well } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import BookItem from './BookItem';
import Cart from './Cart';

class BooksList extends React.Component {

  componentDidMount() {
    this.props.getBooks();
  }

  render() {
    const booksList = this.props.books.map(book => {
      return (
        <Col xs={12} sm={6} md={4} key={book._id}>
          <BookItem book={book} />
        </Col> 
      );
    });

    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <Well>
              <Link to="/admin" className={'btn btn-primary'}>Create Book</Link>
            </Well>
          </Col>
        </Row>
        <Row>
          <Cart />
        </Row>
        <Row>
          { booksList }
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.books.books
  }
}

export default connect(mapStateToProps, { getBooks })(BooksList);
