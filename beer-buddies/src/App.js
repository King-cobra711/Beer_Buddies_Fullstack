import './App.css';
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';
import React, {useState, useEffect} from 'react';


import MainMenu from './Components/bodyComps/mainMenu/mainMenu';
import Header from './Containers/header';
import Easy from './Components/bodyComps/Game/Easy/gameEasy';
import Medium from './Components/bodyComps/Game/Medium/gameMedium';
import Hard from './Components/bodyComps/Game/Hard/gameHard';
import ChooseDifficulty from './Components/bodyComps/chooseDifficulty/chooseDifficulty';
import Login from './Components/bodyComps/loginRegister/login';
import Register from './Components/bodyComps/register/register';
import Leaderboards from './Components/bodyComps/leaderboards/leaderboard';
import UserCard from './Components/bodyComps/userCard/userCard';

function App() {

  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
        fetch('http://localhost:3001/login', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify()
    }).catch(error => console.log(error)).then((res)=>{
        console.log(res);
        if(res.status === 200){
            res.json().then((data)=>{
                console.log(data.User[0])
                console.log(data.loggedIn)
                setLoginStatus(data.loggedIn)
            })
        }
        else if(res.status === 401){
            res.json().then((data)=>{
                console.log(data)
                console.log(data.loggedIn)
                setLoginStatus(data.loggedIn)
            })
        }else{
            res.json().then((data)=>{
                console.log(data)
            })
        }
        }).catch(error => console.log(error))
    }, [])

  return (
    <BrowserRouter>
    <div className="App">
    
    <Route path="/" render={() =>
    <Header/>}>
    </Route>

    <Route path="/" exact render={() =>
    <MainMenu/>}>
    </Route>

    <Route path="/difficulty" render={() =>
    <ChooseDifficulty/>}>
    </Route>

    <Route path="/easy" render={() =>
    <Easy/>}>
    </Route>

    <Route path="/medium" render={() =>
    <Medium/>}>
    </Route>

    <Route path="/hard" render={() =>
    <Hard/>}>
    </Route>

    <Route path="/login" render={() =>
    <Login/>}>
    </Route>

    <Route path="/register" render={() =>
    <Register/>}>
    </Route>

    <Route path="/leaderboards" render={() =>
    <Leaderboards/>}>
    </Route>
    <Route path="/usercard" render={() =>
    <UserCard/>}>
    </Route>
    </div>
    </BrowserRouter>
  );
}

export default App;
