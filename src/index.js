import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Webcam from "react-webcam";
import WebcamCapture from './webCamCapture'
import {Connect , Provider} from 'react-redux'
import {createStore} from 'redux'
import Timer from './Timer.js'

const OPTIONS = {prefix: 'seconds elapsed!', delay: 100}

const inital_state = {
  exists:true,
}



function reducer(state = inital_state, action){
  switch(action.type){
    case "USER_LEFT":
      console.log(action.type)
      return {
        exists:false
      }
    case "USER_HERE":
      console.log(action.type)
      return {
        exists:true
      }
    default:
      return state
  }
}
const store = createStore(reducer)
store.dispatch({type:"USER_LEFT"})


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Timer options={OPTIONS} />
      <WebcamCapture/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
