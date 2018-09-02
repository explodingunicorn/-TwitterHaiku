import React from "react";
import ReactDOM from "react-dom";
import { injectGlobal } from "emotion";
import colors from "styles/colors";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Open+Sans:400,400i,700');

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
`;

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
