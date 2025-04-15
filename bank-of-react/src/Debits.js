/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import React, { Component } from "react";
import { Link } from "react-router-dom";
import AccountBalance from "./AccountBalance";

class Debits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      amount: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // Validate input
    if (
      !this.state.description ||
      !this.state.amount ||
      isNaN(this.state.amount)
    ) {
      alert("Please enter a valid description and amount");
      return;
    }

    this.props.addDebit({
      description: this.state.description,
      amount: parseFloat(this.state.amount),
    });

    // Clear form
    this.setState({
      description: "",
      amount: "",
    });
  };

  render() {
    return (
      <div>
        <h1>Debits</h1>

        <AccountBalance accountBalance={this.props.accountBalance} />

        <h2>Add Debit</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={this.state.amount}
              onChange={this.handleChange}
              step="0.01"
              min="0"
              required
            />
          </div>
          <button type="submit">Add Debit</button>
        </form>

        <h2>Debits List</h2>
        <ul>
          {this.props.debits.map((debit) => (
            <li key={debit.id}>
              <div>Description: {debit.description}</div>
              <div>Amount: ${debit.amount.toFixed(2)}</div>
              <div>Date: {debit.date}</div>
            </li>
          ))}
        </ul>

        <Link to="/">Return to Home</Link>
      </div>
    );
  }
}

export default Debits;
