import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';

const Dashboard = () => {
  return (
    // NEW Stuff

    <div>
    This is the Dashboad for all properties, boats, autos
    </div>

    <div className="container">
      <div className="row">
        <div className="col s3">
          <div className="btn-floating red btn-small white-text bottom">
            <Link to="/surveys/new">
              <i className="large material-icons">add</i>
            </Link>
          </div>

        </div>

        <div className="col s9">
          <p>
            <SurveyList />
          </p>
        </div>
      </div>
    </div>
  );
};

//console.log({this.props.auth.userImg}):

export default Dashboard;
