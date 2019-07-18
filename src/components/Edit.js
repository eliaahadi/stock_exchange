
import React, { Component } from 'react';
import { connect } from 'react-redux';


class Edit extends Component {
  handleEdit = (e) => {
    e.preventDefault();
    const newTitle = this.getTitle.value;
    const newMessage = this.getMessage.value;
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
        <input required type="text" ref={(input) => this.getTitle = input}
          defaultValue={this.props.cart.title} placeholder="Enter Stock Title" 
        />
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
