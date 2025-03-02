import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { Toaster } from "sonner";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Toaster/>
      <App />
    </Provider>
  </BrowserRouter>
);
