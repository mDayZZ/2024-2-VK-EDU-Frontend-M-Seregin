import React from 'react';

const ParseLinks = ({text}) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) => {
        if (urlRegex.test(part)) {
            return (
                <a key={index} href={part} target="_blank" rel="noopener noreferrer">
                    {part}
                </a>
            );
        }
        return part;
    });
};

export default ParseLinks;