import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/presentation/board/Board.jsx'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import styles from './styles/styles.scss';
import { chessGame } from './reducers.js';

const store = createStore(chessGame);
window.store = store;
ReactDOM.render(
  <Provider store={store}>
    <Board/>
  </Provider>,
  document.getElementById('main'));