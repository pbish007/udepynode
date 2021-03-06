import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { handleToken } from '../actions';
import { Button } from '@chakra-ui/core';

class Payments extends Component {
  render() {
    //    debugger;

    return (
      <StripeCheckout
        // amount is in cents
        name="Frosty"
        description="$5 for 5 credits"
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}>
        <Button variantColor="teal" size="sm">
          Add Credits
        </Button>
      </StripeCheckout>
    );
  }
}

export default connect(null, { handleToken })(Payments);
