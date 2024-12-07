import React, {useContext, useEffect, useState} from 'react';
import classes from './SendButton.module.scss';
import {ThemeContext} from "../../contexts/ThemeContext.jsx";
import {getTextColor} from "../../utils/getTextColor.js";
import cn from "classnames";
import {KeyboardVoice, Send, SendOutlined, Stop} from "@mui/icons-material";
import {useTheme} from "@mui/material";
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