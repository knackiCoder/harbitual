import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { createStore } from "redux";

import reducer from './reducers';
import middleware from './middleware';
import App from './App';


const store = createStore(reducer, middleware)


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

export default store;

