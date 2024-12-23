import React from 'react';

import classes from './MessageImageItem.module.scss';
import {useLazyImage} from "../../hooks/useLazyImage.js";
const MessageImageItem = ({image}) => {

    const imageRef = useLazyImage(image);

    return (
        <li className={classes.imageItem}>
            <img ref={imageRef} src={image}/>
        </li>
    );
};

export default MessageImageItem;