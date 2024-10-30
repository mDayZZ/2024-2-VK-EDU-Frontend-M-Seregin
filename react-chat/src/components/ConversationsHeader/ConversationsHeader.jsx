import React from 'react';
import DefaultHeader from "../UI/DefaultHeader/DefaultHeader.jsx";
import classes from "./ConversationsHeader.module.scss";
import IconButton from "../UI/IconButton/IconButton.jsx";
import {AccountCircle, ArrowBack, Menu, More} from "@mui/icons-material";
import cn from "classnames";
import ConversationsFinder from "../ConversationsFinder/ConversationsFinder.jsx";
import {useModal} from "../../contexts/ModalContext.jsx";
import ChatProfile from "../ChatProfile/ChatProfile.jsx";

const ConversationsHeader = ({className, userInfo, backgroundColor, searchQuery, setSearchQuery}) => {
    const headerClasses = cn('chatListHeader', className);

    const {openModal} = useModal();


    return (
        <DefaultHeader className={headerClasses} backgroundColor={backgroundColor}>
            <div className={classes.chatListHeader__titleContainer}>
                <IconButton><Menu /></IconButton>
                <h2 className={classes.chatListHeader__title}>Чаты</h2>
            </div>
            <div className={classes.chatListHeader__actionsContainer} >
                <ConversationsFinder searchQuery={searchQuery} setSearchQuery={setSearchQuery}></ConversationsFinder>
                <IconButton onClick={() => openModal(<ChatProfile chatInfo={userInfo} userInfo={userInfo}/>)}><AccountCircle/></IconButton>
            </div>
        </DefaultHeader>
    );
};

export default ConversationsHeader;