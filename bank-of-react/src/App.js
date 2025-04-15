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

class App extends Component {
  constructor() {
    // Create and initialize state
    super();
    this.state = {
      accountBalance: 1234567.89,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: "Joe Smith",
        memberSince: "11/22/99",
      },
    };
  }

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
              element={<Credits credits={this.state.creditList} />}
            />
            <Route
              path="/debits"
              element={<Debits debits={this.state.debitList} />}
            />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
