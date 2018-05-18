import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    render() {
        return (

         <header>
            <h1>Grog Log</h1>
            <nav>
              <ul>
                <li>
                  <Link to="/add">Add</Link>
                </li>
                <li>
                    <Link to="/bars">Bars</Link>
                </li>
                <li>
                    <Link to="/search">Search</Link>
                </li>
              </ul>
            </nav>
          </header>
        );
    }
}

export default Header;