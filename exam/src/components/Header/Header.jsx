import React from 'react';
import classes from './Header.module.scss';
import {Logo} from "../UI/Logo/Logo.jsx";
import {Link, Navigate, useNavigate} from "react-router";
import IconButton from "../UI/IconButton/IconButton.jsx";
import {History} from "@mui/icons-material";

const Header = () => {
    const navigate = useNavigate();

    const handleHistoryButtonClick = () => {
        navigate('/history')
    }

    return (
        <header className={classes.header}>
            <Link to='/'><Logo/></Link>
            <IconButton onClick={handleHistoryButtonClick} icon={<History/>}/>
        </header>
    );
};

export default Header;