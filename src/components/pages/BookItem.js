import React from 'react';
import { Well, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addToCart } from '../../actions/cartActions';

export class BookItem extends React.Component {

  sendToCart(){
    const book = [...this.props.cart, {
      _id: this.props.book._id,
      title: this.props.book.title,
      description: this.props.book.description,
      price: this.props.book.price
    }]
    this.props.addToCart(book);
  }

  render() {
    const { book } = this.props;
    return (
      <Well>
        <Row>
          <Col xs={12}> 
            <h6>{ book.title }</h6>
            <p>{ book.description }</p>
            <h6>usd. { book.price }</h6>
            <Button 
              onClick={this.sendToCart.bind(this)} 
              bsStyle="primary">Buy Now</Button>
          </Col>
        </Row>
      </Well>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart
  };
}

export default connect(mapStateToProps, { addToCart })(BookItem);
