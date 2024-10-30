import React, {useEffect, useRef, useState} from 'react';
import classes from './DropdownMenu.module.scss';
import IconButton from "../IconButton/IconButton.jsx";
import DefaultButton from "../DefaultButton/DefaultButton.jsx";
const DropdownMenu = ({icon, menuOptions}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = (event) => {
        event.stopPropagation();
        setIsOpen((prev) => !prev);
    };
    const closeMenu = () => setIsOpen(false);

    const dropDownListRef = useRef(null);
    const handleClickOutside = (event) => {
        if (dropDownListRef.current && !dropDownListRef.current.contains(event.target)) {
            closeMenu();
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const optionHandler = (handler) => {
        try {
            handler();
        }
        catch (e) {
            console.error(e);
        }
    }

    return (
        <div className={classes.dropdownMenu}>
            <IconButton onClick={toggleMenu}>{icon}</IconButton>
            {isOpen && (
                <ul ref={dropDownListRef} className={classes.dropdownMenu__list}>
                    {menuOptions.map((menuOption, index) =>
                        <li key={index} className={classes.dropdownMenu__item}><button className={classes.dropdownMenu__item__button} onClick={(event) => {event.stopPropagation(); optionHandler(menuOption.onClick); closeMenu()}}>{menuOption.icon} <p>{menuOption.label}</p></button></li>)
                    }
                </ul>
            )}

        </div>
    );
};

export default DropdownMenu;