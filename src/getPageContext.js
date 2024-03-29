/**
 * This page was copied from material-ui next.js example
 * @see https://github.com/mui-org/material-ui/blob/master/examples/nextjs/src/getPageContext.js
 */

import { SheetsRegistry } from "jss";
import { createMuiTheme } from "@material-ui/core/styles";
import { createGenerateClassName } from "@material-ui/styles";
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700]
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700]
    }
  },
  typography: {
    useNextVariants: true
  },
  props: {
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true // No more ripple, on the whole application 💣!
    }
  }
});

function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName()
  };
}

let pageContext;

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!pageContext) {
    pageContext = createPageContext();
  }

  return pageContext;
}
