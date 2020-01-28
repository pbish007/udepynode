import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import HouseForm from './HouseForm';
import SurveyFormReview from './HouseFormReview';

class HouseNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return <HouseFormReview onCancel={() => this.setState({ showFormReview: false })} />;
    }
    return <HouseForm onSurveySubmit={() => this.setState({ showFormReview: true })} />;
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col s6 m12 right">
            <div className="card white darken-1">
              <div className="card-content Black-text">
                <span className="card-title">Create a New Survey</span>
                {this.renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'houseForm',
})(HouseNew);
