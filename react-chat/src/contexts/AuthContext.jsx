import {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import TokenService from "../services/tokenService.js";
import {userApi} from "../services/api/user/index.js";
import {authApi} from "../services/api/auth/index.js";
import {routes} from "../utils/routes.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const fetchUserData = async () => {
        try {
            const userData = await userApi.current.get();
            setUser(userData);
            console.log('фетчанули и положили', userData)
        } catch (error) {
            handleLogout();
        }
    };

    const handleLogin = async (credentials) => {
        try {
            const {access, refresh} = await authApi.auth(credentials);
            TokenService.setAccessToken(access);
            TokenService.setRefreshToken(refresh);
            await fetchUserData();
            navigate(routes.chats);
        } catch (error) {
            console.error('login failed', error);
            throw error
        }
    }

    const handleLogout = () => {
        navigate(routes.auth);
        TokenService.clearTokens();
        setUser(null);
    }

    useEffect(() => {
        const checkAuth = async () => {
            const accessToken = TokenService.getAccessToken();
            if (accessToken && !TokenService.isTokenExpired(accessToken)) {
                await fetchUserData();
            } else {
                handleLogout();
            }
            setIsLoading(false);
        };
        checkAuth();
    }, [])

    const value = {
        user,
        isAuthenticated: !!user,
        login: handleLogin,
        logout: handleLogout,
        isLoading
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);