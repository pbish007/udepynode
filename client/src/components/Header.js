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
          return <li><a href="/auth/google">Login with Google</a></li>;
      default:
//returning an array for the header
          return [
            <li key="1"><Payments /></li>,
            <li key="2" style={{ margin: '0 10px'}}> Credits: {this.props.auth.credits} </li>,

            <li key="5"style={{ margin: '0 10px'}}><Dropdown />
            <a className="dropdown-trigger" href="#!" data-target="dropdown1">
            <div className="chip">
              <img alt="User profile" className="circle responsive-img" src={this.props.auth.userImg}/>
              {this.props.auth.firstName}
            </div><i className="material-icons right">arrow_drop_down</i></a>
            </li>

        ];
    }
  }


  render() {
    return (
      <nav className="grey">
        <div className="nav-wrapper">
          <Link to= {this.props.auth ? '/surveys' : '/'}
          style={{ margin: '0 10px'}}
          className="left brand-logo"
          >
          Frosty</Link>
          <ul className="right hide-on-med-and-down">
            {this.renderContent()}
          </ul>
        </div>
       </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
