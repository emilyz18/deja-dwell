import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import App from '../../App.jsx';

const ProtectedRoute = ({ element: Element, ...rest }) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    console.log(isAuthenticated);
    // return isAuthenticated ? <App /> : <Navigate to="/login" />;
    // todo ezhang: revert
    return <App />
};

export default ProtectedRoute;