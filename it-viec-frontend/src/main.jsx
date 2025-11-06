import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css"
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducers from "./reducers/index.jsx";
import "./styles/_keyframe-animations.scss"
import "./styles/_variables.scss"
import Modal from "react-modal";
Modal.setAppElement('#root');
const store = createStore(allReducers);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
