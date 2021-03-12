import React from 'react';



import * as Mui from '@material-ui/core';
import classes from './leaderboards.module.css';
import Leaderboard from './Leaderboards/leaderboards';








const Leaderboards = () => {
    return (
    <div className={classes.DisplayContainer}>
      <Mui.StylesProvider injectFirst>
    <Mui.Grid container spacing={0} style={{margin:0, padding:0}}>
        <Mui.Grid item xs={3}>
  <div className={classes.Display}>

    <Mui.Button 
    style={{marginTop:10}}
    href="/"
    variant = "contained" 
    color = "default" 
    size = "medium">HOME</Mui.Button>

    <Mui.Button 
    style={{margin:5, marginBottom: 30}}
    href="/difficulty"
    variant = "contained" 
    color = "default" 
    size = "medium">PLAY</Mui.Button>
    <div className={classes.paraFix}>
    <div style={{width:"100%", borderBottom:"rgba(117, 117, 245, 0.767) double", paddingBottom:"10px"}}>
      <p>USERNAME</p>
      <p>Your Scores</p>
    </div>
    <div style={{width:"100%", borderBottom:"rgba(117, 117, 245, 0.767) double"}}>
    <p>Easy</p>
    <p>10sec</p>
    </div>
    <div style={{width:"100%", borderBottom:"rgba(117, 117, 245, 0.767) double"}}>
    <p>Medium</p>
    <p>15sec</p>
    </div>
    <div style={{width:"100%", borderBottom:"rgba(117, 117, 245, 0.767) double"}}>
    <p>Hard</p>
    <p>15sec</p>
    </div>
    </div>
  </div>
    </Mui.Grid>
    <Mui.Grid item xs={9}>
    <div className={classes.Display} style={{borderRight:0}}>
    <Leaderboard/>
    </div>
</Mui.Grid>
</Mui.Grid>
</Mui.StylesProvider>
</div>
    )
}

export default Leaderboards;