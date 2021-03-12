import React from 'react';

import Aux from '../../../hoc/aux';
import classes from './chooseDifficulty.module.css';
import * as Mui from '@material-ui/core';

const chooseDifficulty = () => {
    return (
    
    <Aux>
        <div className={classes.Display}>
        <h2 style={{color:"white"}}>Choose difficulty</h2>

        <Mui.Button 
        href="/easy"
        variant = "contained" 
        color = "default" 
        size = "medium">TIPSY</Mui.Button>

        <Mui.Button 
        href="/medium"
        variant = "contained" 
        color = "default" 
        size = "medium">DRUNK</Mui.Button>

        <Mui.Button 
        href="/hard"
        variant = "contained" 
        color = "default" 
        size = "medium"
        // disabled
        // style={{backgroundColor:"white", color:"rgba(0, 0, 0, 0.596)"}}
        // endIcon={<Mui.Icon>lock_clock</Mui.Icon>}
        >HAMMERED</Mui.Button>

        <div style={{borderTop:"white dotted", width:"100%"}}>
        
        <Mui.Button 
        href="/"
        variant = "contained" 
        color = "default" 
        size = "medium">MAIN MENU</Mui.Button>
        </div>
        </div>
    </Aux>
    )
}

export default chooseDifficulty;