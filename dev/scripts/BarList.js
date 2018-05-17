import React from 'react';
import Bar from './Bar';

const BarList = (props) => {
    return (
        <ul className="bar-list">
            {props.drinks.map((drink, i) => {
                return <Bar barName={drink.barName} drinkName={drink.drinkName} drinkRating={drink.drinkRating} key={i} />
            })}
            {/* Bars would go here */}
        </ul>
    )
}

export default BarList;