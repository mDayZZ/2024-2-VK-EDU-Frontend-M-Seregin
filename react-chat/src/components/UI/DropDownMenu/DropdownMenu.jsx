import React, { useEffect, useRef, useState } from 'react';
import classes from './DropdownMenu.module.scss';
import IconButton from "../IconButton/IconButton.jsx";
import DropdownButton from "../DropdownButton/DropdownButton.jsx";
import cn from "classnames";

const DropdownMenu = ({ icon, menuOptions, className }) => {
    const dropdownButtonClasses = cn(className, )
    const [isOpen, setIsOpen] = useState(false);
    const dropDownListRef = useRef(null);
    const buttonRef = useRef(null);
    const [dropDownPosition, setDropDownPosition] = useState({ top: 0, left: 0 });

    const toggleMenu = (event) => {
        event.stopPropagation();
        setIsOpen((prev) => !prev);
    };

    const closeMenu = () => setIsOpen(false);

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

    useEffect(() => {
        if (!isOpen) return;

        const OFFSET = 10;

        const buttonRect = buttonRef.current.getBoundingClientRect();
        const dropDownWidth = dropDownListRef.current.clientWidth;
        const dropDownHeight = dropDownListRef.current.clientHeight;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        let top = buttonRect.bottom + OFFSET;
        let left = buttonRect.left;

        const hasSpaceBelow = buttonRect.bottom + dropDownHeight + OFFSET <= windowHeight;
        const hasSpaceAbove = buttonRect.top - dropDownHeight - OFFSET >= 0;
        const hasSpaceRight = buttonRect.left + dropDownWidth + OFFSET <= windowWidth;
        const hasSpaceLeft = buttonRect.right - dropDownWidth - OFFSET >= 0;

        if (!hasSpaceBelow && hasSpaceAbove) {
            top = buttonRect.top - dropDownHeight - OFFSET;
        }

        if (!hasSpaceRight && hasSpaceLeft) {
            left = buttonRect.right - dropDownWidth - OFFSET;
        } else {
            left += OFFSET;
        }

        setDropDownPosition({ top, left });
    }, [isOpen]);


    return (
        <div className={classes.dropdownMenu}>
            <IconButton className={dropdownButtonClasses} ref={buttonRef} onClick={toggleMenu}>{icon}</IconButton>
            {isOpen && (
                <ul
                    ref={dropDownListRef}
                    className={classes.dropdownMenu__list}
                    style={{
                        position: 'absolute',
                        top: `${dropDownPosition.top}px`,
                        left: `${dropDownPosition.left}px`,
                    }}
                >
                    {menuOptions.map((menuOption, index) => (
                        <li key={index} className={classes.dropdownMenu__item}>
                            <DropdownButton
                                className={classes.dropdownMenu__item__button}
                                onClick={() => {
                                    menuOption.onClick();
                                    closeMenu();
                                }}
                            >
                                {menuOption.icon} <p>{menuOption.label}</p>
                            </DropdownButton>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropdownMenu;
