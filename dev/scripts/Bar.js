import React from 'react';

class Bar extends React.Component {
    /* Switch logic from: https://stackoverflow.com/questions/46592833/how-to-use-switch-statement-inside-a-react-component?rq=1 */
    renderSwitch(drinkRating) {
        switch (drinkRating) {
            case 'Bad':
                return <i class="fas fa-skull"></i>;
            case 'Good':
                return <i class="fas fa-fire"></i>;
            default:
                return '';
        }
    }    
    render() {
        return (
            <li>
                <h3>{this.props.barName}</h3>
                <ul className="drinks-list">
                    {this.props.drinks.map((drink, i) => {
                        return <li key={`drinks-${i}`}>{drink.drinkName} {this.renderSwitch(drink.drinkRating)}</li>
                    })}
                </ul>
            </li>
        );
    }
}

export default Bar;