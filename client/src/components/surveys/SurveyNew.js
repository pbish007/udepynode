// SurveyNew shows SurveryForm and SurveyFormReview

import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {

  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false})}
          />
      );
    }
    return (
      <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })}
        />
    );
  }

  render() {
    return(
      <div>
        <div class="row">
          <div class="col s12 m12">
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
  form:'surveyForm'
})(SurveyNew);
