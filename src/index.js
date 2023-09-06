import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import {
  Navbar,
  Register,
  Login,
  Profile,
  Homepage,
  Products,
  Footer,
  AdminDashboard,
  Cart,
} from "./components";

const stripePromise = loadStripe(
  "pk_test_51NkzIOAVE3vEHYrbJdPRjQRMIxyakUy1R7YDGROCugM5T2Idi6GedvBcK8BZcW3Qu1wGNFz2YS2JUUs8wJsADbjk00GSSnTZbi"
);
const App = () => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar token={token} setToken={setToken} />
        {/* <SearchBar /> */}
        <Routes>
          <Route
            path="/Register"
            element={<Register setToken={setToken} setLoading={setLoading} />}
          />
          <Route
            path="/Login"
            element={<Login setToken={setToken} setLoading={setLoading} />}
          />
          <Route path="/Admin" element={<AdminDashboard />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/" element={<Homepage setLoading={setLoading} />} />
          <Route
            path="/Products"
            element={<Products setLoading={setLoading} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

ReactDOM.render(
  <Elements stripe={stripePromise}>
    <App />{" "}
  </Elements>,
  document.getElementById("app")
);
