import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';



class Profiles extends Component {

  renderContent() {
    switch (this.props.auth){
      case null:
          return;
      case false:
          return <li>PROBLEM</li>;
      default:
          return [
            <div class="container">

            <div class="card mb-3">
              <div class="row no-gutters">
                <div class="col-md-4 text-center p-container">
                  <img alt="User profile" class="rounded-circle" width="200" height="200"  src={this.props.auth.userImg}/>
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">Google Profile</h5>
                    <p class="card-text">First Name: {this.props.auth.firstName} </p>
                    <p class="card-text">Last Name: {this.props.auth.lastName} </p>
                      <p class="card-text">email: {this.props.auth.userEmail} </p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                  </div>
                </div>
              </div>
            </div>



          </div>
        ];
    }
  }

  render() {
    return (

      <div class="container p-container">
        <div class="row">
          <div class="col-2">
          <ul class="nav flex-column">
            <li class="nav-item">
                <a class="nav-link text-black-50" href="#"><i className="med material-icons">house</i>- Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-black-50" href="#"><i className="med material-icons">directions_car</i>- Auto</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-black-50" href="#"><i className="med material-icons">directions_boat</i>- Boat</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-black-50" href="#"><i className="med material-icons">motorcycle</i>- Bike</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-black-50" href="#"><i className="med material-icons">rv_hookup</i>-RV</a>
            </li>
          </ul>
        </div>

        <div class="col-10">
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

export default connect(mapStateToProps)(Profiles);
