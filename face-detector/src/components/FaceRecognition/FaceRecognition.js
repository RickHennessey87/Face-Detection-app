import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {
  return (
    <div className="center ma">
      <div className="relative mt2">
        { imageUrl && <img id="inputimage" src={imageUrl} alt="" width='500px' height='auto' /> }
        {
          boxes.map((box, i) => {
            return (
              <div 
                key={i} 
                className='bounding-box' 
                style={{
                  top: box.topRow,
                  left: box.leftCol,
                  right: box.rightCol,
                  bottom: box.bottomRow
                }}
              ></div>
            );
          })
        }
      </div>
    </div>
  );
}

export default FaceRecognition;