import React, { useState, useEffect } from 'react';

import initialiseDeck from './Deck/deck';
import Board from './Board/board';

import * as Mui from '@material-ui/core';

import classes from './gameHard.module.css';
import Timer from './Timer/timer';





const Hard = () => {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [dimension, setDemension] = useState(400);
    const [solved, setSolved] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [started, setStarted] = useState(false);
    const [endGame, setEndGame] = useState(1);
    const [shuffle, setShuffle] = useState(false);



    useEffect(() => {
        resizedBoard()
        setCards(initialiseDeck())
    }, []);

    // useEffect(() => {
    //     return(preloadImages())
    // }, cards);

    useEffect(() =>{
        const resizedListener = window.addEventListener('resize', resizedBoard)
        
        return () => window.removeEventListener('resize', resizedListener)
    });

    const handleClick = (id) => {
        setDisabled(true);
        setStarted(true);
        if(flipped.length === 0){
        setFlipped([id]);
        setDisabled(false);
        } else {
            if (sameCardClicked(id))return
            setFlipped([flipped[0], id])
            if(isMatch(id)){
                setSolved([...solved, flipped[0], id])
                setEndGame(endGame + 1)
                resetCards()
            }
            else{
                setTimeout(resetCards, 2000)
            }
            if(endGame === 6){
                setStarted(false)
                setShuffle(false)
            }
    };
}

    // const preloadImages = () => {
    //     return(
    //     cards.map(card => {
    //         const src = `/cards/${card.type}.png`
    //         return(
    //             new Image().src = src
    //         )
            
    //     }))
    // }

    const resetCards = () => {
        setFlipped([])
        setDisabled(false)
    }

    const sameCardClicked = (id) => flipped.includes(id)

    const isMatch = (id) => {
        const clickedCard = cards.find((card) => card.id === id)
        const flippedCard = cards.find((card) => flipped[0] === card.id)
        return (flippedCard.type === clickedCard.type)
    }

    const resizedBoard = () => {
        setDemension(Math.min(
            document.documentElement.clientWidth,
            document.documentElement.clientHeight,
            ), 
            )
    }
    
    return(
        <div>
            <ul className={classes.Display}>

    <li>
      <Mui.Button 
      href="/"
      variant = "contained" 
      color = "default" 
      size = "medium">HOME</Mui.Button>
    </li>

    <li><Timer
    setEndGame={setEndGame}
    setDisabled={setDisabled}
    setSolved={setSolved}
    setFlipped={setFlipped}
    setCards={setCards}
    started = {started}
    isStarted= {setStarted}
    /></li>

  </ul>
        <Board
        dimension = {dimension}
        cards={cards}
        flipped={flipped}
        handleClick={handleClick}
        disabled = {disabled}
        solved = {solved}
        />
        </div> 
    )
}
export default Hard;