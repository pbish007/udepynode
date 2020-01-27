//UdetailField contains logic to render a single
//label and text input

import React from 'react';

export default ({ input, label, placeholder}) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
    </div>

  );
}
