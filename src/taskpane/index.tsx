import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-chat-elements/dist/main.css";

/* global document, Office, module, require, HTMLElement */

const title = "Contoso Task Pane Add-in";

// Initialize MSAL instance with configuration

const rootElement: HTMLElement | null = document.getElementById("container");
const root = rootElement ? createRoot(rootElement) : undefined;

/* Render application after Office initializes */
Office.onReady(() => {
  root?.render(
    <FluentProvider theme={webLightTheme}>
      <App />
    </FluentProvider>
  );
});

if ((module as any).hot) {
  (module as any).hot.accept("./App", () => {
    const NextApp = require("./App").default;
    root?.render(
      <FluentProvider theme={webLightTheme}>
        <NextApp />
      </FluentProvider>
    );
  });
}
