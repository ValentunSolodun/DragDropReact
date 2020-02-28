import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'materialize-css/dist/css/materialize.min.css';
import App from './App';

// import Login from './components/login/login'
// import Register from './components/register/register'
// import { Route, Router } from 'react-router-dom';
// import { history } from "./helpers/history";

import * as serviceWorker from './serviceWorker';
// import {composeWithDevTools} from 'redux-devtools-extension';
// import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react-redux'
// import rootReducer from './reducers'
// import {applyMiddleware, createStore} from "redux";
// import rootSaga from "./sagas";
import {DndProvider} from "react-dnd-cjs";
import HTML5Backend from "react-dnd-html5-backend-cjs";
import {store} from "./store";

// const sagaMiddleware = createSagaMiddleware();
// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))
// sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <App/>
    </DndProvider>
  </Provider>,
  document.getElementById('root'));

serviceWorker.unregister();
