if (import.meta.env.MODE === "development") {
  const { worker } = await import("./mocks/browser");
  worker.start();
}

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
