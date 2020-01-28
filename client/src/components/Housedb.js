import React from 'react';
import { Link } from 'react-router-dom';

const Housedb = () => {
  return (
    <div className="row">
      <div className="col s3">
        <div className="btn-floating red btn-small white-text bottom">
          <Link to="/complexform/wss">
            <i className="large material-icons">add</i>
          </Link>
        </div>
      </div>

      <div className="col s9">Add content here</div>
    </div>
  );
};

export default Housedb;