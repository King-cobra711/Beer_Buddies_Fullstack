import React from 'react';
import { Link } from 'react-router-dom';


import Aux from '../../../hoc/aux';
import * as Mui from '@material-ui/core';
import classes from './mainMenu.module.css';

const mainMenu = () => {
    return (
    <Aux>
        <div className={classes.Display}>
        <Mui.Button 
        variant = "contained" 
        color = "default" size = "medium"
        component={ Link } to="/difficulty"
        endIcon={<Mui.Icon style={{ marginLeft: 5 }}>   
        play_circle_outline</Mui.Icon>}
        >PLAY</Mui.Button>

        <Mui.Button 
        href="/login"
        variant = "contained" 
        color = "default" 
        size = "medium"
        >LOGIN / Register</Mui.Button>

        <Mui.Button 
        href="/leaderboards"
        variant = "contained" 
        color = "default" 
        size = "medium">LEADERBOARDS</Mui.Button>
        <Mui.Button variant = "contained" color = "default" size = "medium">FIND FRIENDS</Mui.Button>
        </div>
    </Aux>
    )
}

export default mainMenu;