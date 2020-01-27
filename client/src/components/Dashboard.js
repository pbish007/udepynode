import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';

const Dashboard = () => {
  return (
    // NEW Stuff
    <div class="container">
      <div class="row">
        <div class="col s3">
          <div className="btn-floating red btn-small white-text bottom">
            <Link to="/surveys/new">
              <i className="large material-icons">add</i>
            </Link>
          </div>
        </div>

        <div class="col s9">
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
