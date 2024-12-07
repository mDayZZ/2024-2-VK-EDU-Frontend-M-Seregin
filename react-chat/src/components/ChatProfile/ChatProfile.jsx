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
import ProfileMemberList from "../ProfileMemberList/ProfileMemberList.jsx";
import {getParticipantInfo} from "../../utils/getParticipantInfo.js";
import {useSelector} from "react-redux";
import {authSelector} from "../../store/auth/authSelectors.js";
const ChatProfile = ({chatInfo}) => {
    const {openModal, setOnModalEditButton} = useModal();
    const {user} = useSelector(authSelector);
    const isPrivate = chatInfo.is_private;
    const [chatMembers, setChatMembers] = useState(chatInfo.members)
    const participant = isPrivate ? getParticipantInfo(chatMembers, user) : null;


    const profileAvatar = chatInfo?.avatar;
    const profileName = chatInfo?.title || getUserVisibleName(chatInfo);
    const profileStatus = chatInfo?.status;
    const profileCreateDate = getDatetime(chatInfo?.created_at);

    const profileUserUsername = participant && `@${participant?.username}`;
    const profileUserEmail = chatInfo?.email;


    return (
        <div className={classes.chatProfile}>
            <div className={classes.chatProfile__info}>
                <div className={classes.chatProfile__headInfo}>
                    <RoundAvatar src={profileAvatar}/>
                    <div className={classes.chatProfile__headTitles}>
                        <h2>{profileName}</h2>
                        <p className={classes.chatProfile__status}>{profileStatus}</p>
                        {isPrivate &&
                            <p>
                                <CopyLink className={classes.chatProfile__username}>{profileUserUsername}</CopyLink>
                            </p>
                        }
                    </div>
                </div>
                <div className={classes.chatProfile__otherInfo}>
                    {!isPrivate && <p><b>Дата создания:</b> {profileCreateDate}</p>}
                </div>
            </div>
            {!isPrivate && chatMembers &&
                <ProfileMemberList chatMembers={chatInfo.members} />
            }

        </div>
    );
};

export default ChatProfile;