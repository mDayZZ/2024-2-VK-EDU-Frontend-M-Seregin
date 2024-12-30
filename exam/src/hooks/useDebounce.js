import {useEffect, useState} from "react";

export const useDebounce = (state, delay) => {
    const [debouncedState, setDebouncedState] = useState(state);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedState(state), delay);


        return () => {
            clearTimeout(timer);
        }
    }, [state]);

    return debouncedState;
}