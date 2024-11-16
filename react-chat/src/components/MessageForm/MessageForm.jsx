import React, {useContext, useEffect, useReducer, useRef, useState} from 'react';
import SendButton from "../SendButton/SendButton.jsx";
import classes from "./MessageForm.module.scss";
import {ThemeContext} from "../../contexts/ThemeContext.jsx";
import {getTextColor} from "../../utils/getTextColor.js";
import {sendMessage} from "../../services/chatService.js";
import {messagesApi} from "../../services/api/messages/index.js";
import {useAuth} from "../../contexts/AuthContext.jsx";
import audioService from "../../services/audioService.js";
import {useVoiceMode} from "../../hooks/useVoiceMode.js";
import {useInputFocusOnStart} from "../../hooks/useInputFocusOnStart.js";
import {useAttachFiles} from "../../hooks/useAttachFiles.js";
import IconLink from "../UI/IconLink/IconLink.jsx";
import IconButton from "../UI/IconButton/IconButton.jsx";
import {AttachFile, InsertDriveFile, LocationOn} from "@mui/icons-material";
import DropdownMenu from "../UI/DropDownMenu/DropdownMenu.jsx";
const MessageForm = ({messages, setMessages, setWitnessMessages, chatInfo, mainRef}) => {
    const {theme} = useContext(ThemeContext);
    const {user} = useAuth();
    const backgroundColor = theme.inputBackgroundColor;
    const textColor = getTextColor(backgroundColor);
    const [messageInput, setMessageInput] = useState('');
    const [isSent, setIsSent] = useState(false);
    const menuOptions = [
        {icon: <InsertDriveFile fontSize='small' />, label: 'Прикрепить файлы', onClick: () => {console.log('files')}},
        {icon: <LocationOn fontSize='small' />, label: 'Геопозиция', onClick: () => {console.log('geo')}},

    ]


    const {inputRef} = useInputFocusOnStart();
    const {isVoiceMode, voiceFile, voiceStatus, onVoiceRecording, onVoiceStopRecord, onVoiceSent    } = useVoiceMode({messageInput});
    const {attachedFiles, } = useAttachFiles();


    const addNewMessage = (newMessage) => {
        audioService.play('messageSent');
        const newMessageList = (prevMessages) => [newMessage, ...prevMessages];
        setMessages(newMessageList);
        setWitnessMessages(prevWitnessMessage => [newMessage, ...prevWitnessMessage]);
        setIsSent(true);
    }

    const onSendMessage = async (event)=> {
        event.preventDefault();

        console.log('sem')

        if (!messageInput && !voiceFile) {
            return;
        }

        const messageFormData = new FormData();

        messageFormData.append('chat', chatInfo.id);

        if (voiceFile) {
            messageFormData.append('voice', voiceFile);
        } else {
            messageFormData.append('text', messageInput);
        }


        try {
            setMessageInput('');
            const fetchedMessage = await messagesApi.sendMessage(messageFormData);
            onVoiceSent();
            addNewMessage({...fetchedMessage, sender: user});
        } catch (e) {
            console.error('error sending message', e);
        }

    }



    useEffect(() => {
        if (isSent) {
            mainRef.current.scrollTop = mainRef.current.scrollHeight+500;
            setIsSent(false);
        }
    }, [isSent])


    useEffect(() => {
        document.documentElement.style.setProperty('--input-bg-color', backgroundColor);
        document.documentElement.style.setProperty('--input-text-color', textColor);
    }, [backgroundColor, textColor]);


    return (
        <form className={classes.messageForm} onSubmit={onSendMessage}>
            {voiceStatus === 'pending' &&
                <>
                    <DropdownMenu className={classes.messageForm__attachButton} icon={ <AttachFile fontSize='small' />} menuOptions={menuOptions} />
                    <input className={classes.messageForm__fileInput} type="file" multiple/>

                <input ref={inputRef} required={true} value={messageInput}
                onInput={(event) => setMessageInput(event.target.value)} className={classes.messageForm__input}/>

                </>
            }

            {(isVoiceMode === true && voiceStatus === 'recorded' && voiceFile) &&
                <audio controls>
                    <source src={URL.createObjectURL(voiceFile)}/>
                </audio>
            }
            <SendButton messageInput={messageInput} isVoiceMode={isVoiceMode} voiceStatus={voiceStatus}
                        onVoiceRecording={onVoiceRecording} onVoiceStopRecord={onVoiceStopRecord}/>
        </form>
    );
};

export default MessageForm;