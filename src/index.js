import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ReactQueryProvider from './ReactQueryProvider'; // Import your ReactQueryProvider
import './App.css'; // Import CSS for styling

// Root Render Function
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ReactQueryProvider> {/* Wrap App with ReactQueryProvider */}
        <App />
      </ReactQueryProvider>
    </BrowserRouter>
  </React.StrictMode>
);
