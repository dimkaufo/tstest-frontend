import * as React from "react";
import * as ReactDOM from "react-dom";
import {createGlobalStyle} from "styled-components";
import {normalize} from "styled-normalize";

import {
    initStore,
    initHistory,
} from "config/setup";

import AppRoot from "AppRoot";

const history = initHistory();
const store = initStore(history);

const GlobalStyles = createGlobalStyle`
  ${normalize}

  html, body, #br-root {
     height: 100%;
     width: 100%;  
  }
`

ReactDOM.render(
    <React.Fragment>
        <GlobalStyles />
        <AppRoot
            history={history}
            store={store}
        />
    </React.Fragment>,
    document.getElementById("br-root")
);