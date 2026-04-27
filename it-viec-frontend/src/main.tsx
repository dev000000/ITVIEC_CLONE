import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./styles/_keyframe-animations.scss";
import "./styles/_variables.scss";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
Modal.setAppElement("#root");
createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <App />
      <ToastContainer/>
    </BrowserRouter>
);
