import {useContext, useMemo} from "react";
import {ThemeContext} from "../contexts/ThemeContext.jsx";
import {getTextColor} from "../utils/getTextColor.js";

export const useTheme = (themeProperty) => {
    const {theme} = useContext(ThemeContext);
    const textColor = useMemo(() => {
        const textColor = getTextColor(theme[themeProperty]);
        return textColor;
    }, [theme, themeProperty])

    return {backgroundColor: theme[themeProperty], textColor};
}