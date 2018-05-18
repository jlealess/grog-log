import React from 'react';

const Bar = (props) => {
    return (
        <li>
            <h3>{props.barName}</h3>
            <ul className="drinks-list">
                {props.drinks.map((drink, i) => {
                    return <li key={`drinks-${i}`}>{drink.drinkName} - {drink.drinkRating}</li>
                })}
            </ul>
        </li>
    );
}

export default Bar;