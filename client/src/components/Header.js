import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';
//import Payments from './Payments';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return;
      default:
        //returning an array for the header
        return (
          <ul className="navbar-nav">
            <li>
              <div className="dropdown">
                <button
                  className="btn btn-dark dropdown-toggle btn-md"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">
                  <img
                    alt="User profile"
                    className="rounded-circle"
                    width="40"
                    height="40"
                    src={this.props.auth.userImg}
                  />
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="/profiles">
                    Profile
                  </a>
                  <a className="dropdown-item" href="/api/logout">
                    Logout
                  </a>
                </div>
              </div>
            </li>
          </ul>
        );
    }
  }
  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link to={this.props.auth ? '/' : '/'} className="navbar-brand">
            Tamzoo
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="/profiles">
                  Dashboard <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <Link to={this.props.auth ? ROUTES.HOUSE : '/'} className="nav-link">
                  House
                </Link>
              </li>
              <li className="nav-item">
                <Link to={this.props.auth ? '/surveys' : '/'} className="nav-link">
                  Auto
                </Link>
              </li>
              <li className="nav-item">
                <Link to={this.props.auth ? '/surveys' : '/'} className="nav-link">
                  Boat
                </Link>
              </li>
            </ul>
            {this.renderContent()}
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
