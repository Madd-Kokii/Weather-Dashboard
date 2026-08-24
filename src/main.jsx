import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//createRoot tells react where to render the app in the DOM/browsers. It takes a DOM element as an argument, which is usually a div with an id of root. This is the entry point for the React application, and it allows React to take control of that part of the DOM and manage its updates efficiently.

import App from "./App.jsx";
//the main container for the entire application. It serves as the root component that encapsulates all other components and manages the overall structure and flow of the app. By importing App, we can render it within the root element of the DOM, allowing React to control and update the UI based on state changes and user interactions.

import "./index.css";
//for stylinig for now there is none.

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
  //For allowing me to find problems in the app, I can use StrictMode to highlight potential problems in an application. It activates additional checks and warnings for its descendants. It does not render any visible UI.
);