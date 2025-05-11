// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FindLandForm from './FindLandForm';
import Contact from './Contact';
import Estimate from './Estimate';
import Find from './Find';
import Agent from './Agent';
import AgentPlan from './AgentPlan';
function App() {
  return (
    <Router>
   

      <Routes>
        <Route path="/" element={<FindLandForm />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/AgentPlan" element={<AgentPlan />} />
        <Route path="/estimate" element={<Estimate />} />
        <Route path="*" element={<Find />} />
        <Route path="/Agent" element={<Agent/>} />
      </Routes>
    </Router>
  );
}

const styles = {
  nav: {
    display: 'flex',
    gap: '1rem',
    padding: '1rem',
    background: '#f5f5f5',
    borderBottom: '1px solid #ddd',
  },
  link: {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: '#333',
  },
};

export default App;
