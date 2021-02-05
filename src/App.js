import React, {useState, useEffect, useRef} from 'react';
import { BrowserRouter as Router, Route, useLocation } from 'react-router-dom'
import './style.scss';

function App() {
  return (
    <Router>
      <Route path="/">
        <QueryApp/>
      </Route>
    </Router>
  );
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const QueryApp = () => {
  return (
    <>
      <div class="container">
        
      </div>
    </>
  )
}

export default App;
