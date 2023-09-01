/* eslint-disable */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Replace Switch with Routes
import App from './App';
import Settings from './Settings'; // Make sure to import your Settings component

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} exact /> {/* Use element instead of component */}
        <Route path="/settings" element={<Settings />} /> {/* Use element instead of component */}
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default RoutesComponent; 