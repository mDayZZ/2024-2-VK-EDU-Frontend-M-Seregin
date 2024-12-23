import React, {useEffect, useReducer, useRef, useState} from 'react';
import SendButton from "../SendButton/SendButton.jsx";
import classes from "./MessageForm.module.scss";
import audioService from "../../services/audioService.js";
import {useVoiceMode} from "../../hooks/useVoiceMode.js";
import {useInputFocusOnStart} from "../../hooks/useInputFocusOnStart.js";
import {useAttachFiles} from "../../hooks/useAttachFiles.js";
import {AttachFile, InsertDriveFile, LocationOn} from "@mui/icons-material";
import DropdownMenu from "../UI/DropDownMenu/DropdownMenu.jsx";
import AttachedFileList from "../AttachedFileList/AttachedFileList.jsx";
import {authSelector} from "../../store/auth/authSelectors.js";
import {useSelector} from "react-redux";
import {useFetch} from "../../hooks/useFetch.js";
import {messageService} from "../../services/api/messageService.js";
import {useTheme} from "../../hooks/useTheme.js";

const MessageForm = ({messages, setMessages, setWitnessMessages, chatInfo, mainRef, droppedFiles}) => {
    const {user} = useSelector(authSelector);
    const {backgroundColor, textColor} = useTheme('input');
    const [messageInput, setMessageInput] = useState('');
    const [isSent, setIsSent] = useState(false);
    const menuOptions = [
        {icon: <InsertDriveFile fontSize='small' />, label: 'Прикрепить файлы', onClick: () => {fileInputRef.current.click()}},
        {icon: <LocationOn fontSize='small' />, label: 'Геопозиция', onClick: () => {sendGeolocation()}},
    ]


    const {inputRef} = useInputFocusOnStart();
    const {attachedFiles, fileInputRef, onFileInputChange, onDeleteAttachedFile, onFilesSent} = useAttachFiles({droppedFiles});
    const {isVoiceMode, voiceFile, voiceStatus, onVoiceRecording, onVoiceStopRecord, onVoiceSent    } = useVoiceMode({messageInput, attachedFiles});

    const [fetchSendMessage, isMessageLoading, error] = useFetch(async(messageForm) => {
        setMessageInput('');
        const fetchedMessage = await messageService.sendMessage(messageForm);
        onVoiceSent();
        onFilesSent();
        addNewMessage({...fetchedMessage, sender: user});
    })

    const sendGeolocation = () => {
        const sendMessage = async (geoLink)=> {

            const messageFormData = new FormData();

            messageFormData.append('chat', chatInfo.id);
            messageFormData.append('text', geoLink);

            try {
                await fetchSendMessage(messageFormData);
            } catch (e) {
                console.error('error sending message', e);
            }

        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const link = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
                sendMessage(link);
            },
            (error) => {
                console.error('Error getting location:', error);
            }
        );
    }


    const addNewMessage = (newMessage) => {
        audioService.play('messageSent');
        const newMessageList = (prevMessages) => [newMessage, ...prevMessages];
        setMessages(newMessageList);
        setWitnessMessages(prevWitnessMessage => [newMessage, ...prevWitnessMessage]);
        setIsSent(true);
    }

    const onSendMessage = async (event)=> {
        event.preventDefault();

        if (!messageInput && !voiceFile && !attachedFiles) {
            return;
        }

        const messageFormData = new FormData();

        messageFormData.append('chat', chatInfo.id);

        if (voiceFile) {
            messageFormData.append('voice', voiceFile);
        } else {
            messageFormData.append('text', messageInput);
            attachedFiles.forEach(file => messageFormData.append('files', file))
        }


        try {
            await fetchSendMessage(messageFormData);
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
            <div className={classes.messageForm__actions}>
                {voiceStatus === 'pending' &&
                    <>
                        <DropdownMenu className={classes.messageForm__attachButton} icon={<AttachFile fontSize='small'/>}
                                      menuOptions={menuOptions}/>
                        <input ref={fileInputRef} className={classes.messageForm__fileInput} type="file" multiple onChange={onFileInputChange}/>
                        <AttachedFileList attachedFiles={attachedFiles} onDeleteFile={onDeleteAttachedFile}/>
                        <input ref={inputRef} value={messageInput} onInput={(event) => setMessageInput(event.target.value)} className={classes.messageForm__input}/>
                    </>
                }

                {(isVoiceMode === true && voiceStatus === 'recorded' && voiceFile) &&
                    <audio controls>
                        <source src={URL.createObjectURL(voiceFile)}/>
                    </audio>
                }
            </div>

            <SendButton messageInput={messageInput} isVoiceMode={isVoiceMode} voiceStatus={voiceStatus}
                        onVoiceRecording={onVoiceRecording} onVoiceStopRecord={onVoiceStopRecord}/>
        </form>
    );
};

export default MessageForm;