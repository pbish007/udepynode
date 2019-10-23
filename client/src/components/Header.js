import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="http://localhost:3000" className="left brand-logo">Frosty</a>
          <ul className="right">
            <li>
              <a href="https://localhost:3000">
              login with Google</a>
            </li>
           </ul>
          </div>
       </nav>
    );
  }
}

export default Header;
