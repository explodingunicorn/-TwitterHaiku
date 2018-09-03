import React from "react";
import ReactDOM from "react-dom";
import { injectGlobal } from "emotion";
import colors from "styles/colors";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

injectGlobal`
  body, html {
    min-height: 100%;
  }

  h1, h2, h3, h4 {
      color: ${colors.black};
      margin: 1.414em 0 0.5em;
      font-family: 'Montserrat', sans-serif;
      font-weight: inherit;
      line-height: 1.2;
  }
    
  h1 {
      margin-top: 0;
      font-size: 3.998em;
      font-weight: 700;
  }
    
  h2 {
      font-size: 2.827em;
  }
    
  h3 {
      font-size: 1.999em;
  }
    
  h4 {
      font-size: 1.414em;
  }

  p {
      font-family: 'Open Sans';
      font-size: 18px;
  }

  a {
      color: ${colors.blue};
      font-family: 'Open Sans';
      font-weight: 700;
      text-decoration: none;
  }

  small {
    color: ${colors.black};
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
  }
`;

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
