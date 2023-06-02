import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
);
