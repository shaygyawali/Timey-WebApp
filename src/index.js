import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Webcam from "react-webcam";




const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = React.useCallback(() => {
    if (webcamRef && webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot({width: 200, height: 200});
        setImgSrc(imageSrc);
    }
}, [webcamRef, setImgSrc],);

function imgProcess(picture){
  var formdata = new FormData();
formdata.append("file", picture);

var requestOptions = {
  method: 'POST',
  body: formdata,
  mode: 'no-cors'
};
console.log(requestOptions)

fetch("http://127.0.0.1:5000/check_face_exists", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

/*function convertToBlob(imgSrc){
  const byteCharacters = atob(imgSrc)
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i<byteCharacters.length; i++){
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], {type: 'image/jpeg'});
  imgProcess(blob)
}*/
  
useEffect(() => {
  const interval = setInterval(() => {
    capture()
    imgProcess(imgSrc)
  }, 10000);
  return () => clearInterval(interval);
}, []);
 
  

  return (
    <>
    <div className = "cam">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      /> </div>
        <img
          src={imgSrc}></img>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
    <WebcamCapture />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
