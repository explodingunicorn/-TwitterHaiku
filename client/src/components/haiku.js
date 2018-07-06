import React from "react";
import { css } from "emotion";
import colors from "styles/colors";

const Haiku = ({ haikuObj }) => {
  const haikuClass = css({
    border: `1px solid ${colors.lightGray}`,
    borderRadius: "2px",
    boxShadow: colors.shadow,
    padding: "15px"
  });

  const renderHaiku = () => {
    return haikuObj.haiku.map(line => {
      return <p key={line}>{line}</p>;
    });
  };

  const setBackground = () => {
    const score = haikuObj.sentiment.score;
    if (score > 0 && score < 5) return "secondary-green";
    else if (score >= 5) return "main-green";
    else if (score < 0 && score > -5) return "blue";
    else if (score <= -5) return "blue-dark";
    else return "purple";
  };

  return (
    <div className={haikuClass}>
      <div>
        <a href={haikuObj.authorUrl}>
          <img alt="somebs" src={haikuObj.authorImgLink} />
        </a>
      </div>
      <div>{renderHaiku()}</div>
      <div>
        <p>
          <b>On {haikuObj.date}</b>
        </p>
      </div>
    </div>
  );
};

export default Haiku;
