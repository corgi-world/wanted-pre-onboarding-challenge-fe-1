import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing:border-box;
    outline:none;
    border:none;
  }
  body {
    background-color: #fafafa;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyles;
