import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';


import {
  Navbar,
  Loading,
  Register,
  Login,
  Profile,
  Homepage,
  Products,
  Search,
  SearchBar,
} from "./components";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const stripe = loadStripe('pk_test_51NkzIOAVE3vEHYrbJdPRjQRMIxyakUy1R7YDGROCugM5T2Idi6GedvBcK8BZcW3Qu1wGNFz2YS2JUUs8wJsADbjk00GSSnTZbi')

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="app">
    <BrowserRouter>
        <Navbar token={token} setToken={setToken} />
        <SearchBar />
        <Routes>
          <Route
            path="/Register"
            element={<Register setToken={setToken} setLoading={setLoading} />}
          />
          <Route path="/Search" element={<Search />} />
          <Route
            path="/Login"
            element={<Login setToken={setToken} setLoading={setLoading} />}
          />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/" element={<Homepage setLoading={setLoading} />} />
          <Route
            path="/Products"
            element={<Products setLoading={setLoading} />}
          />
        </Routes>
        {loading ? <Loading /> : null}
    </BrowserRouter>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
