import React from 'react';
import classes from './SectionHeader.module.scss';
import Container from "../Container/Container.jsx";

const SectionHeader = ({children}) => {
    return (
        <div className={classes.sectionHeader}>
            <Container>
                {children}
            </Container>
        </div>
    );
};

export default SectionHeader;