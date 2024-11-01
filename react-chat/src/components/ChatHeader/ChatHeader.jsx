import React, {useContext, useEffect, useMemo, useState} from 'react';
import DefaultHeader from "../UI/DefaultHeader/DefaultHeader.jsx";
import classes from "./ChatHeader.module.scss";
import IconButton from "../UI/IconButton/IconButton.jsx";
import {ArrowBack, DeleteOutline, Info, More, MoreVert} from "@mui/icons-material";
import RoundAvatar from "../UI/RoundAvatar/RoundAvatar.jsx";
import {pluralize} from "../../utils/pluralize.js";
import {getUserById} from "../../services/userService.js";
import cn from "classnames";
import IconLink from "../UI/IconLink/IconLink.jsx";
import DropdownMenu from "../UI/DropDownMenu/DropdownMenu.jsx";
import {useModal} from "../../contexts/ModalContext.jsx";
import ChatProfile from "../ChatProfile/ChatProfile.jsx";
const ChatHeader = ({chatInfo, userInfo, className, onDeleteHistory}) => {
    const {openModal} = useModal();
    const headerClasses = cn('chatHeader', className, classes.chatHeader);

    const menuOptions = [
        {label: 'Профиль', onClick: () => openModal(<ChatProfile chatInfo={chatInfo} userInfo={userInfo}/>), icon: <Info />},
        {label: 'Очистить историю', onClick: onDeleteHistory, icon: <DeleteOutline/>},
    ];

    const chatTitle = chatInfo?.name || '...'
    const chatStatus = chatInfo?.status || '...'



    return (
        <DefaultHeader className={headerClasses}>
            <IconLink linkTo={'/chats'}><ArrowBack /></IconLink>
            <RoundAvatar src={chatInfo?.profile_image_url || null} className={classes.chatHeader__chatAvatar} />
            <div className={classes.chatHeader__chatInfo}>
                <h2 className={classes.chatHeader__chatTitle}>{chatTitle}</h2>
                <p className={classes.chatHeader__chatStatus}>{chatStatus}</p>
            </div>
            <DropdownMenu icon={<MoreVert />} menuOptions={menuOptions}/>
        </DefaultHeader>
    );
};

export default ChatHeader;