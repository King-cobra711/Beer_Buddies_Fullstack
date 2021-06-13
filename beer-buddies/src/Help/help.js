import { React, useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

const Help = () => {
  let history = useHistory();
  const home = () => {
    history.push("/");
  };
  return (
    <div style={{ color: "black", backgroundColor: "white" }}>
      <button onClick={() => home()}>Main Menu</button>
      <h1>Beer Buddies Navigation guide</h1>
      <h2>Main menu</h2>
      <p>
        You do not have to be logged in to play the easy (tipsy) game mode.
        However, in order to:
        <ul>
          <li>play higher difficulty modes</li>
          <li>add friends</li>
          <li>have a profile page</li>
        </ul>
        You must register an account/log in. Click play to go to choose
        difficulty page. Click login to go to login/register page. click
        leaderboards to veiw current leaderboards of registered users.
      </p>
      <h2>Choose difficulty</h2>
      <ul>
        <li>Tipsy = Easy. 2 x 3 squares</li>
        <li>Drunk = Medium. 2 x 4 squares</li>
        <li>Hammered = Easy. 3 x 4 squares</li>
      </ul>
      <h2>Playing the game</h2>
      <p>
        The game will start when the first card is clicked. Once clicked the
        timer will start and you must match all the cards as quick as you can.
        The timer will stop once the last pair of cards is matched. If you are
        logged in, your score will be recorded, otherwise it will be displayed
        but not saved. To reset click the reset button and the timer will return
        to zero seconds and the cards will be flipped and shuffled.
      </p>
      <h2>Registered Users</h2>
      <p>
        Once registered/logged in a welcome message will be displayed with your
        username under the beerbuddies header. Click the user icon next to the
        right of your username to access your usercard or to log-out. You are
        also now able to access the higher difficulties however you must
        complete the previous difficulty in the qualifying time.
      </p>
      <h2>Usercard</h2>
      <p>
        When veiwing your usercard you can see details about your account. These
        include Level, Biography, scores etc. To edit you user details you can
        click the "cog/gear" icon to the top right. To add friends you can click
        the friends icon under your profile pic to the left.{" "}
      </p>
    </div>
  );
};
export default Help;
