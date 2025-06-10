import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f5f5f5;
  }

  #root {
    min-height: 100vh;
  }

  @media (max-width: 768px) {
    html {
      font-size: 93.75%; /* 15px */
    }
  }

  @media (max-width: 480px) {
    html {
      font-size: 87.5%; /* 14px */
    }
  }
`;
