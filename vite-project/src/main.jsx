import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './redux/store';

import SignUp from './components/userLogin/SignUp.jsx';
import SignIn from './components/userLogin/SignIn.jsx';
import ProtectedRoute from './components/userLogin/ProtectedRoute.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/" element={<ProtectedRoute />} />
        </Routes>
      </Provider>
    </React.StrictMode>
  </Router>
)
