import React from 'react';
import Menu from './Menu';
import Footer from './Footer';
import { BrowserRouter, Route } from 'react-router-dom'
import BooksList from './pages/BooksList';
import Cart from './pages/Cart';
import BooksForm from './pages/BooksForm';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Menu cartItemsNumber={this.props.totalQuantity} />
          <Route exact path='/' component={BooksList}/>
          <Route exact path='/admin' component={BooksForm}/>
          <Route path='/cart' component={Cart}/>
          <Route path='/about' component={Cart}/>
          <Route path='/contact' component={Cart}/>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    totalQuantity: state.cart.totalQuantity,
  };
}

export default connect(mapStateToProps)(App);
