import React from 'react';
import classes from './UserListItem.module.scss';
import RoundAvatar from "../RoundAvatar/RoundAvatar.jsx";
import {getDatetime} from "../../../utils/date.js";
const UserListItem = ({avatarUrl, heading, comment, date, onItemClick}) => {
    return (
        <li>
            <button className={classes.userListItem__button} onClick={onItemClick}>
                <RoundAvatar src={avatarUrl}/>
                <div className={classes.userListItem__info}>
                    <h2 className={classes.userListItem__name}>{heading || '...'}</h2>
                    <p className={classes.userListItem__lastMessage}>{comment}</p>
                    <p className={classes.userListItem__lastMessageTime}>{date}</p>
                </div>
            </button>
        </li>
    );
};

export default UserListItem;