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
        <div class="row">
          <div class="col s6 m12 right">
            <div class="card white darken-1">
              <div class="card-content Black-text">
                <span class="card-title">Create a New Survey</span>
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
