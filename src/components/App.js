import React, { Component } from 'react';
import PostForm from './PostForm';
import AllCartStocks from './AllCartStocks';
import CompareStocks from './CompareStocks';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {getStocks} from '../actions/stocksActions';

class App extends Component {
  componentDidMount() {
    this.props.getStocks();
   }

  render() {
    return (
      <div className="App">
        <div className="navbar">
          <h2 className="center ">Stock Exchange</h2>
          </div>
          <CompareStocks />
          <PostForm />
          <AllCartStocks />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stocks: state.stocks,
    loading: state.loading,
    error: state.error,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getStocks: getStocks
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;