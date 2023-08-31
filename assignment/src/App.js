import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hackernews from './component/Hackernews';
import NavBar from './component/NavBar';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
        <Route path='/' element={<Hackernews />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
