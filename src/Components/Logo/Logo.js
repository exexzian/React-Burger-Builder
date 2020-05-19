import React from 'react';
import burgerLogo from '../../assets/images/logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.logo}>
        <img src={burgerLogo} title="Burger Builder" alt="Burger Builder"/>
    </div>
);

export default logo;