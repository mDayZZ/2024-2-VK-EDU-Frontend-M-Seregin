import React, {useEffect, useState} from 'react';

import classes from './UserProfile.module.scss';
import RoundAvatar from "../UI/RoundAvatar/RoundAvatar.jsx";
import CopyLink from "../UI/CopyLink/CopyLink.jsx";
import UserListItem from "../UI/UserListItem/UserListItem.jsx";
import {changeUserInfo, getUserById} from "../../services/userService.js";
import DefaultButton from "../UI/DefaultButton/DefaultButton.jsx";
import DropdownButton from "../UI/DropdownButton/DropdownButton.jsx";
import {Edit} from "@mui/icons-material";
const UserProfile = ({userId, myInfo}) => {
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    const isMine = userId === myInfo.id;

    const [editName, setEditName] = useState(null);
    const [editEmail, setEditEmail] = useState(null);

    const openEditing = () => {
        setIsEditing(true);
    }

    const fetchPostData = async (newUser) => {
        try {
            changeUserInfo(newUser, userId);
        } catch (e) {

        }
    }

    const saveEditing = () => {
        const newUserInfo = {...userInfo, name: editName, email: editEmail};
        fetchPostData(newUserInfo);
        setUserInfo(newUserInfo);
        setIsEditing(false);
    }

    const fetchUserInfo = async () => {
        setIsLoading(true);
        const fetchedUser = await getUserById(userId);
        setUserInfo(fetchedUser);
        setEditName(fetchedUser.name || '');
        setEditEmail(fetchedUser.email || '');
        setIsLoading(false);
    }

    useEffect(() => {
        if(!userId) {
            return;
        }
        fetchUserInfo();
    }, []);

    return (
        !isLoading &&
        <div className={classes.userProfile}>
            <div className={classes.userProfile__info}>
                <div className={classes.userProfile__headInfo}>
                    <RoundAvatar src={userInfo.profile_image_url}/>
                    <div className={classes.userProfile__headTitles}>
                        {isEditing
                            ? <input maxLength={15} value={editName} onInput={(e) => setEditName(e.target.value)} className={classes.userProfile__input} />
                            : <h2>{userInfo.name || userInfo.username}</h2>
                        }


                        <p className={classes.userProfile__status}>{userInfo.status}</p>
                        <p><CopyLink className={classes.userProfile__username}>@{userInfo.username}</CopyLink></p>
                    </div>
                </div>
                <div className={classes.userProfile__otherInfo}>
                    {isMine && !isEditing && !userInfo.name && <p>Укажите имя пользователя</p>}
                    {isEditing
                        ? <input maxLength={60} value={editEmail} onInput={(e) => setEditEmail(e.target.value)} className={classes.userProfile__input}/>
                        : <p><b>Email: </b>{userInfo.email || 'не указан'}</p>
                    }

                </div>
                <div className={classes.userProfile__actions}>
                    {isMine
                        ?
                        <>
                        {isEditing
                            ? <button className={classes.userProfile__actionButton} onClick={saveEditing}>Сохранить данные</button>
                            : <button className={classes.userProfile__actionButton} onClick={openEditing}>Изменить данные</button>
                        }
                            </>
                            :
                            <>
                                <button className={classes.userProfile__actionButton}>Написать сообщение</button>
                                <button className={classes.userProfile__actionButton}>Заглушить пользователя</button>
                                <button className={classes.userProfile__actionButton}>Заблокировать пользователя</button>
                            </>

                    }

                </div>
            </div>

        </div>
    );
};

export default UserProfile;