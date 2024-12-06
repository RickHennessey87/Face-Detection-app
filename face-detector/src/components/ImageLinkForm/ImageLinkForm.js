import React from "react";
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <div>
                <p className="f3">
                    {'Give us an image and we will detect faces!'}
                </p>
            </div>
            <div className='form pa4 br3 shadow-3 center flex items-center'>
                <input className='f4 pa2 w-70 center' type='text' placeholder="copy & paste image here" onChange={onInputChange}/>
                <button 
                    className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
                    onClick={onButtonSubmit}
                >Detect</button>
            </div>
        </div>
    );
}

export default ImageLinkForm;