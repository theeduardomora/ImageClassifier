//import logo from './logo.svg';
//import './App.css';
<<<<<<< HEAD
import React, {useEffect, useState} from "react"; 
import * as tf from "@tensorflow/tfjs";
import './index.css'



const mobilenet= require('@tensorflow-models/mobilenet');



function App() {

  const [hasPhoto, setHasPhoto] = useState(false);
  const [showResults, setShowResults] = useState(false); 
  

  var class1 =""; 
  var class2 = ""; 
  var class3 = ""; 

  var prob1 = 0; 
  var prob2 = 0; 
  var prob3 = 0; 

 

  const closePhoto = () => { 
    //let photo = photoRef.current; 
    //let ctx = photo.getContext('2d'); 

    //ctx.clearRect(0, 0, photo.width, photo.height); 

    setHasPhoto(false); 
    setShowResults(false);

  }


  const analyzePhoto = () => { 
    
    
    var canvas = document.getElementById("preview");
    
    const model = mobilenet.load();
      

      model.then(function (res) {
        const predictions = res.classify(canvas);
       
        predictions.then((preds) => { 
          console.log('Predictions: ');
          console.log(preds);
          class1 = preds[0].className; 
          class2 = preds[1].className; 
          class3 = preds[2].className;
          
          prob1 = preds[0].probability; 
          prob2 = preds[1].probability; 
          prob3 = preds[2].probability;
          
          prob1 = Math.round((prob1 + Number.EPSILON) * 100000) / 100000;
          prob2 = Math.round((prob2 + Number.EPSILON) * 100000) / 100000; 
          prob3 = Math.round((prob3 + Number.EPSILON) * 100000) / 100000; 

          setShowResults(true); 

          document.getElementById("class1").innerHTML = '' + class1 + ' :  ' + prob1 + "%";  
          document.getElementById("class2").innerHTML = '' + class2 + ' :  ' + prob2 + "%"; 
          document.getElementById("class3").innerHTML = '' + class3 + ' : ' + prob3  + "%";
        }); 
        
    }, function (err) {
        alert(err);
    });

    

  }

 

 

  useEffect(() => {
    var preview = document.getElementById("preview"); 
    var fileTag = document.getElementById("filetag"); 
        
    fileTag.addEventListener("change", function() {
      changeImage(this);
    });

  })

  

function changeImage(input) {

  var preview = document.getElementById("preview");
  var fileTag = document.getElementById("filetag");
  var displayimg = document.getElementById("displayimg");
  var reader;

  if (input.files && input.files[0]) {
    reader = new FileReader();

    reader.onload = function(e) {
      preview.setAttribute('src', e.target.result);
      displayimg.setAttribute('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }

  setHasPhoto(true); 
}

  return (

    <div className="App">
      
        <h1 style={{textAlign: 'center'}}>Image Classifier </h1>
        <br/>
        <h4 style={{textAlign: 'center'}}> Simple Web implementation of <a href="https://github.com/tensorflow/tfjs-models/tree/master/mobilenet">Tensorflow JS Mobilenet Image Classifier.</a> </h4>
        <h4 style={{textAlign: 'center'}}> 1000 hardcoded classses are used to determine the label of an image. 
             This model works best with animals, foods, and common objects. 
        </h4>
        <br/>
        <h4 style={{textAlign: 'center'}}>Simply click the 'Browse' button to upload a photo, then click 'Analyze' for the model to make its prediction. </h4> 
        <input type="file"  id="filetag"/>
      

      <div className={'result ' + (hasPhoto ? 'hasPhoto' : '')}>
      

      <button onClick={closePhoto} className='Reset'> Reset </button>
      <button onClick={analyzePhoto}> Analyze </button>
      
        <div className='imageandlabel'> 
        <img src="" id="preview"/>
        <img src="" id="displayimg"/>
        <div className={'analyzed ' + (showResults ? 'true':'')}> 
        <h3 id="class1"> Label 1 and Prob 1 </h3>
        <h3 id="class2"> Label 2 and Prob 2 </h3>  
        <h3 id="class3"> Label 3 and Prob 3 </h3>
        
        </div>
        </div>

      </div>

      

=======
import React, {useRef, useEffect, useState} from "react"; 


function App() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);

  const getVideo = () => { 
    navigator.mediaDevices.getUserMedia(
      { video: {width: 500, height:750}})
    .then(stream => {
      let video = videoRef.current; 
      video.srcObject = stream;
      video.play(); 
    })
    .catch(err => {
      console.error(err);
    })
  }

  const takePhoto = () => { 
      const width = 414; 
      const height = width * (16/9);
      let video = videoRef.current; 
      let photo = photoRef.current; 

      photo.width = width; 
      photo.height = height; 

      let ctx = photo.getContext('2d'); 
      ctx.drawImage(video, 0, 0, width, height); 
      setHasPhoto(true); 
  }

  const closePhoto = () => { 
    let photo = photoRef.current; 
    let ctx = photo.getContext('2d'); 

    ctx.clearRect(0, 0, photo.width, photo.height); 

    setHasPhoto(false); 


  }

  useEffect(() => {
    getVideo();
  }, [videoRef])

  return (
    <div className="App">
      <div className="camera">
        <video ref={videoRef}> </video>
        <button onClick={takePhoto}> Snap </button>
      </div>
      <div className={'result ' + (hasPhoto ? 'hasPhoto' : '')}>
        <canvas ref={photoRef}> </canvas>
        <button onClick={closePhoto}> Close </button>
      </div>
>>>>>>> 7c39e51c227bbc3cffef2f3e082e8968fb351816
    </div>
  );
}

export default App;
