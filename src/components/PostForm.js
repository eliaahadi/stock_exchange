import React, { Component } from 'react';
import { connect } from 'react-redux';
// import {bindActionCreators} from 'redux';

class PostForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      company: "",
      latestStockPrice: "",
    };
    this.handleChange = this.handleChange.bind(this);

  }
  // componentDidMount() {
  //   this.props.getStocks();
  //  }

  async handleChange(event) {
    await this.setState({company: event.target.value});
    console.log("handlechange state -> ", this.state.company)
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
      
    console.log('get latest stock function ', this.state.company, 'stock data ', this.props.stocks.stocks)
    console.log("AAPL  object ", AAPLlatest)
    console.log("GOOGL  object ", GOOGLlatest)
    console.log("AMZN  object ", AMZNlatest)

    if (this.state.company === 'AAPL' && typeof(AAPLlatest)=== 'object' ) {
      await this.setState({latestStockPrice: AAPLlatest.close})
      console.log('returned AAPL value', this.state.company, AAPLlatest.close, this.state.latestStockPrice)
      return AAPLlatest.close;
    }
    if (this.state.company === 'GOOGL' && typeof(GOOGLlatest)=== 'object' ) {
      await this.setState({latestStockPrice: GOOGLlatest.close})
      console.log('returned GOOGL value', this.state.company, GOOGLlatest.close , this.state.latestStockPrice)
      return GOOGLlatest.close;
    }
    if (this.state.company === 'AMZN' && typeof(AMZNlatest)=== 'object' ) {
      await this.setState({latestStockPrice: AMZNlatest.close})
      console.log('returned AMZN value', this.state.company, AMZNlatest.close, this.state.latestStockPrice)
      return AMZNlatest.close;
    }
  }

  // getLatestStocks(company) {
    // let AAPLlatest;
    // if (this.props.stocks.stocks[0].historical) {
    //   AAPLlatest = new Date(Math.max.apply(null, this.props.stocks.stocks[0].historical.map(function(e) {
    //     return new Date(e.MeasureDate);
    //   })));
    // }
    // AAPL = this.props.stocks.stocks[0].historical.filter(obj => {
    //   return obj.date === this.state.setDate;
    // })
  //   let AAPLdate, AAPLlatest;
  //   let GOOGLdate, GOOGLlatest;
  //   let AMZNdate, AMZNlatest;

  //   if (this.state.company) {
  //     AAPLdate = new Date(Math.max.apply(null, this.props.stocks.stocks[0].historical.map(function(e) {
  //       return new Date(e.date);
  //     })));
  //     AAPLlatest = this.props.stocks.stocks[0].historical.filter( e => { 
  //       var d = new Date( e.date ); 
  //       return d.getTime() === AAPLdate.getTime();
  //     })[0];

  //     GOOGLdate = new Date(Math.max.apply(null, this.props.stocks.stocks[1].historical.map(function(e) {
  //       return new Date(e.date);
  //     })));
  //     GOOGLlatest = this.props.stocks.stocks[1].historical.filter( e => { 
  //       var d = new Date( e.date ); 
  //       return d.getTime() === GOOGLdate.getTime();
  //     })[0];

  //     AMZNdate = new Date(Math.max.apply(null, this.props.stocks.stocks[2].historical.map(function(e) {
  //       return new Date(e.date);
  //     })));
  //     AMZNlatest = this.props.stocks.stocks[2].historical.filter( e => { 
  //       var d = new Date( e.date ); 
  //       return d.getTime() === AMZNdate.getTime();
  //     })[0];
  //   }
      
  //   console.log('get latest stock function ', company, 'stock data ', this.props.stocks.stocks)
  //   console.log("AAPL  object ", AAPLlatest)
  //   console.log("GOOGL  object ", GOOGLlatest)
  //   console.log("AMZN  object ", AMZNlatest)

  //   if (this.state.company === 'AAPL' && typeof(AAPLlatest)=== 'object' ) {
  //     console.log('returned AAPL value', AAPLlatest.close)
  //     this.setState({latestStockPrice: AAPLlatest.close})
  //     return AAPLlatest.close;
  //   }
  //   if (this.state.company === 'GOOGL' && typeof(GOOGLlatest)=== 'object' ) {
  //     console.log('returned GOOGL value', GOOGLlatest.close)
  //     this.setState({latestStockPrice: GOOGLlatest.close})
  //     return GOOGLlatest.close;
  //   }
  //   if (this.state.company === 'AMZN' && typeof(AMZNlatest)=== 'object' ) {
  //     console.log('returned AMZN value', AMZNlatest.close)
  //     this.setState({latestStockPrice: AMZNlatest.close})
  //     return AMZNlatest.close;
  //   }
  // }
   
  handleSubmit = (e) => {
    e.preventDefault();
    const title = this.state.company;
    const message = this.state.latestStockPrice;
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
    // this.setState({company: ''});
    // this.setState({latestStockPrice: ''});
  }

  render() {
    const { stocks } = this.props;
 
    console.log('post form this.props ', this.props)
    if (stocks.loading) {
      return <div></div>;

    }

    // console.log('loading state  ', stocks.loading)
    // let AAPLdate, AAPLlatest;
    // let GOOGLdate, GOOGLlatest;
    // let AMZNdate, AMZNlatest;

    // if (this.state.company) {
    //   AAPLdate = new Date(Math.max.apply(null, this.props.stocks.stocks[0].historical.map(function(e) {
    //     return new Date(e.date);
    //   })));
    //   AAPLlatest = this.props.stocks.stocks[0].historical.filter( e => { 
    //     var d = new Date( e.date ); 
    //     return d.getTime() === AAPLdate.getTime();
    //   })[0];

    //   GOOGLdate = new Date(Math.max.apply(null, this.props.stocks.stocks[1].historical.map(function(e) {
    //     return new Date(e.date);
    //   })));
    //   GOOGLlatest = this.props.stocks.stocks[1].historical.filter( e => { 
    //     var d = new Date( e.date ); 
    //     return d.getTime() === GOOGLdate.getTime();
    //   })[0];

    //   AMZNdate = new Date(Math.max.apply(null, this.props.stocks.stocks[2].historical.map(function(e) {
    //     return new Date(e.date);
    //   })));
    //   AMZNlatest = this.props.stocks.stocks[2].historical.filter( e => { 
    //     var d = new Date( e.date ); 
    //     return d.getTime() === AMZNdate.getTime();
    //   })[0];
    // }
    // console.log('filter latest data AAPL',  AAPLdate, AAPLlatest)
    // console.log('filter latest data GOOGL',  GOOGLdate, GOOGLlatest)
    // console.log('filter latest data AMZN',  AMZNdate, AMZNlatest)

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
      {/* <div>{this.getLatestStocks(this.state.company)}</div> */}
      <div>{this.state.latestStockPrice}</div>
      {/* {AAPLlatest && <div> {AAPLlatest.close}</div> } */}
      {/* {GOOGLlatest && <div> {GOOGLlatest.close}</div> }
      {AMZNlatest && <div> {AMZNlatest.close}</div> } */}
      {/* <input required type="text" ref={(input) => this.getTitle = input}
        placeholder="Enter Stock Title" 
      />
        <br /><br />
      <textarea required rows="5" ref={(input) => this.getMessage = input}
        cols="28" placeholder="Enter Stock" 
      />
        <br /><br /> */}
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

// function mapDispatchToProps(dispatch){
//   return bindActionCreators({
//     getStocks: getStocks
//   }, dispatch)
// }


export default connect(mapStateToProps)(PostForm);
