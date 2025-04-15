/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import React, { Component } from "react";
import { Link } from "react-router-dom";
import AccountBalance from "./AccountBalance";

class Credits extends Component {
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

    this.props.addCredit({
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
      <div className="container">
        <h1>Credits</h1>

        <AccountBalance accountBalance={this.props.accountBalance} />

        <h2>Add Credit</h2>
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
          <button type="submit">Add Credit</button>
        </form>

        <h2>Credits List</h2>
        <ul>
          {this.props.credits.map((credit) => (
            <li key={credit.id}>
              <div>Description: {credit.description}</div>
              <div>Amount: ${credit.amount.toFixed(2)}</div>
              <div>Date: {credit.date}</div>
            </li>
          ))}
        </ul>

        <Link to="/">Return to Home</Link>
      </div>
    );
  }
}

export default Credits;
