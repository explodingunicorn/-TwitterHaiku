import React from "react";
import { css } from "emotion";
import colors from "styles/colors";

const haikuClass = css({
  backgroundColor: 'white',
  border: `1px solid ${colors.lightGray}`,
  borderRadius: "2px",
  boxShadow: colors.shadow,
  padding: "30px 15px 50px 15px",
  position: 'relative'
});

const Haiku = ({ haikuObj }) => {
  const renderHaiku = () => {
    return haikuObj.haiku.map(line => {
      return <p style={{textAlign: 'center'}} key={line}><i>{line}</i></p>;
    });
  };

  const setBackground = () => {
    const score = haikuObj.sentiment.score;
    if (score > 0 && score < 5) return colors.secondaryGreen;
    else if (score >= 5) return colors.mainGreen;
    else if (score < 0 && score > -5) return colors.blue;
    else if (score <= -5) return colors.blueDark;
    else return colors.purple;
  };

  const decoClass = css({
    backgroundColor: setBackground(),
    bottom: 0,
    height: '5px',
    left: 0,
    position: 'absolute',
    right: 0
  })

  return (
    <div className={haikuClass}>
      <div style={{textAlign: 'center'}}>
        <a style={{display: 'block'}} href={haikuObj.authorUrl}>
          <img alt="somebs" src={haikuObj.authorImgLink} />
        </a>
        <a href={"https://twitter.com/" + haikuObj.author} target="_blank">@{haikuObj.author}</a>
      </div>
      <div style={{padding: '10px 0'}}>{renderHaiku()}</div>
      <div className={decoClass}/>
    </div>
  );
};

export default Haiku;
