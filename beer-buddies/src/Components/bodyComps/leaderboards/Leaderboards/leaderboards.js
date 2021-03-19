import React from 'react';
import {useState, useEffect} from 'react';
import * as Mui from '@material-ui/core';


import classes from './leaderboard.module.css';

const Leaderboard = () => {
  const [allScores, setAllScores] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [toggleState, setToggleState] = useState(1);

  useEffect( () => {
    async function fetchAPI(){
      setLoaded(false);
      const request = await fetch('http://localhost:3001/scores', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify()
    }).then(req => {
        return req.json()
    })
    .then((data) => {
      console.log('lololbreaklolol');
      setAllScores(data);
      setLoaded(true);
      console.log(data);
      console.log(allScores);
      console.log(allScores[0]);
    })
    .catch(error => console.log('ERROR'))
  return request;
  }
    fetchAPI();

  }, []);



    const toggleTab = (number) => {
    setToggleState (number);
    }
    return (
    <div className = {classes.Display}>
      <ul className={classes.leaderBoardList}>
        <li><button 
        onClick={() => toggleTab(1)}
        className = {toggleState === 1 ? classes.selectedButton : classes.unSelectedButton }>Easy</button></li>
        <li><button 
        onClick={() => toggleTab(2)}
        className = {toggleState === 2 ? classes.selectedButton : classes.unSelectedButton }>Medium</button></li>
        <li><button 
        onClick={() => toggleTab(3)}
        className = {toggleState === 3 ? classes.selectedButton : classes.unSelectedButton }>Hard</button></li>
    </ul>
<table style={{width:"100%"}}
className = {toggleState === 1 ? classes.ActiveContent: classes.NotActiveContent}
>
  <tr>
    <th>#</th>
    <th>User</th>
    <th>Best time</th>
  </tr>
    {
      loaded ? allScores[0].map((arr, index)=>{
        return(
        <tr>
        <td>{(index + 1)}</td>
        <td>{arr.User_Name}</td>
        <td>{arr.Best_Score} sec</td>
        </tr>
        )
      }): <Mui.CircularProgress color="white"
      style={{position:'relative', left:'150%'}}
      />
}
</table>
    <table style={{width:"100%"}}
    className = {toggleState === 2 ? classes.ActiveContent: classes.NotActiveContent}
    >
  <tr>
    <th>#</th>
    <th>User</th>
    <th>Best time</th>
  </tr>
{
      loaded ? allScores[1].map((arr, index)=>{
        return(
        <tr>
        <td>{(index + 1)}</td>
        <td>{arr.User_Name}</td>
        <td>{arr.Best_Score} sec</td>
        </tr>
        )
      }): <Mui.CircularProgress color="white"
      style={{position:'relative', left:'150%'}}
      />
}
</table>



    <table style={{width:"100%"}}
    className = {toggleState === 3 ? classes.ActiveContent: classes.NotActiveContent}
    >
  <tr>
    <th>#</th>
    <th>User</th>
    <th>Best time</th>
  </tr>
  {
      loaded ? allScores[2].map((arr, index)=>{
        return(
        <tr>
        <td>{(index + 1)}</td>
        <td>{arr.User_Name}</td>
        <td>{arr.Best_Score} sec</td>
        </tr>
        )
      }): <Mui.CircularProgress color="white"
      style={{position:'relative', left:'150%'}}
      />
}

</table>
</div>
    )
}

export default Leaderboard;