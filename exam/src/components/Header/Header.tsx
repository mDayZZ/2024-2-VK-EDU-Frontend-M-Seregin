import IconButton from "../UI/IconButton/IconButton.tsx";
import {History} from "@mui/icons-material";

import classes from "./Header.module.scss";
import {Link, useNavigate} from "react-router";
import {Logo} from "../UI/Logo/Logo.tsx";

const Header = () => {
    const navigator = useNavigate();

    const handleHistoryClick = () => {
        navigator('/history')
    }

    return (
        <header className={classes.header}>
            <Link to='/'><Logo/></Link>

            <IconButton onClick={handleHistoryClick} icon={<History/>}/>


        </header>
    );
};

export default Header;