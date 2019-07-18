import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Post from './Post';
import Edit from './Edit';
import {getStocks} from '../actions/stocksActions';

class AllStocks extends Component {
  componentDidMount() {
    let stocklist = this.props.getStocks();
    console.log('\n stock list ->', stocklist)
  }
  render() {
    return (
      <div>
        <h1 className="post_heading">All Stocks</h1>
        {this.props.stocks.map((stock) => (
          <div key={stock.id}>
            {stock.editing ? <Edit stock={stock} key={stock.id} /> : <Post stock={stock}
            key={stock.id} />}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stocks: state
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getStocks: getStocks
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AllStocks);