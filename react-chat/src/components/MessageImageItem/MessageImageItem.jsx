import React from 'react';

import classes from './MessageImageItem.module.scss';
const MessageImageItem = ({image}) => {
    return (
        <li className={classes.imageItem}>
            <img src={image}/>
        </li>
    );
};

export default MessageImageItem;