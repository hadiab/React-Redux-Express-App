import React from 'react';
import { connect } from 'react-redux';
import { Well, Panel, Col, Row, Button, ButtonGroup, Label } from 'react-bootstrap';
import { deleteFromCart } from '../../actions/cartActions';

class Cart extends React.Component {

  onDelete(_id){
    const cartToDelete = this.props.cart;

    const indexToDelete = cartToDelete.findIndex((book) => {
      return book._id === _id;
    });

    let cartAfterDelete = [ 
      ...cartToDelete.slice(0, indexToDelete),
      ...cartToDelete.slice(indexToDelete + 1)
    ];

    this.props.deleteFromCart(cartAfterDelete);
  }

  renderCart(){
    const cartItemsList = this.props.cart.map(cart => {
      return (
        <Panel key={cart._id}>
          <Row>
            <Col xs={12} sm={4}>
              <h6>{ cart.title }</h6>
            </Col>
            <Col xs={12} sm={2}>
              <h6>usd. { cart.price }</h6>
            </Col>
            <Col xs={12} sm={2}>
              <h6>qty. <Label bsStyle="success"></Label></h6>
            </Col>
            <Col xs={6} sm={4}>
              <ButtonGroup style={{ minWidth: '300px' }}>
                <Button bsStyle="default" bsSize="small">-</Button>
                <Button bsStyle="default" bsSize="small">+</Button>
                <Button onClick={this.onDelete.bind(this, cart._id)} bsStyle="danger" bsSize="small">Delete</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Panel>
      );
    });
    return (
      <Panel header="Cart" bsStyle="primary">
        { cartItemsList }
      </Panel>
    );
  }

  render() {
    if(this.props.cart[0]){
      return this.renderCart();
    } else {
      return null;
    }
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart.cart
  };
}

export default connect(mapStateToProps, { deleteFromCart })(Cart)
