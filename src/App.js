import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./screens/Home";
import Login from "./screens/Login";
import About from "./screens/About";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Signup from "./screens/Signup";
import { CartProvider } from "./components/ContextReducer";
import MyOrder from "./screens/MyOrder";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/Login" element={<Login />}></Route>
          <Route exact path="/About" element={<About />}></Route>
          <Route exact path="/Signup" element={<Signup />}></Route>
          <Route exact path="/myOrder" element={<MyOrder />}></Route>

        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
