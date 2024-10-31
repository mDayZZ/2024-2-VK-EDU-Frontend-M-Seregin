import React, {useEffect, useState} from 'react';

import classes from './ChatProfile.module.scss';
import RoundAvatar from "../UI/RoundAvatar/RoundAvatar.jsx";
import CopyLink from "../UI/CopyLink/CopyLink.jsx";
import {getMembersByChatId} from "../../services/chatService.js";
import UserListItem from "../UI/UserListItem/UserListItem.jsx";
import {useModal} from "../../contexts/ModalContext.jsx";
import UserProfile from "../UserProfile/UserProfile.jsx";
const ChatProfile = ({chatInfo, userInfo}) => {
    const {openModal} = useModal();
    const isGroup = chatInfo.is_group;
    const [chatMembers, setChatMembers] = useState(null);

    const fetchChatMembers = async () => {
        const fetchedMembers = await getMembersByChatId(chatInfo.id);
        setChatMembers(fetchedMembers);
    }

    useEffect(() => {
        if (isGroup) {
            fetchChatMembers();
        }
    }, []);

    console.log(chatMembers)
    return (
        <div className={classes.chatProfile}>
            <div className={classes.chatProfile__info}>
                <div className={classes.chatProfile__headInfo}>
                    <RoundAvatar src={chatInfo.profile_image_url}/>
                    <div className={classes.chatProfile__headTitles}>
                        <h2>{chatInfo.name || chatInfo.username}</h2>
                        <p className={classes.chatProfile__status}>{chatInfo.status}</p>
                        {!isGroup && <><p> <CopyLink className={classes.chatProfile__username}>@{chatInfo.username}</CopyLink></p></>}
                    </div>
                </div>
                <div className={classes.chatProfile__otherInfo}>
                    {isGroup && <p><b>Дата создания:</b> {chatInfo.created_at}</p> }
                    {!isGroup && <p><b>E-Mail:</b> {chatInfo.email}</p>}

                </div>
            </div>
            {isGroup && chatMembers &&
                <>
                    <h3>Участники</h3>
                    <ul className={classes.chatProfile__userList}>
                        {chatMembers.map(chatMember => <UserListItem onClick={() => openModal(<UserProfile userId={chatMember.id} myInfo={userInfo}/>)} heading={chatMember.name || chatMember.username} comment={chatMember.status} avatarUrl={chatMember.profile_image_url}/>)}
                    </ul>
                </>

            }

        </div>
    );
};

export default ChatProfile;