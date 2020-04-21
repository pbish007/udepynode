import React, { Component } from 'react';
import { connect } from 'react-redux';

class Landing extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <p>
            <a href="/auth/google" className="btn btn-light btn-sm text-black" type="button">
              Login with Google
            </a>
          </p>
        );
      default:
        return (
          <div className="container">
            <p className="text-black">Welcome: {this.props.auth.firstName} </p>
          </div>
        );
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="jumbotron iris">
          <div className="container introduction">
            <h1 className="text-black font-weight-bold">
              We&apos;ll help you manage your tangibles
            </h1>
            {this.renderContent()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Landing);
