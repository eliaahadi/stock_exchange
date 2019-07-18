import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';
import Edit from './Edit';

class AllCartStocks extends Component {
  render() {
    return (
      <div>
        <h1 className="post_heading">AllCartStocks</h1>
        {this.props.cart.cart.map((cart) => (
          <div key={cart.id}>
            {cart.editing ? <Edit cart={cart} key={cart.id} /> : <Post cart={cart}
            key={cart.id} />}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state
  }
}

export default connect(mapStateToProps)(AllCartStocks);
