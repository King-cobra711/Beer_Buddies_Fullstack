import React from 'react';

import classes from './gameMedium.module.css';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const gameMeduim = () => {
    return(
<div>
  <ul className={classes.Display}>

    <li>
      <Button 
      href="/"
      variant = "contained" 
      color = "default" 
      size = "medium">HOME</Button>
    </li>

    <li>
      <Button 
      variant = "contained" 
      color = "default" size = "medium">LEADERBOARDS</Button>
    </li>

    <li><Icon style={{fontSize: 30, color:"white", marginBottom:20, marginTop:20, marginLeft:33}}>timer</Icon></li>

  </ul>
  <div className={classes.outer}>
  <div className={classes.row}>
    <div className={classes.item}></div>
    <div className={classes.item}></div>
  </div>
  <div className={classes.row}>
    <div className={classes.item}></div>
    <div className={classes.item}></div>
  </div>
  <div className={classes.row}>
    <div className={classes.item}></div>
    <div className={classes.item}></div>
  </div>
  <div className={classes.row}>
    <div className={classes.item}></div>
    <div className={classes.item}></div>
  </div>
  </div>
</div>
    )
}
export default gameMeduim;