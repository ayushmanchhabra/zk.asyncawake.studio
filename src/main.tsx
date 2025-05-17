import { StyledEngineProvider } from "@mui/material";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import './main.css'

function Main() {

  return (
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  );
}

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <Main />
  </StrictMode>,
)
