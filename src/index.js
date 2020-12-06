import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

let accessToken  = localStorage.getItem("userData")
if(accessToken){
  accessToken = JSON.parse(accessToken).authDetails.access_token;
  axios.defaults.headers.common["x-access-token"] = accessToken;
}
console.log('value of access token', accessToken)

axios.defaults.baseURL = 'https://lawyerppenterprise.herokuapp.com/api';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
