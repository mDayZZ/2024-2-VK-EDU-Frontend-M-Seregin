import React from 'react';
import classes from './SendButton.module.scss';
import cn from "classnames";
import {KeyboardVoice, Send, Stop} from "@mui/icons-material";

const SendButton = ({className, isVoiceMode,  onVoiceRecording, onVoiceStopRecord, voiceStatus}) => {
    const buttonClasses = cn(className, classes.sendButton);

    const voiceButton = () => {
        if (voiceStatus === 'recording') {
            return <button type='button' className={buttonClasses} onClick={onVoiceStopRecord}><Stop/></button>;
        }
        if (voiceStatus === 'recorded') {
            return <button type='submit' className={buttonClasses}><Send/></button>
        }

        return <button type='button' className={buttonClasses} onClick={onVoiceRecording}><KeyboardVoice/></button>;
    }


    return (
        isVoiceMode
        ? voiceButton()
        : <button type='submit' className={buttonClasses} ><Send/></button>

)
    ;
};

export default SendButton;