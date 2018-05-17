import React from 'react';

const Bar = (props) => {
    return (
        <li>
            <h3>{props.barName}</h3>
            <p>{props.drinkName} – {props.drinkRating}</p>
        </li>
    );
}

export default Bar;