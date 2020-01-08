import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';
import Dropdown from './Dropdown';

class Header extends Component {
  renderContent() {
    switch (this.props.auth){
      case null:
          return;
      case false:
          return <li><a href="/auth/google">Login</a></li>;
      default:
//returning an array for the header
          return [
            <li key="1"><Payments /></li>,
            <li key="2" style={{ margin: '0 10px'}}> Credits: {this.props.auth.credits} </li>,

            <li key="3"style={{ margin: '0 10px'}}><Dropdown />
            <a class="dropdown-trigger" href="#!" data-target="dropdown1">
            <div class="chip">
              <img alt="User profile" class="circle responsive-img" width="30" height="30" src={this.props.auth.userImg}/>
              {this.props.auth.firstName}
            </div><i className="material-icons right">arrow_drop_down</i></a>
            </li>

        ];
    }
  }


  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
          <Link to= {this.props.auth ? '/' : '/'}
          class="navbar-brand">Tamzoo</Link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <a class="nav-link" href="#">Dashboard <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <Link to= {this.props.auth ? '/housedb': '/'}
                class="nav-link">House</Link>
              </li>
              <li class="nav-item">
                <Link to= {this.props.auth ? '/surveys': '/'}
                class="nav-link">Auto</Link>
                </li>
            </ul>
            <span class="navbar-text">
              Navbar text 
              <img alt="User profile" class="circle responsive-img" width="30" height="30" src={this.props.auth.userImg}/>
              {this.props.auth.firstName}
            </span>

          </div>
        </nav>

//      <nav className="blue">
//       <div className="nav-wrapper">
//          <Link to= {this.props.auth ? '/surveys' : '/'}
//          style={{ margin: '0 10px'}}
//          className="left brand-logo"
//          ><i className="material-icons left">house</i>
//          Tamzoo</Link>
//          <ul className="right hide-on-med-and-down">
//            {this.renderContent()}
//          </ul>
//        </div>
//       </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
