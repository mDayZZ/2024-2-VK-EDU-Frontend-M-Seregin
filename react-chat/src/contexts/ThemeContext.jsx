import {createContext, useState} from "react";

const defaultTheme = {
    headerBackgroundColor: "#323235",
    mainBackgroundColor: "#3f3c40",
    chatBackgroundColor: "#252325",
    chatMessageBackgroundColor: "#3a3a3a",
    chatFormBackgroundColor: "#454545",
    ButtonBackgroundColor: "#4b4d78",
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