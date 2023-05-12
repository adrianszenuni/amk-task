import React, { Fragment } from 'react';

import { Routes, Route} from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';

import './App.css';

function App() {
  return (
    <Fragment>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    </Fragment>
  );
}

export default App;
