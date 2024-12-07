import {useEffect, useRef} from "react";

export const useInputFocusOnStart = () => {
    const inputRef = useRef(null);
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return {inputRef};
}