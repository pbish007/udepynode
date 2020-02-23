import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import Landing from './Landings';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import Footer from './Footer';
import Profiles from './Profiles';
import UdetailForm from './userdetails/UdetailForm';
import HouseWizard from '../pages/house/addHouse';
import { fetchUser } from '../actions';
import { ROUTES } from '../constants';
import HouseDashboard from '../pages/house';
import HouseDetails from '../pages/house/houseDetails';
import { fetchHouses } from '../actions/house';
import EditHouse from '../pages/house/editHouse';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchHouses();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path={ROUTES.ADD_HOUSE} component={HouseWizard} />
          <Route exact path={ROUTES.HOUSE} component={HouseDashboard} />
          <Route exact path={ROUTES.HOUSE_DETAILS} component={HouseDetails} />
          <Route exact path={ROUTES.HOUSE_EDIT} component={EditHouse} />
          <Route exact path="/udetail" component={UdetailForm} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route exact path="/surveys/new" component={SurveyNew} />
          <Route exact path="/profiles" component={Profiles} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, { fetchUser, fetchHouses })(App);
