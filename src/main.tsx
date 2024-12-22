import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css'
import App from './App.tsx'

function Main() {
  return (
    <Router>
      <Routes>
        <Route
          element={<App />}
          path='/'
        />
        <Route
          element={<App />}
          path='/:hash'
        />
      </Routes>
    </Router>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Main />
  </StrictMode>,
)
