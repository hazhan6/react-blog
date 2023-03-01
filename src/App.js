import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/storeConfig/store.js";
import Navbar from "./navbar/navbar";
import Routing from "./router/Router.js";

function App() {
  return (
    <Provider store={store}>
      <Navbar/>
      <Routing/>
    </Provider>
  );
}

export default App;
