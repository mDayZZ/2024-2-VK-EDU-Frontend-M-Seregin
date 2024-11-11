import React, {useContext, useEffect, useMemo, useState} from 'react';
import {getChatsByUserId} from "../../services/chatService.js";
import classes from "./ConversationList.module.scss";
import ConversationItem from "../ConversationItem/ConversationItem.jsx";
import {getTextColor} from "../../utils/getTextColor.js";
import {ThemeContext} from "../../contexts/ThemeContext.jsx";
import {useTheme} from "../../hooks/useTheme.js";
import UserListItem from "../UI/UserListItem/UserListItem.jsx";
import {useModal} from "../../contexts/ModalContext.jsx";
import CreateChat from "../CreateChat/CreateChat.jsx";
import {chatsApi} from "../../services/api/chats/index.js";
import {useOnReceivedMessage} from "../../hooks/useOnRecievedMessage.js";
import audioService from "../../services/audioService.js";
const ConversationList = ({userId, openChatPage, searchQuery}) => {

    const {openModal, closeModal} = useModal();
    const [conversations, setConversations] = useState([]);

    const filteredConversations = useMemo(() => {
        return conversations.filter(conversation => {
            const searchTerms = String(searchQuery).toLowerCase().split(' ').filter(Boolean);
            const conversationName = String(conversation.title).toLowerCase().trim();
            const result = searchTerms.every(term => conversationName.includes(term));
            return result;
        })
    }, [searchQuery, conversations])

    useOnReceivedMessage((message) => {
        const messageChat = conversations.find(conversation => {
            return conversation.id === message.chat
        });
        if (!messageChat) {
            return;
        }
        messageChat.last_message = message;

        setConversations((prevState) => {
            const filteredConversations = prevState.filter(conversation => conversation.id !== messageChat.id);
            const newConversations = [messageChat, ...filteredConversations];
            return newConversations
        });
        audioService.play('messageReceived');
    }, [conversations])


    const { backgroundColor, textColor } = useTheme('mainBackgroundColor');


    const fetchConversations = async () => {
        const {count, next, previous, results} = await chatsApi.get();
        setConversations(results);
    }

    const onCreateChat = () => {
        openModal(<CreateChat closeModal={closeModal}/>);
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
            {(searchQuery || filteredConversations.length === 0) &&
                <>
                    <UserListItem heading={'Создать чат'} comment={'Для совместного общения'} onClick={onCreateChat}/>
                </>
            }
        </ul>
    );
};

export default ConversationList;