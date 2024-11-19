import React, {useContext, useEffect, useReducer, useRef, useState} from 'react';
import SendButton from "../UI/SendButton/SendButton.jsx";
import classes from "./MessageForm.module.scss";
import {ThemeContext} from "../../contexts/ThemeContext.jsx";
import {getTextColor} from "../../utils/getTextColor.js";
import {sendMessage} from "../../services/chatService.js";
import {messagesApi} from "../../services/api/messages/index.js";
import {useAuth} from "../../contexts/AuthContext.jsx";
import audioService from "../../services/audioService.js";
const MessageForm = ({messages, setMessages, setWitnessMessages, chatInfo, mainRef}) => {
    const {theme} = useContext(ThemeContext);
    const {user} = useAuth();
    const backgroundColor = theme.inputBackgroundColor;
    const textColor = getTextColor(backgroundColor);
    const [messageInput, setMessageInput] = useState('');
    const [isSent, setIsSent] = useState(false);

    const inputRef = useRef(null);

    const addNewMessage = (newMessage) => {
        audioService.play('messageSent');
        const newMessageList = (prevMessages) => [newMessage, ...prevMessages];
        setMessages(newMessageList);
        setWitnessMessages(prevWitnessMessage => [newMessage, ...prevWitnessMessage]);
        setIsSent(true);
    }

    const onSendMessage = async (event)=> {
        event.preventDefault();
        if (!messageInput) {
            return;
        }
        setMessageInput('');

        const message = {
            chat: chatInfo.id,
            text: messageInput,
            // voice: null,
            // files: null,
        }

        const fetchedMessage = await messagesApi.sendMessage(message);
        if (!fetchedMessage) {
            return;
        }
        addNewMessage({...fetchedMessage, sender: user});
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        if (isSent) {
            mainRef.current.scrollTop = mainRef.current.scrollHeight+500;
            setIsSent(false);
        }
    }, [isSent])

    return (
        <form className={classes.messageForm} onSubmit={onSendMessage}>
            <input ref={inputRef} required={true} value={messageInput} onInput={(event) => setMessageInput(event.target.value)} className={classes.messageForm__input} style={{ backgroundColor: backgroundColor, color: textColor }}/>
            <SendButton>Отправить</SendButton>
        </form>
    );
};

export default MessageForm;