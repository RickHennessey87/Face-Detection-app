import './App.css';
import React, { useState } from 'react';
import Navigation from './components/Navigation/Navigation'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import Rank from './components/Rank/Rank'
import ParticlesComponent from './components/Particles/Particles.js';

const returnClarifaiRequestOptions = (imageUrl) => {
  const PAT = 'YOUR_PERSONAL_ACCESS_TOKEN'; 
  const USER_ID = 'rick-hennessey';       
  const APP_ID = 'Face-detector';
  const MODEL_ID = 'face-detection';

  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": imageUrl
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
  const [imageUrl, setImageUrl] = useState('');
  const [boxes, setBoxes] = useState([]);

  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  const calculateFaceLocations = (regions) => {
    // Each region contains a bounding box.
    // Here, you could transform these into pixel values if needed.
    return regions.map(region => {
      const boundingBox = region.region_info.bounding_box;
      return {
        topRow: boundingBox.top_row * 100 + '%',
        leftCol: boundingBox.left_col * 100 + '%',
        bottomRow: (1 - boundingBox.bottom_row) * 100 + '%',
        rightCol: (1 - boundingBox.right_col) * 100 + '%'
      };
    });
  }

  const onButtonSubmit = () => {
    setImageUrl(input); // Set the image URL from input to display in FaceRecognition
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnClarifaiRequestOptions(input))
      .then(response => response.json())
      .then(result => {
        if (result.outputs[0].data.regions) {
          const regions = result.outputs[0].data.regions;
          const faceBoxes = calculateFaceLocations(regions);
          setBoxes(faceBoxes);
        }
      })
      .catch(error => console.log('error', error));
  }

  return (
    <div className="App">
      <ParticlesComponent id='tsparticles' />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
      <FaceRecognition imageUrl={imageUrl} boxes={boxes} />
    </div>
  );
}

export default App;
