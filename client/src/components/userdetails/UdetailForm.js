import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import UdetailField from './UdetailField';

const FIELDS = [
  { label: 'Street', name: 'street', placeholder: 'sample 11 Main Street' },
  { label: 'City', name: 'city', placeholder: 'City' },
  { label: 'ZipPostal', name: 'zipPostal', placeholder: 'Zip or Postal Code' },
  { label: 'HouseState', name: 'state', placeholder: 'HouseState' },
  { label: 'Country', name: 'country', placeholder: 'Country' },
  { label: 'Cell', name: 'cell', placeholder: '1 505 234 1234' },
  { label: 'Phone', name: 'phone', placeholder: '1 505 234 1235' },
  { label: 'Linkedin', name: 'linkedin', placeholder: 'linkedin url ' },
  { label: 'Send me emails', name: 'emailsendyes', placeholder: 'jack' },
];

class UdetailForm extends Component {
  renderFields() {
    return _.map(FIELDS, ({ label, name, placeholder }) => {
      return (
        <Field
          key={name}
          component={UdetailField}
          type="text"
          label={label}
          name={name}
          placeholder={placeholder}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderFields()}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'udetailForm',
})(UdetailForm);
