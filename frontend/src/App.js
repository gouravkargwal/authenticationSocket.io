import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { io } from 'socket.io-client';
import Photos from './components/Photos';
import Login from './components/Login';
import Register from './components/Register';
import UploadPhoto from './components/UploadPhoto';

function App() {
  const socket = io.connect('http://localhost:8000');
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" component={<Login socket={socket} />} />
          <Route path="/register" component={<Register socket={socket} />} />
          <Route path="/photos" component={<Photos socket={socket} />} />
          <Route
            path="/photo/upload"
            component={<UploadPhoto socket={socket} />}
          />
          <Route path="*" component={<h1>404 Not Found!</h1>} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
