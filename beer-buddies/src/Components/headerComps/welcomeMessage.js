import React from 'react';
import classes from './welcomMessage.module.css';
import * as Mui from '@material-ui/core';
import {Link} from 'react-router-dom';

const WelcomeMessage = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Logout = () => {
  fetch('http://localhost:3001/logout', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(),
        }).then((res)=>{
          console.log(res);
          res.json().then((data)=>{
          console.log(data);
        })
        }).catch(error => console.log(error));
  }

    return (
    <div className={classes.MessageBox}>
    <Mui.Grid container spacing={1}>
        <Mui.Grid item xs={10}>
            <h3> Welcome USER!</h3>
        </Mui.Grid>
        <Mui.Grid item xs={2}>
            <Mui.Avatar 
            variant="square"
            className={classes.ProfilPic} src="/broken-image.jpg" ria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}/>
            <Mui.Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Mui.MenuItem 
        component={Link} to='/usercard'
        onClick={handleClose}>Edit Profile</Mui.MenuItem>
        <Mui.MenuItem 
        onClick={handleClose && Logout}
        >Logout</Mui.MenuItem>
        <Mui.MenuItem onClick={handleClose} style={{borderTop:"grey solid"}}>Admin</Mui.MenuItem>
      </Mui.Menu>
        </Mui.Grid>
    </Mui.Grid>
    </div>
    )
}

export default WelcomeMessage;