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
            <p className="text-white">Welcome: {this.props.auth.firstName} </p>
          </div>
        );
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="jumbotron iris">
          <div className="container introduction">
            <h3 className="text-white font-weight-bold">
              We&apos;ll help you manage your tangibles
            </h3>
            {this.renderContent()}
          </div>
        </div>
        <div className="container">
          <h2 className="text-black-50 font-weight-bold text-center">Manage your Assets</h2>
          <p></p>
        </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <i className="large material-icons text-center">house</i>
            </div>
            <div className="col">
              <i className="large material-icons text-center">directions_car</i>
            </div>
            <div className="col">
              <i className="large material-icons text-center">directions_boat</i>
            </div>
            <div className="col">
              <i className="large material-icons text-center">motorcycle</i>
            </div>
            <div className="col">
              <i className="large material-icons text-center">rv_hookup</i>
            </div>
          </div>
        </div>
        <div className="container">
          <h2 className="text-black-50 font-weight-bold text-center">---</h2>
        </div>

        <div className="row row-cols-1 row-cols-md-3">
          <div className="col mb-4">
            <div className="card">
              <img src="../house-img.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title text-center">Know your Assts</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.
                </p>
              </div>
            </div>
          </div>
          <div className="col mb-4">
            <div className="card">
              <img src="repair-team.jpeg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Keep Track of the Support Team</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.
                </p>
              </div>
            </div>
          </div>
          <div className="col mb-4">
            <div className="card">
              <img src="../car-lineup.jpeg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Know the Value</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural lead-in to
                  additional content.
                </p>
              </div>
            </div>
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
