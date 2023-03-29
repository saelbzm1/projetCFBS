import React from 'react';
import logo from './logo.png';
import './App.css';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Heading, Button } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

async function getTodos() {
  const response = await API.graphql(graphqlOperation(listTodos));
  console.log(response);
}

const listTodos = `query {
  listTodos {
    items {
      id name description completed
    }
  }
}`;

function App({ signOut, user }) {
  return (
    <div className="App">
      <Button onClick={signOut}>Sign out</Button>
      <Button onClick={getTodos}>Get Todos</Button>
      <header>
        <img src={logo} className="" alt="logo" />
        <h1>Canon France Business Services</h1>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
