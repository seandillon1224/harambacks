import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from './router/AppRouter';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { ThemeProvider } from 'styled-components';

const Theme = {
  mediumBlue: '#343C7A',
  lighestBlue: '#7A81B9',
  lightBlue: '#525B98',
  darkBlue: '#1C235A',
  darkestBlue: '#0B113B',
  font: 'Roboto, sans-serif',
};

const client = new ApolloClient({
  uri: 'https://harambacks.herokuapp.com/api',
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={Theme}>
      <AppRouter />
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
