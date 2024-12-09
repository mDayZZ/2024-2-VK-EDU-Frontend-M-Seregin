export const tokenService = {
    getAccessToken: () => localStorage.getItem('accessToken'),
    getRefreshToken: () => localStorage.getItem('refreshToken'),
    setAccessToken: (token) => localStorage.setItem('accessToken', token),
    setRefreshToken: (token) => localStorage.setItem('refreshToken', token),
    clearTokens: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    },
    getAuthorizationHeader: () => {
        const token = tokenService.getAccessToken();
        if (!token) {
            return null;
        }
        return `Bearer ${token}`;
    }
};

