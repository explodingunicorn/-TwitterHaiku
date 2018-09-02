import styled from "react-emotion";
import colors from "styles/colors";

const Input = styled("input")`
  border: 1px solid ${colors.lightGray};
  border-radius: 2px;
  font-family: "Open Sans";
  font-size: 16px;
  flex: 1;
  padding: 10px;

  &:focus {
    border-color: ${colors.mainGreen};
    box-shadow: ${colors.shadow};
  }
`;

export default Input;
