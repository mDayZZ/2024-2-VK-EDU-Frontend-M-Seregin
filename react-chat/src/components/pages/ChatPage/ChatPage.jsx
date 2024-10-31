import React, {useEffect, useRef, useState} from 'react';
import {
    deleteChatMessages,
    getChatInfoByChatId,
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
import Modal from "../../UI/Modal/Modal.jsx";
import {useModal} from "../../../contexts/ModalContext.jsx";

const ChatPage = ({userInfo, openConversationsPage}) => {

    const { id } = useParams();
    const chatId = Number(id);
    const [chatInfo, setChatInfo] = useState(null);
    const [messages, setMessages] = useState([]);
    const [witnessMessages, setWitnessMessages] = useState([]);

    const fetchDeleteMessages = async () => {
        try {
            const data = await deleteChatMessages(chatId);
            setMessages([]);

        } catch (e) {
            console.error(e);
        }
    }

    const onDeleteHistory = () => {
        const result = fetchDeleteMessages();
        setMessages(result);
    };

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
            <ChatHeader userInfo={userInfo} chatInfo={chatInfo} onDeleteHistory={onDeleteHistory}/>
            <DefaultMain mainRef={mainRef}>

                <MessageList messages={messages} witnessMessages={witnessMessages} userInfo={userInfo}/>
            </DefaultMain>
            <MessageForm messages={messages} setMessages={setMessages} setWitnessMessages={setWitnessMessages} userInfo={userInfo} chatInfo={chatInfo}/>
        </Page>
    );
};

export default ChatPage;