import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';

const Dashboard = () => {
  return (
    <div>
    <SurveyList />
      <div>
            <div class="card grey darken-1">
              <div class="card-content white-text">
                <span class="card-title">Creat a New Survey</span>
                <div className="btn-floating red btn-large white-text right">
                      <Link to="/surveys/new">
                        <i className="large material-icons">add</i>
                      </Link>
                    </div>
              </div>
            </div>
          </div>

    </div>
  );
};

//console.log({this.props.auth.userImg}):

export default Dashboard;
