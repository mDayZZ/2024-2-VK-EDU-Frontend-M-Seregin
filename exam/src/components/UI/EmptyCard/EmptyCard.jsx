import React from 'react';
import classes from './EmptyCard.module.scss';

const EmptyCard = () => {
    return (
        <div className={classes.card}>
            <p>История пуста</p>
        </div>
    );
};

export default EmptyCard;