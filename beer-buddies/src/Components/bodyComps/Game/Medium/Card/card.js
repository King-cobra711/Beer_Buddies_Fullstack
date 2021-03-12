import React from 'react';
import PropTypes from 'prop-types';

import Back from '../../../../../Assets/images/cards/Back.png';


import classes from './card.module.css';




export default function Card({
    handleClick, 
    id,
    height, 
    width,
    type, 
    disabled,
    solved, 
    flipped}) {
    return(
        <div 
        className={`${classes.flippedContainer} ${flipped ? classes.flipped : ''}`}
        style={{height, width}}
        onClick={() => disabled ? null : handleClick(id)}
        >
        <div
        className= {classes.flipper}>
            <img
            className={flipped ? classes.front : classes.back}
            src={flipped || solved ? `/cards/${type}.png`: Back}
            alt = 'card'
            style={{height, width}}
            />
        </div>
        </div>
    )
}

Card.propTypes = {
    handleClick: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    flipped: PropTypes.bool.isRequired,
    solved: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
}