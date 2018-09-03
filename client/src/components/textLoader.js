import styled, { keyframes } from "react-emotion";
import colors from "styles/colors";

const fadeAnim = keyframes`
  0% {
    background-color: ${colors.lightGray};
  }

  50% {
    background-color: ${colors.mediumGray};
  }

  100% {
    background-color: ${colors.lightGray};
  }
`;

const TextLoader = styled("div")`
  background-color: ${colors.lightGray};
  border-radius: ${props => (props.large ? "15px" : "7px")};
  animation: ${fadeAnim} 2.5s infinite ease-in-out;
  height: ${props => (props.large ? "30px" : "18px")};
  margin: ${props => {
    return props.centered ? "0 auto" : 0;
  }};
  margin-bottom: ${props => (!props.noMgn ? "25px" : 0)};
  width: ${props => {
    return props.width ? props.width + "%" : "100%";
  }};
`;

export default TextLoader;
