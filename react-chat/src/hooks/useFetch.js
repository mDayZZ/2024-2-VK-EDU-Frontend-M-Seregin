import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../utils/routes.js";

export const useFetch = (callback) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (params) => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await callback(params);
            setIsLoading(false);
            return data;
        } catch (error) {
            setIsLoading(false);
            console.error(error);
            if (error?.response?.status === 401) {
                navigate(routes.auth);
            }
            setError(error);
        }
    }, [callback, navigate]);

    return [fetchData, isLoading, error];
};
