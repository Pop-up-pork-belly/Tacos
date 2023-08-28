import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <BrowserRouter>
      <div className="app">
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
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
