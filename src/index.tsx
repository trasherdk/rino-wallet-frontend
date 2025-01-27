import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import {Provider as ReduxProvider} from "react-redux";
import App from "./App";
import {store} from "./store";
import "./yupSettings";
import "./assets/fonts/lato.css";
import "./assets/fonts/catamaran.css";
import "./assets/styles.css";

const env = process.env.NODE_ENV;
const INTEGRITY_METADATA = (window as any).INTEGRITY_METADATA;

console.log("env: ", env)

// We run the application only after we check service_worker.js integrity
window.addEventListener("load", () => {
  if (env === "development") {
    runApp();
  } else {
    fetch(process.env.PUBLIC_URL + "/service_worker.js", {
      method: "GET",
      integrity: INTEGRITY_METADATA["service_worker.js"],
    }).then(() => {
      if ("serviceWorker" in navigator) {
        const swUrl = `${process.env.PUBLIC_URL}/service_worker.js`;
        navigator.serviceWorker.register(swUrl, { scope: "/" })
          .then(() => {
            console.log("Registration succeeded.");
            // pass INTEGRITY_METADATA to webworker
            navigator.serviceWorker.controller?.postMessage({ type: "metadata", payload: INTEGRITY_METADATA });
            runApp();
            return navigator.serviceWorker.ready;
          }).catch(() => {
            alert("SW registration failed.");
          });
      }
    }, () => {
      alert("Try refreshing the page. If the problem persists please contact support@rino.io");
    });
  }
});

function runApp(): void {
  ReactDOM.render(
    <React.StrictMode>
      <ReduxProvider store={store}>
        <Router>
          <App />
        </Router>
      </ReduxProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
}
