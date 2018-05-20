import React from 'react';
import { NavLink, Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
        <header>
        <h1>
         <Link to="/">
            <img src="images/grog-log.svg" alt="Grog Log" />
          </Link>
        </h1>
        <nav>
          <ul>
            <li>
              <NavLink to="/add" activeClassName="active">
                Log
              </NavLink>
            </li>
            <li>
              <NavLink to="/bars" activeClassName="active">
                Grog
              </NavLink>
            </li>
            <li>
              <NavLink to="/search" activeClassName="active">
                Search
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;