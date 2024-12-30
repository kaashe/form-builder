import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormDesigner from "./components/FormDesigner";
import Login from "./components/Login";
import SplashScreen from "./components/SplashScreen";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/create-form" element={<FormDesigner />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
