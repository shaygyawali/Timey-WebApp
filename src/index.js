import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import WebcamCapture from './webCamCapture'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import Timer from './Timer.js'
import update from 'immutability-helper'


const OPTIONS = {prefix: 'seconds elapsed!', delay: 100}

const inital_state = {
  exists:true,
  user_upset:false
}

function reducer(state = inital_state, action){
  switch(action.type){
    case "USER_LEFT":
        return {
          exists:false,
          user_upset:false
        }
    case "USER_HERE":
      return {
        exists:true,
        user_upset:false
      }
    case "USER_UPSET":
      console.log("user upset")
      return {
        exists:state.exists,
        user_upset:true
      }
    case "USER_HAPPY":
      console.log("user")
      return {
        exists:state.exists,
        user_upset:false
      }

    default:
      return state
  }
}
const store = createStore(reducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Timer options={OPTIONS}/>
      <WebcamCapture/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
