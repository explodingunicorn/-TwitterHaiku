import React from 'react';
import './haiku.style.scss';

const Haiku = ({haikuObj}) => {
    console.log(haikuObj);

    const renderHaiku = () => {
        return haikuObj.haiku.map((line) => {
            return <p key={line}>{line}</p>
        });
    }

    return (
        <div className="haiku-container">
            <div className="haiku-deco"></div>
            {renderHaiku()}
        </div>
    );
}

export default Haiku;