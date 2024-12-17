/**
 * Хук для установки цветовой темы приложения в глобальные переменные и получения цвета фона и текста.
 *
 * @param {string} themeProperty - Имя свойства темы, которое используется для установки цветов.
 * @returns {{backgroundColor: string, textColor: string}} Объект с цветом фона и текста.
 *
 * @example
 * const { backgroundColor, textColor } = useTheme('primary');
 * В CSS: --primary-bg-color, --primary-text-color
 */


import {useEffect, useMemo} from "react";
import {getTextColor} from "../utils/getTextColor.js";
import {useSelector} from "react-redux";
import {themeSelector} from "../store/theme/themeSelectors.js";

export const useTheme = (themeProperty) => {
    const theme = useSelector(themeSelector);
    const textColor = useMemo(() => {
        const textColor = getTextColor(theme[themeProperty]);
        return textColor;
    }, [theme, themeProperty])

    document.documentElement.style.setProperty(`--${themeProperty}-bg-color`, theme[themeProperty]);
    document.documentElement.style.setProperty(`--${themeProperty}-text-color`, textColor);

    return {backgroundColor: theme[themeProperty], textColor};
}