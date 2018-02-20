import React from 'react';
import './haiku.style.scss';

const Haiku = ({haikuObj}) => {
    console.log(haikuObj);

    const renderHaiku = () => {
        return haikuObj.haiku.map((line) => {
            return <p key={line}>{line}</p>
        });
    }

    const setBackground = () => {
        const score = haikuObj.sentiment.score;
        if (score > 0 && score < 5)
            return 'secondary-green';
        else if (score >= 5)
            return 'main-green';
        else if (score < 0 && score > -5)
            return 'blue';
        else if (score <= -5)
            return 'blue-dark';
        else
            return 'purple';
    }

    return (
        <div className="haiku-container">
            <div className={"haiku-deco " + setBackground()}>
                {/* <a href={haikuObj.authorUrl}>@{haikuObj.author}</a> */}
            </div>
            <div className="img-container">
                <a href={haikuObj.authorUrl}>
                    <img src={haikuObj.authorImgLink}/>
                </a>
            </div>
            <div className="haiku">
                {renderHaiku()}
            </div>
            <div className="date">
                <p><b>On {haikuObj.date}</b></p>
            </div>
        </div>
    );
}

export default Haiku;