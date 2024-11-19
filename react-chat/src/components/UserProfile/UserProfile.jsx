// import React, {useEffect, useState} from 'react';
//
// import classes from './UserProfile.module.scss';
// import RoundAvatar from "../UI/RoundAvatar/RoundAvatar.jsx";
// import CopyLink from "../UI/CopyLink/CopyLink.jsx";
// import UserListItem from "../UI/UserListItem/UserListItem.jsx";
// import {changeUserInfo, getUserById} from "../../services/userService.js";
// import SendButton from "../UI/SendButton/SendButton.jsx";
// import DropdownButton from "../UI/DropdownButton/DropdownButton.jsx";
// import {Edit} from "@mui/icons-material";
// const UserProfile = ({profileInfo, myInfo}) => {
//
//     const [userInfo, setUserInfo] = useState(profileInfo);
//     const [isEditing, setIsEditing] = useState(false);
//
//     const isMine = userInfo.id === myInfo.id;
//
//     const [nameState, setNameState] = useState(profileInfo?.name || '');
//     const [emailState, setEmailState] = useState(profileInfo?.email ?? '');
//
//     const profileName = nameState || profileInfo.username;
//     const profileEmail = emailState || 'не указан';
//     const profileAvatar = profileInfo?.profile_image_url;
//     const profileStatus = profileInfo.status;
//     const profileUsername = profileInfo.username;
//
//     const openEditing = () => {
//         setIsEditing(true);
//     }
//
//     const updateData = async (newUser) => {
//         try {
//             await changeUserInfo(newUser, userInfo.id);
//             setNameState(newUser.name);
//             setEmailState(newUser.email);
//         } catch (e) {
//
//         }
//     }
//
//     const saveEditing = () => {
//         const newUserInfo = {...userInfo, name: nameState, email: emailState};
//         updateData(newUserInfo);
//         setUserInfo(newUserInfo);
//         setIsEditing(false);
//     }
//
//     const fetchUserInfo = async () => {
//         const fetchedUser = await getUserById(userInfo.id);
//         setUserInfo(fetchedUser);
//         setProfileName();
//         setProfileEmail(fetchedUser.email || '');
//     }
//
//     useEffect(() => {
//         if(!userInfo.id) {
//             return;
//         }
//         // fetchUserInfo();
//     }, []);
//
//
//
//     return (
//         <div className={classes.userProfile}>
//             <div className={classes.userProfile__info}>
//                 <div className={classes.userProfile__headInfo}>
//                     <RoundAvatar src={profileAvatar}/>
//                     <div className={classes.userProfile__headTitles}>
//                         {isEditing
//                             ? <input maxLength={15} value={nameState} onInput={(e) => setNameState(e.target.value)} className={classes.userProfile__input} />
//                             : <h2>{profileName}</h2>
//                         }
//
//
//                         <p className={classes.userProfile__status}>{profileStatus}</p>
//                         <p><CopyLink className={classes.userProfile__username}>@{profileUsername}</CopyLink></p>
//                     </div>
//                 </div>
//                 <div className={classes.userProfile__otherInfo}>
//                     {isMine && !isEditing && !userInfo.name && <p>Укажите имя пользователя</p>}
//                     <p>
//                         <b>Email: </b>
//                         <span>
//                             {isEditing
//                                 ? <input maxLength={60} value={emailState} onInput={(e) => setEmailState(e.target.value)}
//                                          className={classes.userProfile__input}/>
//                                 : profileEmail
//                             }
//                         </span>
//                     </p>
//
//                 </div>
//                 <div className={classes.userProfile__actions}>
//                     {isMine
//                         ?
//                         <>
//                             {isEditing
//                                 ? <button className={classes.userProfile__actionButton} onClick={saveEditing}>Сохранить
//                                     данные</button>
//                                 : <button className={classes.userProfile__actionButton} onClick={openEditing}>Изменить
//                                     данные</button>
//                             }
//                             <button className={classes.userProfile__actionButton}
//                                     onClick={() => {localStorage.clear(); location.reload()}}>Очистить localStorage
//                             </button>
//
//                         </>
//                         :
//                         <>
//                             <button className={classes.userProfile__actionButton}>Написать сообщение</button>
//                                 <button className={classes.userProfile__actionButton}>Заглушить пользователя</button>
//                                 <button className={classes.userProfile__actionButton}>Заблокировать пользователя</button>
//                             </>
//
//                     }
//
//                 </div>
//             </div>
//
//         </div>
//     );
// };
//
// export default UserProfile;


