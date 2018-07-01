// import React, { Component } from 'react';
const React = require('react');

import { Router, Link } from '@reach/router';

const App = () => (
  <div>
    <h1>This is HTML hydrated into React</h1>
    <nav>
      <Link to="/">Home</Link> <Link to="dashboard">Dashboard</Link> <Link to="invoices">Invoices</Link>
    </nav>

    <Router>
      <Home path="/" />
      <Dashboard path="/dashboard" />
      <Invoices path="invoices">
        <InvoicesIndex path="/" />
        <Invoice path=":invoiceId" />
      </Invoices>
      <NotFound default />
    </Router>
  </div>
);

const Home = () => (
  <div>
    <h2>Welcome</h2>
  </div>
);

const Dashboard = () => (
  <div>
    <h2>ROUTING WORKS</h2>
  </div>
);

const Invoice = props => (
  <div>
    <h2>Invoice {props.invoiceId}</h2>
  </div>
);

const Invoices = props => (
  <div>
    <h2>DYANMIC ROUTING TOO</h2>
    <ul>
      <li>
        <Link to="/invoices/123">Invoice 123</Link>
      </li>
      <li>
        <Link to="/invoices/abc">Invoice ABC</Link>
      </li>
    </ul>

    <form
      onSubmit={event => {
        event.preventDefault();
        const id = event.target.elements[0].value;
        event.target.reset();

        // pretend like we saved a record to the DB here
        // and then we navigate imperatively
        props.navigate(id);
      }}
    >
      <p>
        <label>
          New Invoice ID: <input type="text" />
        </label>
        <button type="submit">create</button>
      </p>
    </form>

    {props.children}
  </div>
);

const InvoicesIndex = () => (
  <div>
    <p>Maybe put some pretty graphs here or something.</p>
  </div>
);

const NotFound = () => <p>Sorry, nothing here</p>;

export default App;
