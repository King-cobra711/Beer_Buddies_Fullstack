import React from 'react';
import PropTypes from 'prop-types';

import classes from './board.module.css';

import Card from '../Card/card';


export default function Board({ disabled, dimension, cards, flipped, solved, handleClick}) {
    return(
        <div
        className={classes.board}
        >
            {cards.map((card) => {
            return(
            <Card
                key={card.id}
                width={dimension / 3.5}
                height={dimension / 3.5}
                id={card.id}
                type={card.type}
                flipped={flipped.includes(card.id)}
                solved = {solved.includes(card.id)}
                handleClick={handleClick}
                disabled={disabled || solved.includes(card.id)}
            />)
            })}
        </div>
    )
}

Board.propTypes = {
    disabled: PropTypes.bool.isRequired,
    dimension: PropTypes.number.isRequired,
    cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    flipped: PropTypes.arrayOf(PropTypes.number).isRequired,
    solved: PropTypes.arrayOf(PropTypes.number).isRequired,
    handleClick: PropTypes.func.isRequired,
}