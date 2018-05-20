import React from 'react';

class Bar extends React.Component {
    /* Switch logic from: https://stackoverflow.com/questions/46592833/how-to-use-switch-statement-inside-a-react-component?rq=1 */
    renderSwitch(drinkRating) {
        switch (drinkRating) {
            case 'Bad':
                return <i className="fas fa-skull"></i>;
            case 'Good':
                return <i className="fas fa-fire" />;
            default:
                return '';
        }
    }    
    render() {
        return <div>
            <h3>{this.props.barName}</h3>
            <ul className="drinks-list accordion-content">
              {this.props.drinks.map((drink, i) => {
                return <li key={`drinks-${i}`}>
                    {drink.drinkName} 
                    {this.renderSwitch(drink.drinkRating)}
                    </li>;
              })}
            </ul>
          </div>;
    }
}

export default Bar;