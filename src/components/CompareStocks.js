import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {getStocks} from '../actions/stocksActions';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class CompareStocks extends Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment().toDate(),
      setDate: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    let main = moment(this.state.startDate).format("YYYY-MM-DD")
    this.setState({
      setDate: main
    })
  }

  render() {
    const { error, stocks } = this.props;
    let AAPL, GOOGL, AMZN;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (stocks.loading) {
      return <div><p className="post_message">Loading Stock Data...</p> </div>;
    }

    if (this.state.setDate) {
      AAPL = this.props.stocks.stocks[0].historical.filter(obj => {
        return obj.date === this.state.setDate;
      })
      GOOGL = this.props.stocks.stocks[1].historical.filter(obj => {
        return obj.date === this.state.setDate;
      })
      AMZN = this.props.stocks.stocks[2].historical.filter(obj => {
        return obj.date === this.state.setDate;
      })
    } 

    return (
      <div>
        <h1 className="post_heading">Compare Stocks</h1>
        <form onSubmit={ this.handleSubmit }>
          <div className="form">
            <label>Select Date: </label>
            <DatePicker
              selected={ this.state.startDate }
              onChange={ (event) =>this.handleChange(event) }
              dateFormat="yyyy-MM-dd"
              className="datepicker"
            />
          </div>
          <div className="form">
            <button>Compare stocks</button>
          </div>
        </form>

      <div className="post_message">
        {AAPL && AAPL[0] ? <div>AAPL {AAPL[0].close}</div> : <div>No AAPL data</div>}
        {GOOGL && GOOGL[0] ? <div>GOOGL {GOOGL[0].close}</div> : <div>No GOOGL data</div>}
        {AMZN && AMZN[0] ? <div>AMZN {AMZN[0].close}</div> : <div>No AMZN data</div>}
      </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(CompareStocks);