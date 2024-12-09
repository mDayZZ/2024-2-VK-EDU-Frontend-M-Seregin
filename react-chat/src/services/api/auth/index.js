import apiService, {API_URL} from "../../apiService.js";
import axios from "axios";

export const authApi = {
    auth: (credentials) => apiService.post('/auth/', credentials),
    refresh: (refreshToken) => apiService.post('/auth/refresh/', {refresh: refreshToken}),
    register: (userCreate) => apiService.post('/register/', userCreate),
}
