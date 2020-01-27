import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
        return [
          <ul class="navbar-nav">
            <li>
              <div class="dropdown">
                <button
                  class="btn btn-dark dropdown-toggle btn-md"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">
                  <img
                    alt="User profile"
                    class="rounded-circle"
                    width="40"
                    height="40"
                    src={this.props.auth.userImg}
                  />
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="/profiles">
                    Profile
                  </a>
                  <a class="dropdown-item" href="/api/logout">
                    Logout
                  </a>
                </div>
              </div>
            </li>
          </ul>,
        ];
    }
  }
  render() {
    return (
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link to={this.props.auth ? '/' : '/'} class="navbar-brand">
            Tamzoo
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <a class="nav-link" href="/profiles">
                  Dashboard <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <Link to={this.props.auth ? '/housedb' : '/'} class="nav-link">
                  House
                </Link>
              </li>
              <li class="nav-item">
                <Link to={this.props.auth ? '/surveys' : '/'} class="nav-link">
                  Auto
                </Link>
              </li>
              <li class="nav-item">
                <Link to={this.props.auth ? '/surveys' : '/'} class="nav-link">
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
