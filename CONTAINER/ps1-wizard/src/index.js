import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { PromptProvider } from "./context/promptContext";
import "./index.css";

const Root = () => {
  return (
    <PromptProvider>
      <App />
    </PromptProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
