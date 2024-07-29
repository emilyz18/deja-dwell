import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'

import SignUp from './components/userLogin/SignUp.jsx'
import SignIn from './components/userLogin/SignIn.jsx'
import ProtectedRoute from './components/userLogin/ProtectedRoute.jsx'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <React.StrictMode>
      <Provider store={store}>
        <Router>
  
          <App />
        </Router>
      </Provider>
    </React.StrictMode>
  
)
