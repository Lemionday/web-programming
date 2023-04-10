import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
// import SignInSide from "./components/Signin";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Dashboard />}/> */}
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/notfound" element={<NotFound />} />
        {/* <Route path="/signin" element={<SignInSide />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;