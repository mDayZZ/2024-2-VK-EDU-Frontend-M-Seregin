import React, {useEffect, useMemo, useRef, useState} from 'react';
import classes from "./ConversationList.module.scss";
import ConversationItem from "../ConversationItem/ConversationItem.jsx";
import {useTheme} from "../../hooks/useTheme.js";
import UserListItem from "../UI/UserListItem/UserListItem.jsx";
import {useModal} from "../../contexts/ModalContext.jsx";
import CreateChat from "../CreateChat/CreateChat.jsx";
import {useOnReceivedMessage} from "../../hooks/useOnRecievedMessage.js";
import audioService from "../../services/audioService.js";
import {useFetch} from "../../hooks/useFetch.js";
import {chatService} from "../../services/api/chatService.js";
import Loader from "../UI/Loader/Loader.jsx";
import {notificationApiService} from "../../services/notificationApiService.js";
import {useSelector} from "react-redux";
import {authSelector} from "../../store/auth/authSelectors.js";
import {getPagesCount} from "../../utils/getPagesCount.js";
import useDebounce from "../../hooks/useDebounce.js";
import {useDynamicPagination} from "../../hooks/useDynamicPagination.js";

const ConversationList = ({userId, openChatPage, searchQuery}) => {
    const {backgroundColor, textColor} = useTheme('main');
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

    useOnReceivedMessage(async(message) => {
        const messageChat = conversations.find(conversation => {
            return conversation.id === message.chat
        });
        if (!messageChat) {
            const newChat = await chatService.getChatInfo(message.chat);
            if (!newChat) {
                return;
            }
            setConversations(prev => ([newChat, ...prev]))
            return;
        }

        const updateLastMessage = () => {
            if (!messageChat) {
                return;
            }
            messageChat.last_message = message;
        }

        updateLastMessage();

        setConversations((prevState) => {
            const filteredConversations = prevState.filter(conversation => conversation.id !== messageChat.id);
            const newConversations = [messageChat, ...filteredConversations];
            return newConversations
        });

        if (message.sender.id !== userId) {
            audioService.play('messageReceived');
            await notificationApiService.notify(message);
            return;
        }
    }, [conversations])

    const onCreateChat = () => {
        openModal(<CreateChat closeModal={closeModal}/>);
    }

    const [lastConversationRef] = useDynamicPagination(setConversations, conversations, chatService.getChats);

    return (
            <ul className={classes.chatList} style={{color: textColor}}>
                {conversations.length !== 0
                    ? <>{filteredConversations.map((conversation, index) => <ConversationItem userId={userId} conversation={conversation}
                                                                                     openChatPage={openChatPage}
                                                                                     key={conversation.id} lastConversationRef={lastConversationRef} index={index} conversationsCount={filteredConversations.length}/>)}
                        {(searchQuery || filteredConversations.length === 0) &&
                            <>
                                <UserListItem heading={'Создать чат'} comment={'Для совместного общения'}
                                              onClick={onCreateChat}/>
                            </>
                        }</>

                    : <Loader/>
                }
            </ul>
    );
}

export default ConversationList;