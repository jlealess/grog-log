import React from 'react';
import Bar from './Bar';

const BarList = (props) => {
    return (
        <ul className="bar-list">
            {props.bars.map((bar, i) => {
                return <Bar barName={bar.barName} drinks={bar.drinks} key={i} />
            })}
        </ul>
    )
}

export default BarList;