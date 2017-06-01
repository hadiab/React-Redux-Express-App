import React from 'react';
import Menu from './Menu';
import Footer from './Footer';
import { Switch, Route } from 'react-router-dom';
import BooksList from './pages/BooksList';
import Cart from './pages/Cart';
import BooksForm from './pages/BooksForm';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <div>
        <Menu cartItemsNumber={this.props.totalQuantity} />
        <Switch>
          <Route exact path='/' component={BooksList}/>
          <Route path='/admin' component={BooksForm}/>
          <Route path='/cart' component={Cart}/>
        </Switch>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    totalQuantity: state.cart.totalQuantity,
  };
}

export default connect(mapStateToProps)(App);
