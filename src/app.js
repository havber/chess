import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/presentation/board/Board.jsx'
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import {initialState} from './initialState.js';
import styles from './styles/styles.scss';
import {chessGame} from './reducers.js';

const logger = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd(action.type);
  return result
};

const middleware = [
  logger,
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(chessGame, initialState, enhancers);
ReactDOM.render(
  <div>
    <Provider store={store}>
      <Board/>
    </Provider>
  </div>,
  document.getElementById('main')
);
