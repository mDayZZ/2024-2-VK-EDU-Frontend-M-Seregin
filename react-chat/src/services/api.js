const BASE_URL = import.meta.env.API_URL || 'localhost:3000';

const api = async (endpoint, options = {}) => {
    const response = await fetch(`${BASE_URL}/${endpoint}`, options);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();

}