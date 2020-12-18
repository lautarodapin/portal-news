import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import RoomList from "./RoomList";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql/',
  credentials:'same-origin',
});

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
		<ApolloProvider client={client}>
			<HomePage />
		</ApolloProvider>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
