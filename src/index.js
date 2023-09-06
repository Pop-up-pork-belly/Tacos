import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
<<<<<<< HEAD
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import {
  Navbar,
=======
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";


import {
  Navbar,
  // Loading,
>>>>>>> Development
  Register,
  // Login,
  Profile,
  Homepage,
  Products,
<<<<<<< HEAD
  Footer,
  AdminDashboard,
  Cart,
} from "./components";

const stripePromise = loadStripe(
  "pk_test_51NkzIOAVE3vEHYrbJdPRjQRMIxyakUy1R7YDGROCugM5T2Idi6GedvBcK8BZcW3Qu1wGNFz2YS2JUUs8wJsADbjk00GSSnTZbi"
);
=======
  Footer, 
  AdminDashboard,
  Cart
} from "./components";

// import Products from "./components/Products";

const stripePromise = loadStripe('pk_test_51NkzIOAVE3vEHYrbJdPRjQRMIxyakUy1R7YDGROCugM5T2Idi6GedvBcK8BZcW3Qu1wGNFz2YS2JUUs8wJsADbjk00GSSnTZbi')
>>>>>>> Development
const App = () => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

<<<<<<< HEAD
  return (
    <div className="app">
      <BrowserRouter>
=======
  return (<div className="app">
    <BrowserRouter>
>>>>>>> Development
        <Navbar token={token} setToken={setToken} />
        {/* <SearchBar /> */}
        <Routes>
          {/* <Route
            path="/Register"
            element={<Register setToken={setToken} setLoading={setLoading} />}
<<<<<<< HEAD
          />
          <Route
            path="/Login"
            element={<Login setToken={setToken} setLoading={setLoading} />}
          />
          <Route path="/Admin" element={<AdminDashboard />} />
          <Route path="/Cart" element={<Cart />} />
=======
          /> */}
          {/* <Route path="/Search" element={<Search />} />
          <Route
            path="/Login"
            element={<Login setToken={setToken} setLoading={setLoading} />}
          /> */}
          <Route path="/Admin" element ={<AdminDashboard />} />
          <Route path="/Cart" element ={<Cart />} />
>>>>>>> Development
          <Route path="/Profile" element={<Profile />} />
          <Route path="/" element={<Homepage setLoading={setLoading} />} />
          <Route path="/Products" element={<Products setLoading={setLoading} />} />
        </Routes>
        <Footer />
<<<<<<< HEAD
      </BrowserRouter>
=======
    </BrowserRouter>
>>>>>>> Development
    </div>
  );
};

<<<<<<< HEAD
ReactDOM.render(
  <Elements stripe={stripePromise}>
    <App />{" "}
  </Elements>,
  document.getElementById("app")
);
=======
ReactDOM.render(  <Elements stripe={stripePromise}><App/> </Elements>, document.getElementById("app"));

>>>>>>> Development
