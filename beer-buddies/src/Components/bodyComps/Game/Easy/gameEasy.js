import React, { useState, useEffect } from 'react';

import initialiseDeck from './Deck/deck';
import Board from './Board/board';
import * as Mui from '@material-ui/core';

import classes from './gameEasy.module.css';

import Timer from './Timer/timer';




const Easy = () => {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [dimension, setDemension] = useState(400);
    const [solved, setSolved] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [started, setStarted] = useState(false);
    const [endGame, setEndGame] = useState(1);
    const [begin, setBegin] = useState(false);
    const [shuffle, setShuffle] = useState(false);



    useEffect(() => {
        resizedBoard()
        setCards(initialiseDeck())
    }, []);
    // useEffect(() => {
    //     setCards([])
    //     setCards(initialiseDeck())
    //     setSolved([])
    //     setDisabled(false)
    //     resizedBoard()
    //     setEndGame(1)
    // }, [begin]);


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
                console.log(endGame)
                resetCards()
            }
            else{
                setTimeout(resetCards, 2000)
            }
            if(endGame === 3){
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
    begin= {setBegin}
    />
    </li>
    {/* <li><Mui.Icon style={{fontSize: 30, color:"white", marginBottom:20, marginTop:20, marginLeft:33}}>timer</Mui.Icon></li> */}

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
export default Easy;