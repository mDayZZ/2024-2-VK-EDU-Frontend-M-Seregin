import React, {useEffect, useState} from 'react';

import classes from './UserProfile.module.scss';
import RoundAvatar from "../UI/RoundAvatar/RoundAvatar.jsx";
import CopyLink from "../UI/CopyLink/CopyLink.jsx";
import UserListItem from "../UI/UserListItem/UserListItem.jsx";
import {changeUserInfo, getUserById} from "../../services/userService.js";
import DefaultButton from "../UI/DefaultButton/DefaultButton.jsx";
import DropdownButton from "../UI/DropdownButton/DropdownButton.jsx";
import {Edit} from "@mui/icons-material";
const UserProfile = ({profileInfo, myInfo}) => {

    const [userInfo, setUserInfo] = useState(profileInfo);
    const [isEditing, setIsEditing] = useState(false);

    const isMine = userInfo.id === myInfo.id;

    const [nameState, setNameState] = useState(profileInfo?.name || '');
    const [emailState, setEmailState] = useState(profileInfo?.email ?? '');

    const profileName = nameState || profileInfo.username;
    const profileEmail = emailState || 'не указан';
    const profileAvatar = profileInfo?.profile_image_url;
    const profileStatus = profileInfo.status;
    const profileUsername = profileInfo.username;

    const openEditing = () => {
        setIsEditing(true);
    }

    const updateData = async (newUser) => {
        try {
            await changeUserInfo(newUser, userInfo.id);
            setNameState(newUser.name);
            setEmailState(newUser.email);
        } catch (e) {

        }
    }

    const saveEditing = () => {
        const newUserInfo = {...userInfo, name: nameState, email: emailState};
        updateData(newUserInfo);
        setUserInfo(newUserInfo);
        setIsEditing(false);
    }

    const fetchUserInfo = async () => {
        const fetchedUser = await getUserById(userInfo.id);
        setUserInfo(fetchedUser);
        setProfileName();
        setProfileEmail(fetchedUser.email || '');
    }

    useEffect(() => {
        if(!userInfo.id) {
            return;
        }
        // fetchUserInfo();
    }, []);



    return (
        <div className={classes.userProfile}>
            <div className={classes.userProfile__info}>
                <div className={classes.userProfile__headInfo}>
                    <RoundAvatar src={profileAvatar}/>
                    <div className={classes.userProfile__headTitles}>
                        {isEditing
                            ? <input maxLength={15} value={nameState} onInput={(e) => setNameState(e.target.value)} className={classes.userProfile__input} />
                            : <h2>{profileName}</h2>
                        }


                        <p className={classes.userProfile__status}>{profileStatus}</p>
                        <p><CopyLink className={classes.userProfile__username}>@{profileUsername}</CopyLink></p>
                    </div>
                </div>
                <div className={classes.userProfile__otherInfo}>
                    {isMine && !isEditing && !userInfo.name && <p>Укажите имя пользователя</p>}
                    <p>
                        <b>Email: </b>
                        <span>
                            {isEditing
                                ? <input maxLength={60} value={emailState} onInput={(e) => setEmailState(e.target.value)}
                                         className={classes.userProfile__input}/>
                                : profileEmail
                            }
                        </span>
                    </p>

                </div>
                <div className={classes.userProfile__actions}>
                    {isMine
                        ?
                        <>
                            {isEditing
                                ? <button className={classes.userProfile__actionButton} onClick={saveEditing}>Сохранить
                                    данные</button>
                                : <button className={classes.userProfile__actionButton} onClick={openEditing}>Изменить
                                    данные</button>
                            }
                            <button className={classes.userProfile__actionButton}
                                    onClick={() => {localStorage.clear(); location.reload()}}>Очистить localStorage
                            </button>

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