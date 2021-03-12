import './App.css';
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';


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
