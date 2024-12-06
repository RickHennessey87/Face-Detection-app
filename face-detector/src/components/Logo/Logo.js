import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import silly from './silly.png'

const Logo = () => {
    return (
        <div className="absolute top-0 left-0 ma4 mt0">
            <Tilt className="Tilt">
                <div style={{ height: '150px', width: '150px' }}>
                    <h1 className="pa3"><img style={{paddingTop: '5px'}} src={silly} alt='logo'/></h1>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;