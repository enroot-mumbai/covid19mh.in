import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'

// components
import BlogList from './components/BlogList';
import AddBlog from './components/AddBlog';

// apollo client set up
const client = new ApolloClient({
  uri: '/graphql'
})

function App() {
  return (
    <ApolloProvider client = { client } >
      <div id="App" className="row">
        <div className="col s12">
          <h1>Let everyone know...</h1>
          <p><i>Help Us Create Awareness by sharing your story!</i></p>
        </div>
        <AddBlog />
        <BlogList />
      </div>
    </ApolloProvider>
  );
}

export default App;
