import React from 'react';
import {useAuth} from "../../contexts/AuthContext.jsx";
import {Navigate} from "react-router-dom";
import {routes} from "../../utils/routes.js";

const PrivateRoute = ({children}) => {
    const {isAuthenticated} = useAuth();

    return isAuthenticated ? children : <Navigate to={routes.auth} />;
};

export default PrivateRoute;