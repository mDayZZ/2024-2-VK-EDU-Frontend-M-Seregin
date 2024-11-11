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
import {useUserContext} from "../../../contexts/UserContext.jsx";
import {useAuth} from "../../../contexts/AuthContext.jsx";
import {chatApi} from "../../../services/api/chat/index.js";
import {messagesApi} from "../../../services/api/messages/index.js";
import {useCentrifugo} from "../../../contexts/CentrifugoContext.jsx";
import {useOnReceivedMessage} from "../../../hooks/useOnRecievedMessage.js";
import audioService from "../../../services/audioService.js";
import apiService from "../../../services/apiService.js";

const ChatPage = ({}) => {
    const {user: userInfo } = useAuth();

    const { chatId } = useParams();
    const [chatInfo, setChatInfo] = useState(null);
    const [messages, setMessages] = useState([]);
    const [witnessMessages, setWitnessMessages] = useState([]);
    const [isMessageLoading, setIsMessageLoading] = useState(true);



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
        setIsMessageLoading(true)

        const {count, next, previous, results} = await messagesApi.getMessages(chatId);
        setMessages(results);
        setIsMessageLoading(false)
    }


    const fetchChatInfo = async () => {
        const fetchedChatInfo = await chatApi.getChatInfo(chatId);
        setChatInfo(fetchedChatInfo);
    }

    const mainRef = useRef(null);
    useEffect(() => {
        mainRef.current.scrollTop = mainRef.current.scrollHeight;
    }, [messages]);

    const scrollHandler = (e) => {
        const scrollHeight = e.target.scrollHeight;
        const scrollTop = e.target.scrollTop;
        const innerHeight = window.innerHeight;
        // console.log('scrollHeight', scrollHeight);
        // console.log('scrollTop', scrollTop);
        // console.log('innerHeight', innerHeight);
    }

    useEffect(() => {
        const mainElement = mainRef.current;
        if (mainElement) {
            addEventListener('scroll', scrollHandler);
        }

        return (() => {
            mainElement.removeEventListener('scroll', scrollHandler);
        })
    }, [isMessageLoading])



    useEffect(() => {
        fetchChatInfo();
        fetchMessages(chatId);


    }, [])



    useOnReceivedMessage((message) => {
        if (!message.chat === chatId) {
            return;
        }
        if (message.sender.id === userInfo.id) {
            return;
        }
        setMessages((prevState) => ([message, ...prevState]))
        audioService.play('messageReceived');
    })



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