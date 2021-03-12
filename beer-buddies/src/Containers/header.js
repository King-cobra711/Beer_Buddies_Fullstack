import React from 'react';

import WelcomeMessage from '../Components/headerComps/welcomeMessage';

import classes from './header.module.css';

const header = () => {
    return (
    <div className={classes.MainContainer}>
    <div className={classes.Background}></div>
    <WelcomeMessage/>
    </div>
    )
}

export default header;