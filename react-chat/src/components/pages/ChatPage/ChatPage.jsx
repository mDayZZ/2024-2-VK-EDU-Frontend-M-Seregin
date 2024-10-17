import React, {useEffect, useState} from 'react';
import {
    getChatInfoByChatId,
    getChatsByUserId,
    getMembersByChatId,
    getMessagesByChatId
} from "../../../services/chatService.js";
import ChatHeader from "../../ChatHeader/ChatHeader.jsx";

const ChatPage = ({userInfo, chatId, openConversationsPage}) => {
    const [chatInfo, setChatInfo] = useState({});
    const [chatMembers, setChatMembers] = useState([]);
    const [messages, setMessages] = useState([]);

    const fetchMessages = async (chatId) => {
        const fetchedMessages = await getMessagesByChatId(chatId);
        setMessages(fetchedMessages);
    }
    const fetchChatInfo = async () => {
        const fetchedChatInfo = await getChatInfoByChatId(chatId);
        setChatInfo(fetchedChatInfo);
    }

    const fetchChatMembers = async () => {
        const fetchedChatMembers = await getMembersByChatId(chatId);
        setChatMembers(fetchedChatMembers);
    }

    useEffect(() => {
        fetchChatInfo();
    }, [chatId]);

    useEffect(() => {
        fetchMessages(chatId);
    }, [chatId])
    useEffect(() => {
        fetchChatMembers(chatId);
    }, [chatId])



    return (
        <div className={'page'}>
            <ChatHeader userInfo={userInfo} chatMembers={chatMembers} chatInfo={chatInfo} onArrowBack={openConversationsPage}/>
            <h1>Хаха чатикс</h1>
            {messages.map(message => <p>{message.content}</p>)}
        </div>
    );
};

export default ChatPage;