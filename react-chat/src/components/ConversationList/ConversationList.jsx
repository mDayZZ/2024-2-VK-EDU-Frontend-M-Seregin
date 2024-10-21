import React, {useContext, useEffect, useMemo, useState} from 'react';
import {getChatsByUserId} from "../../services/chatService.js";
import classes from "./ConversationList.module.scss";
import ConversationItem from "../ConversationItem/ConversationItem.jsx";
import {getTextColor} from "../../utils/getTextColor.js";
import {ThemeContext} from "../../contexts/ThemeContext.jsx";
const ConversationList = ({userId, openChatPage}) => {

    const [conversations, setConversations] = useState([]);
    const {theme} = useContext(ThemeContext);
    const textColor = useMemo(() => {
        const textColor = getTextColor(theme.mainBackgroundColor);
        return textColor;
    }, [theme])


    const fetchChats = async () => {
        const fetchedChats = await getChatsByUserId(userId);
        setConversations(fetchedChats);
    }

    useEffect(() => {
        fetchChats();
    }, [userId])

    return (
        <ul className={classes.chatList} style={{color: textColor}}>
            {conversations.map(conversation => <ConversationItem userId={userId} conversation={conversation} openChatPage={openChatPage} key={conversation.id} />)}
        </ul>
    );
};

export default ConversationList;