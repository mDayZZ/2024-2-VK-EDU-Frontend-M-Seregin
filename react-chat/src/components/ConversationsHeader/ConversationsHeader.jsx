import React, {useState} from 'react';
import DefaultHeader from "../UI/DefaultHeader/DefaultHeader.jsx";
import classes from "./ConversationsHeader.module.scss";
import IconButton from "../UI/IconButton/IconButton.jsx";
import {AccountCircle, ArrowBack, Menu, More} from "@mui/icons-material";
import cn from "classnames";
import ConversationsFinder from "../ConversationsFinder/ConversationsFinder.jsx";
import {useModal} from "../../contexts/ModalContext.jsx";
import UserProfile from "../UserProfile/UserProfile.jsx";

const ConversationsHeader = ({className, userInfo, backgroundColor, searchQuery, handleSearchQueryChange}) => {
    const headerClasses = cn('chatListHeader', className);

    const {openModal, setOnEdit} = useModal();

    const handleOpenProfile = () => {
        let onModalEditButton = null;
        openModal(<UserProfile profileInfo={userInfo} myInfo={userInfo} setOnEdit={setOnEdit}/>)
    }






    return (
        <DefaultHeader className={headerClasses} backgroundColor={backgroundColor}>
            <div className={classes.chatListHeader__titleContainer}>
                <IconButton><Menu /></IconButton>
                <h2 className={classes.chatListHeader__title}>Чаты</h2>
            </div>
            <div className={classes.chatListHeader__actionsContainer} >
                <ConversationsFinder searchQuery={searchQuery} handleSearchQueryChange={handleSearchQueryChange} />
                <IconButton onClick={handleOpenProfile}><AccountCircle/></IconButton>
            </div>
        </DefaultHeader>
    );
};

export default ConversationsHeader;