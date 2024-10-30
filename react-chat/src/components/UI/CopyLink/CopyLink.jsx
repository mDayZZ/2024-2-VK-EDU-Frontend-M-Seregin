import React from 'react';
import classes from "./CopyLink.module.scss";
import cn from "classnames";

const CopyLink = ({children, className}) => {

    const text = children.join('');
    const copyLinkClasses = cn(classes.copyLink, className)
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            console.log('ссылка скопирована в буфер обмена')
        } catch (e) {
            console.error('Ошибка копирования текста');
        }
    }

    return (
        <button className={copyLinkClasses} onClick={handleCopy}>{children}</button>
    );
};

export default CopyLink;