
import React, { Component } from 'react';
import { connect } from 'react-redux';


class Edit extends Component {
  handleEdit = (e) => {
    e.preventDefault();
    const newTitle = this.props.cart.title;
    if (this.getMessage.value >= 1000000 || this.getMessage.value <= 0) {
      alert('You can only buy from $1 to $1,000,000 amount')
      return;
    } 
    if (!parseInt(this.getMessage.value)) {
      alert('Input a valid number range from $1 to $1,000,000')
      return;
    }
    console.log('input type ', parseInt(this.getMessage.value))

    const newMessageInput = parseInt(this.getMessage.value);
    const newMessage = newMessageInput.toFixed(2);
    
    const data = {
      newTitle,
      newMessage
    }
    this.props.dispatch({ type: 'UPDATE_CART', id: this.props.cart.id, data: data })
  }

  render() {
    return (
    <div key={this.props.cart.id} className="post">
      <form className="form" onSubmit={this.handleEdit}>
        <div>{this.props.cart.title}</div>
          <br /><br />
        <textarea required rows="5" ref={(input) => this.getMessage = input}
          defaultValue={this.props.cart.message} cols="28" placeholder="Enter Stock" 
        />
          <br /><br />
        <button>Update</button>
      </form>
    </div>
    );
  }
}

export default connect()(Edit);
