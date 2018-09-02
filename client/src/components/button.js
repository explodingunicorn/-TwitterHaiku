import styled from "react-emotion";
import colors from "styles/colors";

const types = {
  action: {
    normal: colors.mainGreen,
    hover: colors.secondaryGreen
  }
};

const Button = styled("button")`
  background-color: ${props => {
    return types[props.type].normal;
  }};
  border: none;
  border-radius: 2px;
  color: white;
  cursor: pointer;
  font-family: "Montserrat";
  font-size: 16px;
  font-weight: 600;
  padding: 10px 20px;
  text-transform: uppercase;
  transition: all 0.4s;

  &:hover {
    background-color: ${props => {
      return types[props.type].hover;
    }};
  }
`;

export default Button;
