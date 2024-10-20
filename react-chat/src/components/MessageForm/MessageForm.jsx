import React, {useContext, useState} from 'react';
import DefaultButton from "../UI/DefaultButton/DefaultButton.jsx";
import classes from "./MessageForm.module.scss";
import {ThemeContext} from "../../contexts/ThemeContext.jsx";
import {getTextColor} from "../../utils/getTextColor.js";
import {sendMessage} from "../../services/chatService.js";
const MessageForm = ({setMessages, setWitnessMessages, chatInfo, userInfo}) => {
    const {theme} = useContext(ThemeContext);
    const backgroundColor = theme.chatFormBackgroundColor;
    const textColor = getTextColor(backgroundColor);
    const [messageInput, setMessageInput] = useState('');

    const addNewMessage = (newMessage) => {
        const newMessageList = (prevMessages) => [...prevMessages, newMessage];
        setMessages(newMessageList);
        setWitnessMessages(prevWitnessMessage => [...prevWitnessMessage, newMessage]);
    }

    const onSendMessage = async (event)=> {
        event.preventDefault();
        if (messageInput) {
            setMessageInput('');
            const newMessage = await sendMessage(chatInfo.id,userInfo.id, messageInput);
            if (newMessage) {
                addNewMessage(newMessage);

            }
        }
    }

    return (
        <form className={classes.messageForm} onSubmit={onSendMessage}>
            <input required={true} value={messageInput} onInput={(event) => setMessageInput(event.target.value)} className={classes.messageForm__input} style={{ backgroundColor: backgroundColor, color: textColor }}/>
            <DefaultButton>Отправить</DefaultButton>
        </form>
    );
};

export default MessageForm;