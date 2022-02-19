import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

import './App.css';
import './assets/scss/style.scss';
import ReactGA from 'react-ga';


const history = createBrowserHistory();


const TRACKING_ID = "G-GCKSC9SEBL"; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);



ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
