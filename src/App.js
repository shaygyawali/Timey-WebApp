import Timer from './Timer.js';
import Webcam from 'react-webcam'
import React, {Component, PropTypes} from 'react';
import logo from './logo.svg';
import './App.css';


const OPTIONS = {prefix: 'seconds elapsed!', delay: 100}




function App() {
  return (

    <div class="App">
      <div class = "holder1">
      <svg class="blob" data-name="top right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 285.71 350.15"><defs>
        </defs>
        <path class="cls-1" 
        d="M163.14,295.1a217.63,217.63,0,0,0,16.43,70.76c8.28,19.66,16.42,38.27,34.57,47.25,6,3,9,2.88,17.28,7,3.45,1.72,18.13,9.64,32,26.25a114.56,114.56,0,0,1,19,32.38c5.92,15.79,3.94,22,12.1,41.13,5.57,13.09,9.39,17,12.1,19.25,8.54,7.1,18.46,8,25.93,8.75a61.37,61.37,0,0,0,28.52-3.5c14.83-5.77,23.38-16.53,34.58-30.63,13-16.3,13-22.05,22.47-28,10.61-6.68,22.46-6.93,30.74-6.12V295.1Z" 
        transform="translate(-163.14 -295.1)"/>
      </svg>
      </div>
      </div>

  );
}

export default App;
