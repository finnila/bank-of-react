/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import other components
import Home from "./Home";
import UserProfile from "./UserProfile";
import LogIn from "./Login";
import Credits from "./Credits";
import Debits from "./Debits";
import AccountBalance from "./AccountBalance";

class App extends Component {
  constructor() {
    // Create and initialize state
    super();
    this.state = {
      accountBalance: 0,
      credits: [],
      debits: [],
      currentUser: {
        userName: "Joe Smith",
        memberSince: "11/22/99",
      },
    };
  }

  // Lifecycle method - fetch data from API endpoints
  async componentDidMount() {
    try {
      // Fetch credits and debits data from API
      const creditsResponse = await fetch(
        "https://johnnylaicode.github.io/api/credits.json"
      );
      const debitsResponse = await fetch(
        "https://johnnylaicode.github.io/api/debits.json"
      );

      const credits = await creditsResponse.json();
      const debits = await debitsResponse.json();

      // Calculate account balance
      const creditsSum = credits.reduce(
        (total, credit) => total + credit.amount,
        0
      );
      const debitsSum = debits.reduce(
        (total, debit) => total + debit.amount,
        0
      );
      const accountBalance = (creditsSum - debitsSum).toFixed(2);

      // Update state with fetched data and calculated balance
      this.setState({
        credits,
        debits,
        accountBalance,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Add a new credit
  addCredit = (newCredit) => {
    // Create a new credit object with current date
    const credit = {
      id: this.state.credits.length + 1,
      description: newCredit.description,
      amount: parseFloat(newCredit.amount),
      date: new Date().toISOString().slice(0, 10), // Format: YYYY-MM-DD
    };

    // Update credits array and account balance
    const updatedCredits = [...this.state.credits, credit];
    const creditsSum = updatedCredits.reduce(
      (total, credit) => total + credit.amount,
      0
    );
    const debitsSum = this.state.debits.reduce(
      (total, debit) => total + debit.amount,
      0
    );
    const accountBalance = (creditsSum - debitsSum).toFixed(2);

    this.setState({
      credits: updatedCredits,
      accountBalance,
    });
  };

  // Add a new debit
  addDebit = (newDebit) => {
    // Create a new debit object with current date
    const debit = {
      id: this.state.debits.length + 1,
      description: newDebit.description,
      amount: parseFloat(newDebit.amount),
      date: new Date().toISOString().slice(0, 10), // Format: YYYY-MM-DD
    };

    // Update debits array and account balance
    const updatedDebits = [...this.state.debits, debit];
    const creditsSum = this.state.credits.reduce(
      (total, credit) => total + credit.amount,
      0
    );
    const debitsSum = updatedDebits.reduce(
      (total, debit) => total + debit.amount,
      0
    );
    const accountBalance = (creditsSum - debitsSum).toFixed(2);

    this.setState({
      debits: updatedDebits,
      accountBalance,
    });
  };

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  };

  // Create Routes and React elements to be rendered using React components
  render() {
    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router>
        <div>
          <Routes>
            <Route
              path="/"
              element={<Home accountBalance={this.state.accountBalance} />}
            />
            <Route
              path="/userProfile"
              element={
                <UserProfile
                  userName={this.state.currentUser.userName}
                  memberSince={this.state.currentUser.memberSince}
                />
              }
            />
            <Route
              path="/login"
              element={
                <LogIn
                  user={this.state.currentUser}
                  mockLogIn={this.mockLogIn}
                />
              }
            />
            <Route
              path="/credits"
              element={
                <Credits
                  credits={this.state.credits}
                  addCredit={this.addCredit}
                  accountBalance={this.state.accountBalance}
                />
              }
            />
            <Route
              path="/debits"
              element={
                <Debits
                  debits={this.state.debits}
                  addDebit={this.addDebit}
                  accountBalance={this.state.accountBalance}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
