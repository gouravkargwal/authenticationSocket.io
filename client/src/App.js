import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";
import Photos from "./components/Photos";
import Login from "./components/Login";
import Register from "./components/Register";
import UploadPhoto from "./components/UploadPhoto";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const socket = io.connect("http://localhost:8000");
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login socket={socket} />} />
          <Route path="/register" element={<Register socket={socket} />} />
          <Route path="/photos" element={<Photos socket={socket} />} />
          <Route
            path="/photo/upload"
            element={<UploadPhoto socket={socket} />}
          />
          <Route path="*" element={<h1>404 Not Found!</h1>} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
