import React from 'react';
import { Link } from 'react-router-dom';

import Coors from '../../../Assets/images/Profile Pictures/coorsLogo.png';
import classes from './userCard.module.css';
import * as Mui from '@material-ui/core'

const UserCard = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const [onOff, setSwitch] = React.useState(true);
    const handleSwitch = (onOff) => {
        setSwitch(!onOff);
    }

    return (
    <div className={classes.Display}>


    <Mui.Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Mui.Fade in={open}>
          <div className={classes.modalMessage}>
            
            <Mui.Grid component="label" container alignItems="center" spacing={2}>
          <Mui.Grid item xs={6}>Edit: </Mui.Grid>
          <Mui.Grid item xs={6}>
              <Mui.Button
              style={{padding:5, margin:10, width:'100%'}} 
        variant = "contained" 
        color = "default" size = "medium"
        // component={ Link } to="/difficulty"
        endIcon={<Mui.Icon style={{ marginLeft: 5 }}>   
        gradient</Mui.Icon>}
        >Theme</Mui.Button>
              <Mui.Button 
        style={{padding:5, margin:10, width:'100%'}}
        variant = "contained" 
        color = "default" size = "medium"
        // component={ Link } to="/difficulty"
        endIcon={<Mui.Icon style={{ marginLeft: 5 }}>   
        create</Mui.Icon>}
        >Biography</Mui.Button>
              <Mui.Button
        style={{padding:5, margin:10, width:'100%'}}
        variant = "contained" 
        color = "default" size = "medium"
        // component={ Link } to="/difficulty"
        endIcon={<Mui.Icon style={{ marginLeft: 5 }}>   
        photo</Mui.Icon>}
        >Picture</Mui.Button>
          </Mui.Grid>

          <Mui.Grid component="label" container alignItems="center" spacing={2}>
          <Mui.Grid item xs={6}
          style={{marginLeft:5}}
          >Dark Mode: </Mui.Grid>
          <Mui.Grid item >Off</Mui.Grid>
          <Mui.Grid item >
            <Mui.Switch
            onClick={() => handleSwitch(onOff)}
            checked={onOff}
            />
          </Mui.Grid>
          <Mui.Grid item >On</Mui.Grid>
          </Mui.Grid>
        </Mui.Grid>
          </div>
        </Mui.Fade>
      </Mui.Modal>





        <ul className={classes.Navbar}>
        <li><Link to="/">
        <button
        >Main Menu</button>
        </Link>
        </li>
        <li><Link to="/difficulty">
        <button
        >Play</button>
        </Link>
        </li>
        <li><Link to="/leaderboards">
        <button
        >Leaderboards</button>
        </Link>
        </li>
    </ul>
    <Mui.Grid container spacing={0}>
        <Mui.Grid item xs={3}>
            <img 
            style={{width:75, height:75, margin:'20px', border: 'blue solid 2px'}}
            src={Coors} alt="coors beer logo"
            />
            <Mui.Icon
            style={{color:'white', border:'white solid 3px', padding:5}}
            >group</Mui.Icon>
        </Mui.Grid>
        <Mui.Grid 
        style={{textAlign:'start'}}
        item xs={9}>
            <Mui.Icon
            onClick={handleOpen}
            style={{color:'white',margin: "0px 10px 0px 5px", fontSize:'2em', float:'right'}}
            >settings</Mui.Icon>
            <p style={{paddingLeft:10}}>Date joined: 07/01/1994</p>
            <p
            style={{paddingLeft:10}}>Username: King cobra711</p>
            <p
            style={{paddingLeft:10}}>Biography: kfjvbdf;bkjd;jknvfd;jkbndfg;jkndbgjnhb</p>
        </Mui.Grid>
        <Mui.Grid item xs={4}>
            <h2><u>Easy</u></h2>
        </Mui.Grid>
        <Mui.Grid item xs={4}>
            <h2><u>Medium</u></h2>
        </Mui.Grid>
        <Mui.Grid item xs={4}>
            <h2><u>Hard</u></h2>
        </Mui.Grid>
        <Mui.Grid item xs={4}>
            <p >11sec</p>
        </Mui.Grid>
        <Mui.Grid item xs={4}>
            <p>14sec</p>
        </Mui.Grid>
        <Mui.Grid item xs={4}>
            <p>18sec</p>
        </Mui.Grid>
        <Mui.Grid item xs={4}>
            <p>Date</p>
        </Mui.Grid>
        <Mui.Grid item xs={4}>
            <p>Date</p>
        </Mui.Grid>
        <Mui.Grid item xs={4}>
            <p>Date</p>
        </Mui.Grid>
      </Mui.Grid>
    </div>
    )
}

export default UserCard;