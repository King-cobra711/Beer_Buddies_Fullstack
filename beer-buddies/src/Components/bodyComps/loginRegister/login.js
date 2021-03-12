import React from 'react';

import Aux from '../../../hoc/aux';
import classes from './login.module.css';
import * as Mui from '@material-ui/core';

const login = () => {
    return (
    <Aux>
        <div className={classes.Display}>
        <form>
            <input 
            className={classes.inputLogin} 
            type="text"
            placeholder="USERNAME"
            >
            </input>
            <input 
            className={classes.inputLogin}
            type="password"
            placeholder="PASSWORD"
            ></input>
            <Mui.Button variant = "contained" color = "default" size = "medium">LOGIN</Mui.Button>
        </form>
        <p style={{color:"white", fontSize:"1.3em", margin:5}}>New users can register 
        <a 
        href="/register"
        style={{color:"white", fontSize:"1.3em", margin:5}}
        >HERE!</a>
        </p>
        <div style={{borderTop:"white dotted", width:"100%"}}>

            <Mui.Button 
            href="/"
            variant = "contained" 
            color = "default" 
            size = "medium" 
            >Main Menu</Mui.Button>
        </div>
        </div>
    </Aux>
    )
}

export default login;