import React from 'react';
import DefaultHeader from "../UI/DefaultHeader/DefaultHeader.jsx";
import classes from "./ChatHeader.module.scss";
import {ArrowBack, DeleteOutline, Info, MoreVert} from "@mui/icons-material";
import RoundAvatar from "../UI/RoundAvatar/RoundAvatar.jsx";
import {pluralize} from "../../utils/pluralize.js";
import cn from "classnames";
import IconLink from "../UI/IconLink/IconLink.jsx";
import DropdownMenu from "../UI/DropDownMenu/DropdownMenu.jsx";
import {useModal} from "../../contexts/ModalContext.jsx";
import ChatProfile from "../ChatProfile/ChatProfile.jsx";
import {getParticipantInfo} from "../../utils/getParticipantInfo.js";

const ChatHeader = ({chatInfo, userInfo, className, onDeleteHistory}) => {
    const {openModal} = useModal();
    const headerClasses = cn('chatHeader', className, classes.chatHeader);

    const menuOptions = [
        {label: 'Профиль', onClick: () => openModal(<ChatProfile chatInfo={chatInfo} />), icon: <Info />},
        {label: 'Очистить историю', onClick: onDeleteHistory, icon: <DeleteOutline/>},
    ];
    const isPrivate = chatInfo?.is_private;
    const participant = getParticipantInfo(chatInfo?.members, userInfo);

    const getChatStatus = () => {
        if (!isPrivate) {
            const membersCount = chatInfo?.members.length;
            return pluralize(membersCount, 'участник', 'участника', 'участников');
        }
        return participant.is_online ? 'online' : 'offline';
    }

    const getChatAvatar = () => {
        if (!isPrivate) {
            return chatInfo?.avatar;
        }
        return participant?.avatar;
    }

    const chatTitle = chatInfo?.title ?? '...';
    let chatStatus = getChatStatus() ?? '...';
    const chatAvatar = getChatAvatar() || null;




    return (
        <DefaultHeader className={headerClasses}>
            <IconLink linkTo={'/chats'}><ArrowBack /></IconLink>
            <RoundAvatar src={chatAvatar} className={classes.chatHeader__chatAvatar} />
            <div className={classes.chatHeader__chatInfo}>
                <h2 className={classes.chatHeader__chatTitle}>{chatTitle}</h2>
                <p className={classes.chatHeader__chatStatus}>{chatStatus}</p>
            </div>
            <DropdownMenu icon={<MoreVert />} menuOptions={menuOptions}/>
        </DefaultHeader>
    );
};

export default ChatHeader;