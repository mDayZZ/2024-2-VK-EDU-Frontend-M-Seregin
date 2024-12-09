import {useEffect, useMemo} from "react";
import {getTextColor} from "../utils/getTextColor.js";
import {useSelector} from "react-redux";
import {themeSelector} from "../store/theme/themeSelectors.js";

export const useTheme = (themeProperty) => {
    const theme = useSelector(themeSelector);
    const textColor = useMemo(() => {
        console.log(theme)
        console.log(themeProperty)
        console.log(theme[themeProperty])
        const textColor = getTextColor(theme[themeProperty]);
        return textColor;
    }, [theme, themeProperty])

    document.documentElement.style.setProperty(`--${themeProperty}-bg-color`, theme[themeProperty]);
    document.documentElement.style.setProperty(`--${themeProperty}-text-color`, textColor);

    return {backgroundColor: theme[themeProperty], textColor};
}