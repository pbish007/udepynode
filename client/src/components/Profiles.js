import React, { Component } from 'react';
import { connect } from 'react-redux';
import Payments from './Payments';

class Profiles extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <li> NOT Authorized</li>;
      default:
        return (
          <div className="container">
            <div className="card mb-3">
              <div className="row no-gutters">
                <div className="col-md-4 text-center p-container">
                  <img
                    alt="User profile"
                    className="rounded-circle"
                    width="200"
                    height="200"
                    src={this.props.auth.userImg}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">Google Profile</h5>
                    <p className="card-text">First Name: {this.props.auth.firstName} </p>
                    <p className="card-text">Last Name: {this.props.auth.lastName} </p>
                    <p className="card-text">email: {this.props.auth.userEmail} </p>
                    <p className="card-text">credits: {this.props.auth.credits} </p>
                    <p className="card-text">
                      <small className="text-muted">Last updated 3 mins ago</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-3">
              <div className="row no-gutters">
                <div className="col-md-2 text-center p-container">
                  <a className="nav-link text-black-50" href="/udetail">
                    <i className="med material-icons">directions_car</i>- Auto
                  </a>
                </div>
                <div className="col-md-10">
                  <div className="card-body">shit goes here</div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  }

  renderSideContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <li> NOT Authorized</li>;
      default:
        return <Payments />;
    }
  }

  render() {
    return (
      <div className="container p-container">
        <div className="row">
          <div className="col-2">{this.renderSideContent()}</div>

          <div className="col-10">{this.renderContent()}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Profiles);
