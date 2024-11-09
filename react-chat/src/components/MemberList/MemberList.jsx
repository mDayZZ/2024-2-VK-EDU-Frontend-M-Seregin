import React from 'react';
import classes from "../MemberList/MemberList.module.scss";
import RoundAvatar from "../UI/RoundAvatar/RoundAvatar.jsx";

const MemberList = ({users, userInfo, handleCheckboxChange, chosenMembers}) => {



    return (
        <ul className={classes.memberList}>

            {users &&
                users.map(user => {
                    if (user.id === userInfo.id) {
                        return;
                    }
                    const userName = user?.name || user.username;
                    const userAvatar = user.profile_image_url;

                    return (
                        <li key={user.id}>
                            <label>
                                <div className={classes.memberList__profileItem}>
                                    <input type="checkbox"
                                           onChange={() => handleCheckboxChange(user.id)}
                                           checked={chosenMembers.includes(user.id)}/>
                                    <RoundAvatar className={classes.createChat__avatar} src={userAvatar}/>
                                    <p>{userName}</p>
                                </div>
                            </label>

                        </li>
                    )
                })
            }
        </ul>
    );
};

export default MemberList;