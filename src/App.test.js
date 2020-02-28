import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {DndProvider} from "react-dnd-cjs";
import HTML5Backend from "react-dnd-html5-backend-cjs";
import {Provider} from "react-redux";
import {store} from "./store";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <App/>
      </DndProvider>
    </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
