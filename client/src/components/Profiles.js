import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Avatar, Badge } from '@chakra-ui/core';

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
        return (
          <div>
            <Box
              pl="10"
              pr="10"
              pt="10"
              pb="10"
              maxW="xs"
              borderWidth="1px"
              rounded="lg"
              overflow="hidden"
              width="250px">
              <Avatar size="2xl" name={this.props.auth.firstName} src={this.props.auth.userImg} />
              <Box p="4">
                <Box d="flex" alignItems="baseline">
                  <Badge rounded="full" px="2" variantColor="teal">
                    Credits: {this.props.auth.credits}
                  </Badge>
                </Box>

                <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                  {this.props.auth.fullName}
                </Box>

                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase">
                  {this.props.auth.userEmail}
                </Box>
              </Box>
            </Box>
          </div>
        );
    }
  }

  render() {
    return <div className="container">{this.renderSideContent()}</div>;
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Profiles);