import React, {useEffect, useState} from 'react';
import {useUserContext} from "../../contexts/UserContext.jsx";
import classes from "./UserProfile.module.scss";
import RoundAvatar from "../UI/RoundAvatar/RoundAvatar.jsx";
import CopyLink from "../UI/CopyLink/CopyLink.jsx";
import MyUserProfile from "../MyUserProfile/MyUserProfile.jsx";
import {useAuth} from "../../contexts/AuthContext.jsx";
import {getUserVisibleName} from "../../utils/getUserVisibleName.js";

const UserProfile = ({profileInfo, setOnEdit}) => {
    const {user: userInfo} = useAuth();

    // const isSelf = userInfo.id === profileInfo.id;
    //
    // const [info, setInfo] = useState(profileInfo);
    // const [profileFirstName, setProfileFirstName] = useState(info.first_name);
    // const [profileLastName, setProfileLastName] = useState(info.last_name);
    //
    //
    // const [visibleName, setVisibleName] = useState(getUserVisibleName(profileInfo));
    // let bio = info.bio || 'не указан';
    // let profileAvatar = info?.avatar;
    // let profileStatus = info.status;
    // let profileUsername = `@${info.username}`;
    //
    //
    // const [isEdit, setIsEdit] = useState(false);
    // const toggleIsEdit = () => setIsEdit(prevState => !prevState);
    //
    // useEffect(() => {
    //     bio = info.bio || 'не указан';
    //     profileAvatar = info?.profile_image_url;
    //     profileUsername = `@${info.username}`;
    // }, [info])
    //
    // useEffect(() => {
    //     if (!visibleName) {
    //         setVisibleName(info?.username);
    //     }
    // }, [visibleName]);


    //
    // useEffect(() => {
    //     if (setOnEdit) {
    //         setOnEdit(() => () => {
    //             toggleIsEdit();
    //         });
    //     }
    // }, [isEdit, setOnEdit]);

    const isProfileMine = userInfo.id === profileInfo.id;
    const [isEdit, setIsEdit] = useState(false);
    const toggleIsEdit = () => setIsEdit(prevState => !prevState);

    const [info, setInfo] = useState(profileInfo);

    const [visibleAvatar, setVisibleAvatar] = useState(profileInfo.avatar);
    const [visibleTitle, setVisibleTitle] = useState(getUserVisibleName(profileInfo));
    const [visibleUsername, setVisibleUsername] = useState(`@${profileInfo.username}`);
    const [visibleBio, setVisibleBio] = useState(profileInfo.bio);

    const visibleStatus = '';

    const updateVisibleStates = () => {
        setVisibleAvatar(info.avatar);
        setVisibleTitle(getUserVisibleName(info));
        setVisibleUsername(`@${info.username}`);
        setVisibleBio(info.bio);
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
                <div className={classes.userProfile__headInfo}>
                    <RoundAvatar src={visibleAvatar}/>
                    <div className={classes.userProfile__headTitles}>
                        <h2>{visibleTitle}</h2>
                        <p className={classes.userProfile__status}>{visibleStatus}</p>
                        <p><CopyLink className={classes.userProfile__username}>{visibleUsername}</CopyLink></p>
                    </div>
                </div>

                {isProfileMine &&
                    <MyUserProfile info={info} setInfo={setInfo} visibleTitle={visibleTitle} setVisibleTitle={setVisibleTitle} profileInfo={profileInfo} isEdit={isEdit} toggleIsEdit={toggleIsEdit}/>
                }

                {!isEdit &&
                    <p>bio: {visibleBio}</p>
                }
            </div>
        </div>

    );
};

export default UserProfile;