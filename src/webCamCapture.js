import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Webcam from "react-webcam";
import { connect } from 'react-redux';



const WebcamCapture = (props) => {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [blob , setBlob] = React.useState(null);

  const capture = React.useCallback(() => {
    if (webcamRef && webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
  
    }
}, [webcamRef, setImgSrc],);

function imgProcess(picture){
  console.log(picture)
  const formdata = new FormData()
  formdata.append('file' , picture)

  var requestOptions = {
    method: 'POST',
    body: formdata,
  };

  fetch("http://127.0.0.1:5000/check_face_exists", requestOptions)
  .then((response)=> response.json())
  .then((response) => {
      if(!response.face_exists){
          props.dispatch({type:"USER_LEFT"})
      }
      else{
          props.dispatch({type:"USER_HERE"})
      }
  })
  .catch((err) => {
    console.log("error" + err)
  })
}

function convertToBlob(imgSrc){
  const byteCharacters = atob(imgSrc)
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i<byteCharacters.length; i++){
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], {type: 'image/jpeg'});
  setBlob(blob)
}
  
useEffect(() => {
  const interval = setInterval(() => {
    capture()
  }, 10000);
  return () => clearInterval(interval);
}, []);

 useEffect(()=>{
   if(imgSrc != null){
    var base_64_string = imgSrc.split(';')[1].split(',')[1]
    convertToBlob(base_64_string)
   }
  },[imgSrc]);
  
 useEffect(()=>{
   console.log("inside imgprocess effect")
   imgProcess(blob)
 } , [blob])

  return (
    <>
    <div className = "cam">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      /> </div>
    </>
  );
};
const mapStatetoProps = (state) =>({
    exists: state.exists
})
export default connect(mapStatetoProps) (WebcamCapture); 