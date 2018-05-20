import React from 'react';
import Bar from './Bar';
import { Accordion, AccordionItem } from "react-sanfona";

const BarList = (props) => {
    return <Accordion className="bar-list" rootTag="ul">
        {props.bars.map((bar, i) => {
            return <AccordionItem title={bar.barName} expanded={bar === 1} rootTag="li" className="bar-list-item">
                <Bar drinks={bar.drinks} key={i} />
              </AccordionItem>;
        })} 
      </Accordion>;
}

export default BarList;