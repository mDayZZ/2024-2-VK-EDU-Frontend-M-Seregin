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
import {useParams} from "react-router-dom";

const ChatPage = ({userInfo, openConversationsPage}) => {
    const { id } = useParams();
    const chatId = Number(id);
    const [chatInfo, setChatInfo] = useState(null);
    const [messages, setMessages] = useState([]);
    const [witnessMessages, setWitnessMessages] = useState([]);
    console.log(id)


    const fetchMessages = async (chatId) => {
        const fetchedMessages = await getMessagesByChatId(chatId);
        setMessages(fetchedMessages);
    }
    const fetchChatInfo = async () => {
        const fetchedChatInfo = await getChatInfoByChatId(chatId, userInfo.id);
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