import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'react-auth-kit';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store'; // Assuming you have a Redux store set up
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<<<<<<< Updated upstream
  <React.StrictMode>
    <AuthProvider
      authType="cookie"
      authName="_auth"
      cookieDomain={window.location.hostname}
      cookieSecure={false}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
=======
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
>>>>>>> Stashed changes
);
