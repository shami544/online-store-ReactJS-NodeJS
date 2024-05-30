import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'react-auth-kit';
import UaerProvider from './context/context';
import ShoppingCartProvider from './context/shoppingCartContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const root = ReactDOM.createRoot(document.getElementById('root'));
const strioePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

root.render(
  <AuthProvider
    authType='cookie'
    authName='_auth'
    cookieDomain={window.location.hostname}
    cookieSecure={false}
  >
    <BrowserRouter>
      <React.StrictMode>
        <UaerProvider>
          <ShoppingCartProvider>
            <GoogleOAuthProvider clientId='318228430339-6at3qe0f5pvcm3cfmicumaand7ta0ci9.apps.googleusercontent.com'>
              <Elements stripe={strioePromise}>
                <App />
              </Elements>
            </GoogleOAuthProvider>
          </ShoppingCartProvider>
        </UaerProvider>
      </React.StrictMode>
    </BrowserRouter>
  </AuthProvider>
);


