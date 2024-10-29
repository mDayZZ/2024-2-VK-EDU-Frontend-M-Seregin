import React, {useContext, useEffect, useMemo, useState} from 'react';
import {getChatsByUserId} from "../../services/chatService.js";
import classes from "./ConversationList.module.scss";
import ConversationItem from "../ConversationItem/ConversationItem.jsx";
import {getTextColor} from "../../utils/getTextColor.js";
import {ThemeContext} from "../../contexts/ThemeContext.jsx";
import {useTheme} from "../../hooks/useTheme.js";
import UserListItem from "../UI/UserListItem/UserListItem.jsx";
const ConversationList = ({userId, openChatPage, searchQuery}) => {

    const [conversations, setConversations] = useState([]);
    const filteredConversations = useMemo(() => {
        return conversations.filter(conversation => {
            const searchTerms = searchQuery.toLowerCase().split(' ').filter(Boolean);
            const conversationName = conversation.name.toLowerCase().trim();
            const result = searchTerms.every(term => conversationName.includes(term));
            return result;
        })
    }, [searchQuery, conversations])


    const { backgroundColor, textColor } = useTheme('mainBackgroundColor');


    const fetchConversations = async () => {
        const fetchedConversations = await getChatsByUserId(userId);
        setConversations(fetchedConversations);
    }


    useEffect(() => {
        if (!userId) {
            return;
        }
        fetchConversations();
    }, [userId])

    return (
        <ul className={classes.chatList} style={{color: textColor}}>
            {filteredConversations.map(conversation => <ConversationItem userId={userId} conversation={conversation} openChatPage={openChatPage} key={conversation.id} />)}
            {searchQuery
                ?
                <>
                    <UserListItem heading={'Добавить пользователя'} comment={'Из списка контактов'}></UserListItem>
                    <UserListItem heading={'Создать чат'} comment={'Для совместного диалога'}></UserListItem>
                </>
                : <></>
            }
        </ul>
    );
};

export default ConversationList;