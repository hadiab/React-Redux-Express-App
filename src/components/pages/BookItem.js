import React from 'react';
import { Well, Row, Col, Button, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addToCart, updateCart } from '../../actions/cartActions';

export class BookItem extends React.Component {

  sendToCart(){
    const book = [...this.props.cart, {
      _id: this.props.book._id,
      title: this.props.book.title,
      description: this.props.book.description,
      price: this.props.book.price,
      quantity: 1,
    }];
    // Check if the cart empty
    if(this.props.cart.length > 0){
      let _id = this.props.book._id;
      let cartIndex = this.props.cart.findIndex((cart) => {
        return cart._id === _id;
      });
      // Check if the book exist in the cart
      if(cartIndex === -1){
        this.props.addToCart(book);
      } else {
        // Update the quantity
        this.props.updateCart(_id, 1, this.props.cart);
      }
    } else {
      this.props.addToCart(book);
    }
  }

  render() {
    const { book } = this.props;
    return (
      <Well>
        <Row>
          <Col xs={12}> 
            <Image src={book.images} responsive />
            <h6><strong>{ book.title }</strong></h6>
            <p>{ book.description }</p>
            <h6>usd. { book.price }</h6>
            <Button 
              onClick={this.sendToCart.bind(this)} 
              bsStyle="primary" bsSize="small">Buy Now</Button>
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

export default connect(mapStateToProps, { addToCart, updateCart })(BookItem);
