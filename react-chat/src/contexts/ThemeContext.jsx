import {createContext, useState} from "react";

const defaultTheme = {
    headerBackgroundColor: "#323235",
    mainBackgroundColor: "#3f3c40",
    chatBackgroundColor: "#814475",
    chatMessageBackgroundColor: "#cf7556",
    chatFormBackgroundColor: "#fff",
};

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(defaultTheme);

    const updateTheme = (newTheme) => {
        setTheme((prevTheme) => ({...prevTheme, ...newTheme}));
    };
    return (
        <ThemeContext.Provider value={{theme, updateTheme}}>
            {children}
        </ThemeContext.Provider>
    )
};