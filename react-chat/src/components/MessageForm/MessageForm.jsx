import React, {useContext, useEffect, useReducer, useRef, useState} from 'react';
import SendButton from "../UI/SendButton/SendButton.jsx";
import classes from "./MessageForm.module.scss";
import {ThemeContext} from "../../contexts/ThemeContext.jsx";
import {getTextColor} from "../../utils/getTextColor.js";
import {sendMessage} from "../../services/chatService.js";
const MessageForm = ({setMessages, setWitnessMessages, chatInfo, userInfo}) => {
    const {theme} = useContext(ThemeContext);
    const backgroundColor = theme.inputBackgroundColor;
    const textColor = getTextColor(backgroundColor);
    const [messageInput, setMessageInput] = useState('');

    const inputRef = useRef(null);

    const addNewMessage = (newMessage) => {
        const newMessageList = (prevMessages) => [...prevMessages, newMessage];
        setMessages(newMessageList);
        setWitnessMessages(prevWitnessMessage => [...prevWitnessMessage, newMessage]);
    }

    const onSendMessage = async (event)=> {
        event.preventDefault();
        if (!messageInput) {
            return;
        }
        setMessageInput('');
        const newMessage = await sendMessage(chatInfo.id,userInfo.id, messageInput);
        if (!newMessage) {
            return;
        }
        addNewMessage(newMessage);
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <form className={classes.messageForm} onSubmit={onSendMessage}>
            <input ref={inputRef} required={true} value={messageInput} onInput={(event) => setMessageInput(event.target.value)} className={classes.messageForm__input} style={{ backgroundColor: backgroundColor, color: textColor }}/>
            <SendButton>Отправить</SendButton>
        </form>
    );
};

export default MessageForm;