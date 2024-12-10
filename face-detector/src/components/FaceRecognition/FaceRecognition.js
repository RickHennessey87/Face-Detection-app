import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {
  return (
    <div className="center">
      <div className="relative">
        { imageUrl && <img id="inputimage" src={imageUrl} alt="" width='500px' height='auto' /> }
        {
            boxes.map((box, i) => {
                return (
                    <div 
                        key={i} 
                        className='bounding-box'
                        style={{
                            top: box.topRow + 'px',
                            left: box.leftCol + 'px',
                            width: box.width + 'px',
                            height: box.height + 'px'
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