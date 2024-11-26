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
import {useLoadMoreMessages} from "../../../hooks/useLoadMoreMessages.js";
import {useDragAndDropFiles} from "../../../hooks/useDragAndDropFiles.js";
import DragZone from "../../UI/DragZone/DragZone.jsx";
import {notificationApiService} from "../../../services/notificationApiService.js";

const ChatPage = ({}) => {
    const {user: userInfo } = useAuth();

    const { chatId } = useParams();
    const [chatInfo, setChatInfo] = useState(null);
    const [messages, setMessages] = useState([]);
    const [witnessMessages, setWitnessMessages] = useState([]);
    const [isMessageLoading, setIsMessageLoading] = useState(true);
    const [isNextPage, setIsNextPage] = useState(false);
    const mainRef = useRef(null);
    const [lastMessageRef] = useLoadMoreMessages({messages, setMessages, chatId, isNextPage, setIsNextPage, mainRef});


    const {droppedFiles, isDragging, dragAndDropProps} = useDragAndDropFiles();

    const [isMessageReceived, setIsMessageReceived] = useState(false);



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
        setIsNextPage(!!next);
        setIsMessageLoading(false)
    }


    const fetchChatInfo = async () => {
        const fetchedChatInfo = await chatApi.getChatInfo(chatId);
        setChatInfo(fetchedChatInfo);
    }


    useEffect(() => {
        if (messages.length === 0) {
            mainRef.current.style.scrollBehavior = 'auto';
        }

        if (messages.length > 10) {
            return;
        }
        mainRef.current.scrollTop = mainRef.current.scrollHeight;

    }, [messages]);

    useEffect(() => {
        fetchChatInfo();
        fetchMessages(chatId);
    }, [])




    useOnReceivedMessage(async (message) => {
        if (message.sender.id === userInfo.id) {
            return;
        }

        if (message.chat !== chatId) {
            audioService.play('notification');
            await notificationApiService.notify(message);
            return;
        }

        setMessages((prevState) => ([message, ...prevState]))
        setIsMessageReceived(true);
        audioService.play('messageReceived');
    })


    useEffect(() => {
        if (isMessageReceived) {
            mainRef.current.scrollTop = mainRef.current.scrollHeight+500;
            setIsMessageReceived(false);
        }
    }, [isMessageReceived]);


    return (
        <Page {...dragAndDropProps}>
            <ChatHeader userInfo={userInfo} chatInfo={chatInfo} onDeleteHistory={onDeleteHistory}/>
            <DefaultMain mainRef={mainRef}>
                {isDragging && <DragZone />}
                <MessageList lastMessageRef={lastMessageRef} messages={messages} witnessMessages={witnessMessages} userInfo={userInfo}/>
            </DefaultMain>
            <MessageForm messages={messages} setMessages={setMessages} setWitnessMessages={setWitnessMessages} userInfo={userInfo} chatInfo={chatInfo} mainRef={mainRef} droppedFiles={droppedFiles}/>
        </Page>
    );
};

export default ChatPage;