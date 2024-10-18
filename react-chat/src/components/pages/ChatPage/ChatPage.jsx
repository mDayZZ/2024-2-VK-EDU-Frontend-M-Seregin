import React, {useEffect, useState} from 'react';
import {
    getChatInfoByChatId,
    getChatsByUserId,
    getMembersByChatId,
    getMessagesByChatId
} from "../../../services/chatService.js";
import ChatHeader from "../../ChatHeader/ChatHeader.jsx";
import useChatInfo from "../../../hooks/useChatInfo.js";
import DefaultMain from "../../UI/DefaultMain/DefaultMain.jsx";
import MessageList from "../../MessageList/MessageList.jsx";

const ChatPage = ({userInfo, chatId, openConversationsPage}) => {
    const [chatInfo, setChatInfo] = useState({});
    const [messages, setMessages] = useState([]);
    const {chatTitle, chatMembers, chatStatus} = useChatInfo(chatInfo, userInfo.id)

    const fetchMessages = async (chatId) => {
        const fetchedMessages = await getMessagesByChatId(chatId);
        setMessages(fetchedMessages);
    }
    const fetchChatInfo = async () => {
        const fetchedChatInfo = await getChatInfoByChatId(chatId);
        setChatInfo(fetchedChatInfo);
    }


    useEffect(() => {
        fetchChatInfo();
    }, [chatId]);

    useEffect(() => {
        fetchMessages(chatId);
    }, [chatId])


    return (
        <div className={'page'}>
            <ChatHeader chatInfo={chatInfo} chatTitle={chatTitle} chatStatus={chatStatus} onArrowBack={openConversationsPage}/>
            <DefaultMain>
                <MessageList messages={messages} userInfo={userInfo}/>
            </DefaultMain>

        </div>
    );
};

export default ChatPage;