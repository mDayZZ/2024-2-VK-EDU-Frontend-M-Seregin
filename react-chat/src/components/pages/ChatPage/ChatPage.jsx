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
import Page from "../../UI/Page/Page.jsx";
import {useParams} from "react-router-dom";
import {useOnReceivedMessage} from "../../../hooks/useOnRecievedMessage.js";
import audioService from "../../../services/audioService.js";
import {useLoadMoreMessages} from "../../../hooks/useLoadMoreMessages.js";
import {useDragAndDropFiles} from "../../../hooks/useDragAndDropFiles.js";
import DragZone from "../../UI/DragZone/DragZone.jsx";
import {useSelector} from "react-redux";
import {authSelector} from "../../../store/auth/authSelectors.js";
import {useFetch} from "../../../hooks/useFetch.js";
import {chatService} from "../../../services/api/chatService.js";
import {messageService} from "../../../services/api/messageService.js";
import {notificationApiService} from "../../../services/notificationApiService.js";

const ChatPage = ({}) => {
    const {user: userInfo } = useSelector(authSelector);

    const { chatId } = useParams();
    const [chatInfo, setChatInfo] = useState(null);
    const [messages, setMessages] = useState([]);
    const [witnessMessages, setWitnessMessages] = useState([]);
    const [isMessageLoading, setIsMessageLoading] = useState(true);
    const [isNextPage, setIsNextPage] = useState(false);
    const mainRef = useRef(null);
    const [lastMessageRef] = useLoadMoreMessages({messages, setMessages, chatId, isNextPage, setIsNextPage, mainRef});

    const [fetchMessages, isMessagesLoading, messagesError] = useFetch(async () => {
        setIsMessageLoading(true)
        const {count, next, previous, results} = await messageService.getMessages({chatId});
        setMessages(results);
        setIsNextPage(!!next);
        setIsMessageLoading(false)
    });

    const [fetchChatInfo, isChatInfoLoading, chatInfoError] = useFetch(async () => {
        const fetchedChatInfo = await chatService.getChatInfo(chatId);
        setChatInfo(fetchedChatInfo);
    });

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