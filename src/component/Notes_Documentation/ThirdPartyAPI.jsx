import React from 'react';
import { Link } from 'react-router-dom';

export default function ThirdPartyAPI() {
  return (
    <div>
        <>

            <ul>
                <li><Link   to = '/dashboard/Weather'>RESTful API Integration: Fetching Weather Data Using a Public API</Link></li>
                <li><Link   to = '/dashboard/GoogleAuthh'>Google OAuth Authentication Integration (React)</Link></li>

            </ul>

        </>



      {/* File 1: axiosInstance.js → Axios Setup with Token (Interceptors) */}
      <pre>
        {`// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com',
});

// Axios Interceptor to add token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = \`Bearer \${token}\`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;`}
      </pre>
      {/* 
        
        - **Axios Instance** ద్వారా మీరు **request interceptor** సృష్టిస్తున్నారు.
        - అన్ని API కాల్స్‌లో **token** ని **Authorization** హెడ్డర్‌గా జోడించడానికి ఉపయోగపడుతుంది.
        - **localStorage** నుండి **authToken** తీసుకొని ప్రతి API కాల్‌లో చేర్చబడుతుంది.
      */}

      {/* File 2: TokenLogin.jsx → Login Page with Token Storage */}
      <pre>
        {`// TokenLogin.jsx
import React, { useState } from 'react';
import axios from 'axios';

const TokenLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('https://api.example.com/login', {
        username,
        password,
      });

      localStorage.setItem('authToken', response.data.token);
      alert('Login Successful');
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} disabled={loading}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default TokenLogin;`}
      </pre>
      {/* 
        
        - ఈ కోడ్ లో మీరు **login** API కాల్ చేస్తారు.
        - **username** మరియు **password** ని API కు పంపించి, **authToken** ను **localStorage** లో స్టోర్ చేస్తారు.
        - **localStorage** నుండి ఈ టోకెన్ ను తదుపరి **API** కాల్స్ కోసం ఉపయోగించవచ్చు.
      */}

      {/* File 3: UserProfile.jsx → Protected API Page using Token */}
      <pre>
        {`// UserProfile.jsx
import React, { useEffect, useState } from 'react';
import axiosInstance from './axiosInstance';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get('/profile');
        setProfile(response.data);
      } catch (err) {
        setError('Failed to fetch profile data');
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {profile ? (
        <div>
          <h3>{profile.name}</h3>
          <p>{profile.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;`}
      </pre>
      {/* 
        
        - **UserProfile** ఎడమ పేజీను తీసుకోవడానికి **profile API** కాల్ చేయబడుతుంది.
        - **axiosInstance** ఉపయోగించి, **authToken** తో **API** కాల్ చేయబడుతుంది.
        - **profile** డేటా తెచ్చుకోవడం కోసం **localStorage** నుండి **token** పంపబడుతుంది.
      */}

      {/* File 4: CheckoutForm.jsx → Stripe Payment Integration */}
      <pre>
        {`// CheckoutForm.jsx
import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/stripe-react';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/create-payment-intent', {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      console.log('[Error]', error);
    } else {
      console.log('[PaymentIntent]', paymentIntent);
      alert('Payment successful!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay Now
      </button>
    </form>
  );
};

export default CheckoutForm;`}
      </pre>
      {/* 
        
        - **Stripe Payment Gateway** ద్వారా **payment** తీసుకోవడాన్ని **CardElement** ద్వారా సులభంగా చేయవచ్చు.
        - **clientSecret** ను **Backend** నుండి తీసుకుని, **PaymentIntent**ను ధృవీకరిస్తుంది.
      */}

      {/* File 5: App.js → Main App with Routing */}
      <pre>
        {`// App.js
import React from 'react';
import { Elements } from '@stripe/stripe-react';
import CheckoutForm from './CheckoutForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TokenLogin from './TokenLogin';
import UserProfile from './UserProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<TokenLogin />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/checkout" element={<CheckoutForm />} />
      </Routes>
    </Router>
  );
}

export default App;`}
      </pre>
      {/* 
        
        - **React Router** ఉపయోగించి **TokenLogin**, **UserProfile**, **CheckoutForm** వంటి పేజీలకు మార్పిడి చేయబడింది.
      */}

      {/* File 6: server.js → Backend for Payment Intent (Stripe) */}
      <pre>
        {`// server.js
const express = require('express');
const Stripe = require('stripe');
const stripe = Stripe('your-secret-key');

const app = express();
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 5000, 
      currency: 'usd',
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
`}
      </pre>
      {/* 
        
        - **Backend** ద్వారా **paymentIntent** సృష్టించి **clientSecret** ఫ్రంట్ ఎండ్ కు పంపించబడుతుంది.
        - **Stripe API**ని ఉపయోగించి **payment** ఫీచర్ యాప్‌లో ఇంస్టాల్ చేయబడుతుంది.
      */}

      {/* File 7: googleAuth.js → Google OAuth Backend Validation */}
      <pre>
        {`// googleAuth.js
const express = require('express');
const { google } = require('googleapis');
const app = express();
const CLIENT_ID = 'your-google-client-id';

app.post('/verify-google-token', async (req, res) => {
  const token = req.body.token;

  try {
    const ticket = await google.auth.OAuth2(CLIENT_ID).verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    res.json(payload);
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
});

app.listen(3002, () => console.log('Server running on port 3002'));
`}
      </pre>
      {/* 
        
        - **Google OAuth** ద్వారా **token** ను **verify** చేస్తుంది.
        - **Google API**తో **Google Login** పూర్తి అవుతుంది.
      */}
    </div>

    
  );
}
