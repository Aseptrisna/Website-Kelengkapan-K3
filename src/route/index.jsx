import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../page/index';
import Detail from '../page/detailPage';

function RoutePage() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:username" element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default RoutePage;
