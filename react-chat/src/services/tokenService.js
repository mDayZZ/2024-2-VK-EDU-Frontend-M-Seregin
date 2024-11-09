class TokenService {
    static getAccessToken() {
        return localStorage.getItem("accessToken");
    }
    static setAccessToken(token) {
        localStorage.setItem("accessToken", token);
    }

    static getRefreshToken = () => {
        return localStorage.getItem("refreshToken");
    }
    static setRefreshToken(token) {
        localStorage.setItem("refreshToken", token);
    }

    static clearTokens() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }

    static isTokenExpired(token) {
        if (!token) return true;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expiry = payload.exp * 1000;
            return Date.now() >= expiry;
        } catch (error) {
            console.error('Ошибка проверки токена:', error);
            return true;
        }
    }

    static async refreshAccessToken(apiService) {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken || this.isTokenExpired(refreshToken)) {
            this.clearTokens();
            return null;
        }

        try {
            const response = await apiService.post('/auth/refresh', { refreshToken });
            this.setAccessToken(response.access);
            this.setRefreshToken(response.refresh);
            return response.access;
        } catch (error) {
            console.error('Ошибка обновления токена:', error);
            this.clearTokens();
            return null;
        }
    }


}

export default TokenService;
