import React, {useEffect, useState} from 'react';
import classes from "./UserProfile.module.scss";
import RoundAvatar from "../UI/RoundAvatar/RoundAvatar.jsx";
import CopyLink from "../UI/CopyLink/CopyLink.jsx";
import MyUserProfile from "../MyUserProfile/MyUserProfile.jsx";
import {getUserVisibleName} from "../../utils/getUserVisibleName.js";
import {useSelector} from "react-redux";
import {authSelector} from "../../store/auth/authSelectors.js";
import Button from "../UI/Button/Button.jsx";
import {authService} from "../../services/api/authService.js";
import {routes} from "../../utils/routes.js";
import {Navigate, useNavigate} from "react-router-dom";
import {useModal} from "../../contexts/ModalContext.jsx";
import ModalNewDM from "../ModalNewDM/ModalNewDM.jsx";
import UserHeader from "../UserHeader/UserHeader.jsx";
import TextButton from "../UI/TextButton/TextButton.jsx";

const UserProfile = ({profileInfo, setOnEdit, closeModal}) => {
    const navigate = useNavigate();
    const {user: userInfo} = useSelector(authSelector);
    const {openModal} = useModal();
    const isProfileMine = userInfo.id === profileInfo.id;
    const [isEdit, setIsEdit] = useState(false);
    const toggleIsEdit = () => setIsEdit(prevState => !prevState);
    const [isNewMessage, setIsNewMessage] = useState(false);

    const [info, setInfo] = useState(profileInfo);

    const [visibleAvatar, setVisibleAvatar] = useState(profileInfo.avatar);
    const [visibleTitle, setVisibleTitle] = useState(getUserVisibleName(profileInfo));
    const [visibleUsername, setVisibleUsername] = useState(`@${profileInfo.username}`);
    const [visibleBio, setVisibleBio] = useState(profileInfo.bio);


    const visibleStatus = '';

    const logout = () => {
        closeModal();
        authService.logout();
        navigate(routes.auth);
    }

    const updateVisibleStates = () => {
        setVisibleAvatar(info.avatar);
        setVisibleTitle(getUserVisibleName(info));
        setVisibleUsername(`@${info.username}`);
        setVisibleBio(info.bio);
    }

    const handlePrivateChatClick = () => {
        setIsNewMessage(true)
        return;
    }

    useEffect(() => {
        if (setOnEdit) {
            setOnEdit(() => () => {
                toggleIsEdit();
            });
        }
    }, [isEdit, setOnEdit]);


    useEffect( () => {
        if (!visibleTitle) {
            setVisibleTitle(profileInfo?.username);
        }
    }, [visibleTitle])

    useEffect(() => {
       setVisibleTitle(getUserVisibleName(info));
       updateVisibleStates();
    }, [isEdit])




    return (
        <div className={classes.userProfile}>
            <div className={classes.userProfile__info}>
                <UserHeader username={visibleUsername} avatar={visibleAvatar} status={visibleStatus} title={visibleTitle} />
                {!isNewMessage
                    ?
                    <>
                        {isProfileMine &&
                            <MyUserProfile info={info} setInfo={setInfo} visibleTitle={visibleTitle} setVisibleTitle={setVisibleTitle} profileInfo={profileInfo} isEdit={isEdit} toggleIsEdit={toggleIsEdit}/>
                        }

                        {!isEdit &&
                            <p>bio: {visibleBio}</p>
                        }
                        {isProfileMine &&
                            <Button onClick={logout}>Выйти</Button>
                        }

                        {!isProfileMine &&
                            <ul className='optionList'>
                                <li><TextButton  onClick={handlePrivateChatClick}>Личные сообщения</TextButton></li>
                            </ul>
                        }
                    </>

                    :

                    <ModalNewDM participant={profileInfo}/>

                }



            </div>
        </div>

    );
};

export default UserProfile;