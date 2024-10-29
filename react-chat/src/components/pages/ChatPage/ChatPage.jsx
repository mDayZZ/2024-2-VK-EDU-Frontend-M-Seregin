import React, {useEffect, useRef, useState} from 'react';
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
import MessageForm from "../../MessageForm/MessageForm.jsx";
import messageList from "../../MessageList/MessageList.jsx";
import Page from "../../UI/Page/Page.jsx";

const ChatPage = ({userInfo, chatId, openConversationsPage}) => {
    const [chatInfo, setChatInfo] = useState(null);
    const [messages, setMessages] = useState([]);
    const [witnessMessages, setWitnessMessages] = useState([]);


    const fetchMessages = async (chatId) => {
        const fetchedMessages = await getMessagesByChatId(chatId);
        setMessages(fetchedMessages);
    }
    const fetchChatInfo = async () => {
        const fetchedChatInfo = await getChatInfoByChatId(chatId, userInfo.id);
        console.log('fromfetc', fetchedChatInfo)
        setChatInfo(fetchedChatInfo);
    }

    const mainRef = useRef(null);


    useEffect(() => {
        mainRef.current.scrollTop = mainRef.current.scrollHeight;
    }, [messages]);


    useEffect(() => {
        fetchChatInfo();
    }, [chatId]);

    useEffect(() => {
        fetchMessages(chatId);
    }, [chatId])


    return (
        <Page>
            <ChatHeader chatInfo={chatInfo} onArrowBack={openConversationsPage}/>
            <DefaultMain mainRef={mainRef}>
                <MessageList messages={messages} witnessMessages={witnessMessages} userInfo={userInfo}/>
            </DefaultMain>
            <MessageForm messages={messages} setMessages={setMessages} setWitnessMessages={setWitnessMessages} userInfo={userInfo} chatInfo={chatInfo}/>
        </Page>
    );
};

export default ChatPage;