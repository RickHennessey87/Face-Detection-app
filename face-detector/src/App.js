import './App.css';
import React, { useState } from 'react';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import Rank from './components/Rank/Rank'
import ParticlesComponent from './components/Particles/Particles.js';

const returnClarifaiRequestOptions = (imageUrl) => {
  const PAT = '7518cab57a644de2bcff00565425f602';
  const USER_ID = 'rick-hennessey';       
  const APP_ID = 'Face-detector';
  const MODEL_ID = 'face-detection';
  const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
  });
  return {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
  };
}


function App() {
  const [input, setInput] = useState('');

  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  const onButtonSubmit = () => {
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", 
      returnClarifaiRequestOptions(input)
    )
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  }

  return (
    <div className="App">
      <ParticlesComponent id='tsparticles' />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
      { /* <FaceRecognition />} */}
    </div>
  );
}

export default App;
