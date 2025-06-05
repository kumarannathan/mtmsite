import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init('HRh2WSfjKvUy8wEOK');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
