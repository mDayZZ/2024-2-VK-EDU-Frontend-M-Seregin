import React from 'react';
import classes from './ParseLinks.module.scss';
const ParseLinks = ({text}) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) => {
        if (urlRegex.test(part)) {
            return (
                <a className={classes.parseLink} key={index} href={part} target="_blank" rel="noopener noreferrer">
                    {part}
                </a>
            );
        }
        return part;
    });
};

export default ParseLinks;