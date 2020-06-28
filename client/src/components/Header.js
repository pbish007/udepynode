import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';
import Payments from './Payments';
import {
  Box,
  Flex,
  Image,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Button,
  Divider,
} from '@chakra-ui/core';

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
          <Menu>
            <MenuButton as={Button} variantColor="black" rightIcon="chevron-down">
              <Image
                size="2rem"
                rounded="full"
                src={this.props.auth.userImg}
                alt="Profile Image"
                mr="12px"
              />
              <span>{this.props.auth.firstName}</span>
            </MenuButton>
            <MenuList>
              <MenuGroup title="Profile">
                <MenuItem>
                  <a href="/profiles">My Acccount</a>
                </MenuItem>
                <MenuItem>
                  <a href="/api/logout">Logout</a>
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title="Payment Center">
                <MenuItem>
                  <Payments />
                </MenuItem>
                <MenuItem>FAQ</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        );
    }
  }
  // This is the menu for the Dashboad House Auto Boat
  renderMenuContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return;
      default:
        //returning an array for the header
        return (
          <div>
            <Flex
              bg="white"
              w="100%"
              px={3}
              py={1}
              justifyContent="space-between"
              alignItems="center">
              <Flex flexDirection="row" justifyContent="center" alignItems="center">
                <Link to={this.props.auth ? '/dashboard' : '/'}>
                  <Text pl={3} color="Black">
                    Dashboard
                  </Text>
                </Link>
                <Link to={this.props.auth ? ROUTES.HOUSE : '/'}>
                  <Text pl={3} color="black">
                    Properties
                  </Text>
                </Link>
                {/*  blocked this until I have Auto and Boats
            <Link to={this.props.auth ? '/auto' : '/'} >
            <Text pl={3} color="black">
              Autos
            </Text>
            </Link>
            <Link to={this.props.auth ? '/boat' : '/'} >
            <Text pl={3} color="black">
              Boats
            </Text>
            </Link>
            */}
              </Flex>
              <Box></Box>
            </Flex>
            <Divider />
          </div>
        );
    }
  }

  // This will Render the header
  render() {
    return (
      <div className="container">
        <Flex bg="black" w="100%" px={5} py={2} justifyContent="space-between" alignItems="center">
          <Flex flexDirection="row" justifyContent="center" alignItems="center">
            <Link to={this.props.auth ? '/' : '/'}>
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Android_O_Preview_Logo.png"
                size={30}
              />
            </Link>
            <Link to={this.props.auth ? '/' : '/'}>
              <Text pl={3} color="white">
                Tamzoo
              </Text>
            </Link>
          </Flex>
          <Box>{this.renderContent()}</Box>
        </Flex>
        {this.renderMenuContent()}
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
