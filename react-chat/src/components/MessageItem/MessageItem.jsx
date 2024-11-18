import React, {forwardRef, useContext, useEffect, useMemo} from 'react';
import classes from './MessageItem.module.scss';
import RoundAvatar from "../UI/RoundAvatar/RoundAvatar.jsx";
import {getTextColor} from "../../utils/getTextColor.js";
import {ThemeContext} from "../../contexts/ThemeContext.jsx";
import {getDatetime} from "../../utils/date.js";
import {useTheme} from "../../hooks/useTheme.js";
import cn from "classnames";
import {getUserVisibleName} from "../../utils/getUserVisibleName.js";
import {getFileTypeByUrl} from "../../utils/fileInfo.js";
import MessageImageList from "../MessageImageList/MessageImageList.jsx";
import MessageFileList from "../MessageFileList/MessageFileList.jsx";
import ParseLinks from "../UI/ParseLinks.jsx";
const MessageItem = forwardRef(({message, isWitnessMessage, userInfo}, ref) => {
    const { backgroundColor, textColor } = useTheme('chatMessageBackgroundColor');

    const isSelf = userInfo.id === message?.sender.id;
    const senderName = getUserVisibleName(message.sender);
    const text = message.text ?? '';
    const date = getDatetime(message.created_at)
    const avatar = message?.sender.avatar;
    const voiceMessage = message.voice;

    const files = message?.files;

    const [filteredFiles, images] = useMemo(() => {
        if (!files) {
            return [null, null];
        }

        let filteredFiles = [];
        let images = [];
        files.forEach(file => {
            if (getFileTypeByUrl(file.item) === 'image') {
                images.push(file.item)
                return;
            }
            filteredFiles.push(file.item);
            return;
        })

        return [filteredFiles, images];
    }, [files])

    const messageItemClasses = cn(classes.message, isSelf ? classes['message--self'] : '')
    useEffect(() => {
        document.documentElement.style.setProperty('--message-bg-color', backgroundColor);
        document.documentElement.style.setProperty('--message-text-color', textColor);
    }, [backgroundColor, textColor]);

    return (
        <li className={messageItemClasses} data-loaded={!isWitnessMessage} ref={ref}>
            <RoundAvatar className={classes.message__avatar} src={avatar}/>
            <div className={classes.message__block}>
                <p className={classes.message__username}>{senderName}</p>

                <div className={classes.message__content}>
                    {voiceMessage
                        && <audio src={voiceMessage} controls/>
                    }
                    {images.length > 0 &&
                        <MessageImageList images={images}/>
                    }
                    {files.length > 0 &&
                        <MessageFileList files={filteredFiles} />
                    }
                    <p className={classes.message__text}><ParseLinks text={text}/></p>
                    <p className={classes.message__datetime}>{date}</p>
                </div>
            </div>
        </li>
    );
});

export default MessageItem;