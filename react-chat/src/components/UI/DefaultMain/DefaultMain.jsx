import classes from "../DefaultMain/DefaultMain.module.scss";
import {useTheme} from "../../../hooks/useTheme.js";
import {useEffect} from "react";


const DefaultMain = ({children, mainRef, className}) => {
    const mainClasses = ['main', classes.main, className].join(' ');
    const {backgroundColor, textColor} = useTheme('main');

    return (
        <main ref={mainRef} className={mainClasses}>
            {children}
        </main>
    )
};
export default DefaultMain;