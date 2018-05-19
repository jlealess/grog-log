import React from 'react';
import { NavLink, Link } from 'react-router-dom';

class Header extends React.Component {
    render() {
        return (

         <header>
            <h1>
                <img src="images/grog-log.svg" alt="Grog Log" />
            </h1>
            <nav>
              <ul>
                <li>
                    <NavLink to="/add" activeClassName="active">Add</NavLink>
                </li>
                <li>
                    <NavLink to="/bars" activeClassName="active">Bars</NavLink>
                </li>
                <li>
                    <NavLink to="/search" activeClassName="active">Search</NavLink>
                </li>
              </ul>
            </nav>
          </header>
        );
    }
}

export default Header;