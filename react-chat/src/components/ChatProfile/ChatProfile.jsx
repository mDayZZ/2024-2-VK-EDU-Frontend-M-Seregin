import React, {useEffect, useState} from 'react';

import classes from './ChatProfile.module.scss';
import RoundAvatar from "../UI/RoundAvatar/RoundAvatar.jsx";
import CopyLink from "../UI/CopyLink/CopyLink.jsx";
import {getMembersByChatId} from "../../services/chatService.js";
import UserListItem from "../UI/UserListItem/UserListItem.jsx";
import {useModal} from "../../contexts/ModalContext.jsx";
import UserProfile from "../UserProfile/UserProfile.jsx";
import {getDatetime} from "../../utils/date.js";
const ChatProfile = ({chatInfo, userInfo}) => {
    const {openModal} = useModal();
    const isGroup = chatInfo.is_group;
    const [chatMembers, setChatMembers] = useState(null);

    const fetchChatMembers = async () => {
        const fetchedMembers = await getMembersByChatId(chatInfo.id);
        console.log(fetchedMembers);
        setChatMembers(fetchedMembers);
    }

    useEffect(() => {
        if (isGroup) {
            fetchChatMembers();
        }
    }, []);

    const profileAvatar = chatInfo.profile_image_url;
    const profileName = chatInfo?.name || chatInfo?.username;
    const profileStatus = chatInfo?.status;
    const profileCreateDate = getDatetime(chatInfo?.created_at);

    const profileUserUsername = `@${chatInfo?.username}`;
    console.log(profileUserUsername)
    const profileUserEmail = chatInfo?.email;


    return (
        <div className={classes.chatProfile}>
            <div className={classes.chatProfile__info}>
                <div className={classes.chatProfile__headInfo}>
                    <RoundAvatar src={profileAvatar}/>
                    <div className={classes.chatProfile__headTitles}>
                        <h2>{profileName}</h2>
                        <p className={classes.chatProfile__status}>{profileStatus}</p>
                        {!isGroup && <><p> <CopyLink className={classes.chatProfile__username}>{profileUserUsername}</CopyLink></p></>}
                    </div>
                </div>
                <div className={classes.chatProfile__otherInfo}>
                    {isGroup && <p><b>Дата создания:</b> {profileCreateDate}</p> }
                    {!isGroup && <p><b>E-Mail:</b> {profileUserEmail}</p>}

                </div>
            </div>
            {isGroup && chatMembers &&
                <>
                    <h3>Участники</h3>
                    <ul className={classes.chatProfile__userList}>
                        {
                            chatMembers.map(chatMember => {
                                const userName = chatMember?.name || chatMember?.username;
                                const userStatus = chatMember?.status;
                                const userAvatar = chatMember?.profile_image_url;

                                const onUserItemClick = () => {
                                    openModal(<UserProfile profileInfo={chatMember} myInfo={userInfo}/>)
                                }
                                return <UserListItem key={chatMember.id} onClick={onUserItemClick} heading={userName}
                                                     comment={userStatus} avatarUrl={userAvatar}/>
                            })
                        }
                    </ul>
                </>

            }

        </div>
    );
};

export default ChatProfile;