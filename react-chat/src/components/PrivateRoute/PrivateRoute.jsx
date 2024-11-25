import React from 'react';
import {Navigate} from "react-router-dom";
import {routes} from "../../utils/routes.js";
import {useSelector} from "react-redux";
import {isAuthSelector} from "../../store/auth/authSelectors.js";

const PrivateRoute = ({children}) => {
    const isAuthenticated = useSelector(isAuthSelector);

    console.log(isAuthenticated)
    return isAuthenticated ? children : <Navigate to={routes.auth} />;
};

export default PrivateRoute;