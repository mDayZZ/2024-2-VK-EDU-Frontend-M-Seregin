import React from 'react';

import classes from './MessageImageList.module.scss';
import MessageImageItem from "../MessageImageItem/MessageImageItem.jsx";

const MessageImageList = ({images}) => {
    return (
        <ul className={classes.imageList}>
            {images.map((image, index) => <MessageImageItem key={index} image={image}/>)}

        </ul>
    );
};

export default MessageImageList;