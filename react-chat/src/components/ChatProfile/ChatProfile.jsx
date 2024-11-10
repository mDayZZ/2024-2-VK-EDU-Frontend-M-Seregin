import React, {useEffect, useState} from 'react';

import classes from './ChatProfile.module.scss';
import RoundAvatar from "../UI/RoundAvatar/RoundAvatar.jsx";
import CopyLink from "../UI/CopyLink/CopyLink.jsx";
import {getMembersByChatId} from "../../services/chatService.js";
import UserListItem from "../UI/UserListItem/UserListItem.jsx";
import {useModal} from "../../contexts/ModalContext.jsx";
import UserProfile from "../UserProfile/UserProfile.jsx";
import {getDatetime} from "../../utils/date.js";
import {getUserVisibleName} from "../../utils/getUserVisibleName.js";
const ChatProfile = ({chatInfo}) => {
    const {openModal, setOnModalEditButton} = useModal();
    const isPrivate = chatInfo.is_private;
    const [chatMembers, setChatMembers] = useState(chatInfo.members);


    const profileAvatar = chatInfo?.avatar;
    const profileName = chatInfo?.title || getUserVisibleName(chatInfo);
    const profileStatus = chatInfo?.status;
    const profileCreateDate = getDatetime(chatInfo?.created_at);

    const profileUserUsername = `@${chatInfo?.username}`;
    const profileUserEmail = chatInfo?.email;


    return (
        <div className={classes.chatProfile}>
            <div className={classes.chatProfile__info}>
                <div className={classes.chatProfile__headInfo}>
                    <RoundAvatar src={profileAvatar}/>
                    <div className={classes.chatProfile__headTitles}>
                        <h2>{profileName}</h2>
                        <p className={classes.chatProfile__status}>{profileStatus}</p>
                        {isPrivate && <><p> <CopyLink className={classes.chatProfile__username}>{profileUserUsername}</CopyLink></p></>}
                    </div>
                </div>
                <div className={classes.chatProfile__otherInfo}>
                    {!isPrivate && <p><b>Дата создания:</b> {profileCreateDate}</p> }
                    {isPrivate && <p><b>E-Mail:</b> {profileUserEmail}</p>}

                </div>
            </div>
            {!isPrivate && chatMembers &&
                <>
                    <h3>Участники</h3>
                    <ul className={classes.chatProfile__userList}>
                        {
                            chatMembers.map(chatMember => {
                                const userName = chatMember?.name || chatMember?.username;
                                const userStatus = chatMember?.status;
                                const userAvatar = chatMember?.profile_image_url;

                                const onUserItemClick = () => {
                                    openModal(<UserProfile profileInfo={chatMember}/>)
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