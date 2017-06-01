import React from 'react';
import { connect } from 'react-redux';
import { 
  Well, Panel, Col, Row, Button, ButtonGroup, Label, Modal 
} from 'react-bootstrap';
import { deleteFromCart, updateCart } from '../../actions/cartActions';

class Cart extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      showModal: false
    };
  }

  open(){
    this.setState({ showModal: true })
  }

  close(){
    this.setState({ showModal: false })
  }

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

  onIncrement(_id){
    this.props.updateCart(_id, 1);
  }

  onDecrement(_id, quantity){
    if(quantity > 1){
      this.props.updateCart(_id, -1);
    }
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
              <h6>qty. <Label bsStyle="success">{ cart.quantity }</Label></h6>
            </Col>
            <Col xs={6} sm={4}>
              <ButtonGroup style={{ minWidth: '300px' }}>
                <Button 
                  onClick={this.onDecrement.bind(this, cart._id, cart.quantity)}
                  bsStyle="default" 
                  bsSize="small">-</Button>
                <Button 
                  onClick={this.onIncrement.bind(this, cart._id)}
                  bsStyle="default" 
                  bsSize="small">+</Button>
                <Button 
                  onClick={this.onDelete.bind(this, cart._id)} 
                  bsStyle="danger" 
                  bsSize="small">Delete</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Panel>
      );
    });
    return (
      <Panel header="Cart" bsStyle="primary">
        { cartItemsList }
        <Row>
          <Col xs={12}>
            <h6>Total Amount: { this.props.totalAmount }$</h6>
            <Button 
              onClick={this.open.bind(this)} 
              bsStyle="success" 
              bsSize="small">CHECKOUT</Button>
          </Col>
        </Row>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Thank you for purchase</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Your order has been saved</h6>
            <h6>You will receive an email confirmation</h6>
          </Modal.Body>
          <Modal.Footer>
            <Col xs={6}>
              <h6>Total Amount: { this.props.totalAmount }$</h6>
            </Col>
            <Button onClick={this.close.bind(this)} bsSize="small">Close</Button>
          </Modal.Footer>
        </Modal>
      </Panel>
    );
  }

  render() {
    if(this.props.cart.length > 0){
      return this.renderCart();
    } else {
      return null;
    }
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart.cart,
    totalAmount: state.cart.totalAmount,
    totalQuantity: state.cart.totalQuantity,
  };
}

export default connect(mapStateToProps, { deleteFromCart, updateCart })(Cart)
