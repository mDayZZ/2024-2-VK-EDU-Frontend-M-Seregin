import React from 'react';
import UserProfile from "../UserProfile/UserProfile.jsx";
import UserListItem from "../UI/UserListItem/UserListItem.jsx";
import classes from "./ProfileMemberList.module.scss";
import {useModal} from "../../contexts/ModalContext.jsx";
const ProfileMemberList = ({chatMembers}) => {
    const {openModal, setOnModalEditButton} = useModal();
    return (
        <div>
            <h3>Участники</h3>
            <ul className={classes.profileMemberList}>
                {
                    chatMembers.map(chatMember => {
                        const userName = chatMember?.name || chatMember?.username;
                        const userStatus = chatMember?.is_online ? "online" : "offline";
                        const userAvatar = chatMember?.avatar;
                        const onUserItemClick = () => {
                            openModal(<UserProfile profileInfo={chatMember}/>)
                        }
                        return <UserListItem key={chatMember.id} onClick={onUserItemClick} heading={userName}
                                             comment={userStatus} avatarUrl={userAvatar}/>
                    })
                }
            </ul>
        </div>
    );
};

export default ProfileMemberList;