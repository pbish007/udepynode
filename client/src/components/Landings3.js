import React from 'react';


const Landing =() => {
  return (
    <div class="container-fluid">

      <div class="jumbotron iris" >
          <div class="container introduction" >
              <h1 class="text-white font-weight-bold">We'll help you manage your tanagibles</h1>
          </div>
      </div>
      <div class="container">
        <h2 class="text-black-50 font-weight-bold text-center">Manage your Assets</h2>
        <p></p>
      </div>
      <div class="container">
        <div class="row">
          <div class="col">
              <i className="large material-icons text-center">house</i>
          </div>
          <div class="col">
              <i className="large material-icons text-center">directions_car</i>
          </div>
          <div class="col">
              <i className="large material-icons text-center">directions_boat</i>
          </div>
          <div class="col">
              <i className="large material-icons text-center">motorcycle</i>
          </div>
          <div class="col">
              <i className="large material-icons text-center">rv_hookup</i>
          </div>
        </div>
      </div>
      <div class="container">
        <h2 class="text-black-50 font-weight-bold text-center">---</h2>
      </div>



      <div class="row row-cols-1 row-cols-md-3">
        <div class="col mb-4">
          <div class="card">
            <img src="../house-img.jpg" class="card-img-top" alt="..."/>
            <div class="card-body">
              <h5 class="card-title text-center">Know your Assts</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
          </div>
        </div>
        <div class="col mb-4">
          <div class="card">
            <img src="repair-team.jpeg" class="card-img-top" alt="..."/>
            <div class="card-body">
              <h5 class="card-title">Keep Track of the Support Team</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
          </div>
        </div>
        <div class="col mb-4">
          <div class="card">
            <img src="../car-lineup.jpeg" class="card-img-top" alt="..."/>
            <div class="card-body">
              <h5 class="card-title">Know the Value</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
            </div>
          </div>
        </div>
      </div>


</div>



  );
}

export default Landing;
