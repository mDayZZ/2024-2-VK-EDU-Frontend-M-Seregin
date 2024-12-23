import React from 'react';
import classes from './UserListItem.module.scss';
import RoundAvatar from "../RoundAvatar/RoundAvatar.jsx";
import {getDatetime} from "../../../utils/date.js";
import {Link} from "react-router-dom";
const UserListItem = ({avatarUrl, heading, comment, date, linkTo, onClick, lastConversationRef}) => {

    const itemTitle = heading || '...';
    const itemComment = comment || '';
    const itemDate = date || '';


    return (
        <li ref={lastConversationRef}>
            {onClick
                ? <button className={classes.userListItem__button} onClick={onClick}>
                    <RoundAvatar src={avatarUrl}/>
                    <div className={classes.userListItem__info}>
                        <h2 className={classes.userListItem__name}>{itemTitle}</h2>
                        <p className={classes.userListItem__lastMessage}>{itemComment}</p>
                        <p className={classes.userListItem__lastMessageTime}>{itemDate}</p>
                    </div>
                </button>
                : <Link className={classes.userListItem__button} to={linkTo}>
                    <RoundAvatar src={avatarUrl}/>
                    <div className={classes.userListItem__info}>
                        <h2 className={classes.userListItem__name}>{itemTitle}</h2>
                        <p className={classes.userListItem__lastMessage}>{itemComment}</p>
                        <p className={classes.userListItem__lastMessageTime}>{itemDate}</p>
                    </div>
                </Link>

            }


        </li>
    );
};

export default UserListItem;