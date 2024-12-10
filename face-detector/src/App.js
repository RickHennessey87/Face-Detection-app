import './App.css';
import React, { useState } from 'react';
import Navigation from './components/Navigation/Navigation.js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import Rank from './components/Rank/Rank.js'
import ParticlesComponent from './components/Particles/Particles.js';

function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [boxes, setBoxes] = useState([]);

  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  const calculateFaceLocations = (regions) => {
  const image = document.getElementById('inputimage');
  const width = image.clientWidth;
  const height = image.clientHeight;

  console.log('Image displayed size:', width, height); // Debug logging

  return regions.map(region => {
    const boundingBox = region.region_info.bounding_box;
    const boxWidth = (boundingBox.right_col - boundingBox.left_col) * width;
    const boxHeight = (boundingBox.bottom_row - boundingBox.top_row) * height;

    console.log('Bounding box fractions:', boundingBox); // Debug logging
    console.log('Calculated box in px:', {
      left: boundingBox.left_col * width,
      top: boundingBox.top_row * height,
      width: boxWidth,
      height: boxHeight
    });

    return {
      leftCol: boundingBox.left_col * width,
      topRow: boundingBox.top_row * height,
      width: boxWidth,
      height: boxHeight
    };
  });
};

  const onButtonSubmit = () => {
    setImageUrl(input); // Set the image URL from input to display in FaceRecognition
    fetch('http://localhost:5001/clarifai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl: input })
    })
      .then(response => response.json())
      .then(result => {
        console.log('Clarifai API response:', result);

        if (result.outputs && result.outputs[0].data && result.outputs[0].data.regions) {
          const regions = result.outputs[0].data.regions;
          console.log('Detected Regions:', regions);
          const faceBoxes = calculateFaceLocations(regions);
          setBoxes(faceBoxes);
        } else {
          // No faces detected or unexpected response
          setBoxes([]);
          console.log('No faces found or unexpected response:', result);
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
