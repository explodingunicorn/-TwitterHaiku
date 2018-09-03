import React from "react";
import styled from "react-emotion";
import colors from "styles/colors";
import { Link } from "react-router-dom";
import { Row, Spacer } from "components/layout";
import TextLoader from "components/textLoader";

const HaikuComponent = styled("div")`
  background-color: white;
  border: 1px solid ${colors.lightGray};
  border-radius: 2px;
  box-shadow: ${colors.shadow};
  padding: 70px 15px 50px 15px;
  position: relative;
`;

const AuthorInfo = styled("div")`
  border-bottom: 2px solid ${colors.lightGray};
  box-sizing: border-box;
  left: 0;
  padding: 12px;
  position: absolute;
  top: 0;
  width: 100%;
  a {
    box-sizing: border-box;
    display: flex;
  }

  div {
    margin: 0 !important;
  }
`;

const picSize = "20px";
const borderRadius = "50%";

const AuthorImg = styled("img")`
  border: 2px solid ${colors.blue};
  border-radius: ${borderRadius};
  box-shadow: ${colors.shadow};
  height: ${picSize};
  margin: 0;
  margin-right: 5px;
  width: ${picSize};
`;

const AuthorPicturePlaceholder = styled("div")`
  background-color: ${colors.lightGray};
  border-radius: ${borderRadius};
  height: ${picSize};
  margin-right: 10px;
  width: ${picSize};
`;

const HaikuText = styled("div")`
  padding: 10px 0;
`;

const Deco = styled("div")`
  background-color: ${props => {
    const score = props.score;
    if (score > 0 && score < 5) return colors.secondaryGreen;
    else if (score >= 5) return colors.mainGreen;
    else if (score < 0 && score > -5) return colors.blue;
    else if (score <= -5) return colors.blueDark;
    else return colors.purple;
  }};
  bottom: 0;
  height: 5px;
  left: 0;
  position: absolute;
  right: 0;
`;

const Haiku = ({ haikuObj }) => {
  const renderHaiku = () => {
    if (haikuObj.haiku) {
      return haikuObj.haiku.map(line => {
        return (
          <p style={{ textAlign: "center" }} key={line}>
            <i>{line}</i>
          </p>
        );
      });
    }
    return (
      <React.Fragment>
        <TextLoader width={80} centered />
        <TextLoader centered />
        <TextLoader width={80} centered />
      </React.Fragment>
    );
  };

  return (
    <HaikuComponent>
      <AuthorInfo>
        <Row align="center">
          {haikuObj.author ? (
            <React.Fragment>
              <a href={haikuObj.authorUrl || ""}>
                <AuthorImg
                  alt={haikuObj.authorImgLink}
                  src={haikuObj.authorImgLink}
                />
              </a>
              <Link to={"/user/" + haikuObj.author}>{haikuObj.author}</Link>
              <Spacer />
              <small>{haikuObj.formattedDate}</small>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <AuthorPicturePlaceholder />
              <TextLoader width={50} />
              <Spacer />
              <TextLoader width={10} />
            </React.Fragment>
          )}
        </Row>
      </AuthorInfo>
      <HaikuText>{renderHaiku()}</HaikuText>
      <Deco score={haikuObj.sentiment || 0} />
    </HaikuComponent>
  );
};

export default Haiku;
