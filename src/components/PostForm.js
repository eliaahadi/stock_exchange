import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class PostForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      company: "",
      latestStockPrice: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(event) {
    await this.setState({company: event.target.value});
    let AAPLdate, AAPLlatest;
    let GOOGLdate, GOOGLlatest;
    let AMZNdate, AMZNlatest;

    if (this.state.company) {
      AAPLdate = new Date(Math.max.apply(null, this.props.stocks.stocks[0].historical.map(function(e) {
        return new Date(e.date);
      })));
      AAPLlatest = this.props.stocks.stocks[0].historical.filter( e => { 
        var d = new Date( e.date ); 
        return d.getTime() === AAPLdate.getTime();
      })[0];

      GOOGLdate = new Date(Math.max.apply(null, this.props.stocks.stocks[1].historical.map(function(e) {
        return new Date(e.date);
      })));
      GOOGLlatest = this.props.stocks.stocks[1].historical.filter( e => { 
        var d = new Date( e.date ); 
        return d.getTime() === GOOGLdate.getTime();
      })[0];

      AMZNdate = new Date(Math.max.apply(null, this.props.stocks.stocks[2].historical.map(function(e) {
        return new Date(e.date);
      })));
      AMZNlatest = this.props.stocks.stocks[2].historical.filter( e => { 
        var d = new Date( e.date ); 
        return d.getTime() === AMZNdate.getTime();
      })[0];
    }
      
    if (this.state.company === 'AAPL' && typeof(AAPLlatest)=== 'object' ) {
      await this.setState({latestStockPrice: AAPLlatest.close})
    }
    if (this.state.company === 'GOOGL' && typeof(GOOGLlatest)=== 'object' ) {
      await this.setState({latestStockPrice: GOOGLlatest.close})
    }
    if (this.state.company === 'AMZN' && typeof(AMZNlatest)=== 'object' ) {
      await this.setState({latestStockPrice: AMZNlatest.close})
    }
  }
   
  handleSubmit = (e) => {
    e.preventDefault();
    const title = this.state.company;
    const stockNumber = this.getStockNumber.value;
    const stockCalculation = stockNumber * this.state.latestStockPrice;
    if (stockCalculation >= 1000000) {
      alert('You cannot buy over $1,000,000 amount')
      return;
    } 
    let currentDate = new Date();
    let dayOfWeek = moment(currentDate).day();
    let currentTime = moment(currentDate).hour();

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      alert('Today is a weekend day, you cannot when market is closed, only Monday to Friday from 0900 to 1500')
      return;
    }
    if (currentTime <= 9  || currentTime >= 15) {
      alert('Now the market when market is closed, only Monday to Friday from 0900 to 1500')
      return;
    }
    const message = stockCalculation.toFixed(2);
    
    const data = {
      id: new Date(),
      title,
      message,
      editing: false
    }
    this.props.dispatch({
      type: 'ADD_TO_CART',
      data
    })
    this.getStockNumber.value = '';
  }

  render() {
    const { stocks } = this.props;
 
    if (stocks.loading) {
      return <div></div>;
    }

    return (
    <div className="post-container">
      <h1 className="post_heading">Buy Stock</h1>
      <form className="form" onSubmit={this.handleSubmit} >
      <label>
          Choose company to get latest stock price:
          <select value={this.state.company} onChange={this.handleChange}>
            <option value="AAPL">Apple</option>
            <option value="GOOGL">Google</option>
            <option value="AMZN">Amazon</option>
          </select>
        </label>
      <div>{this.state.company}</div>
      <div>{this.state.latestStockPrice}</div>
      <input required type="text" ref={(input) => this.getStockNumber = input}
        placeholder="Enter amount of stocks you want" 
      />
      <button>Buy</button>
      </form>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    stocks: state.stocks,
    loading: state.loading,
  }
}

export default connect(mapStateToProps)(PostForm);
