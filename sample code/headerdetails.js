<li key="5"style={{ margin: '0 10px'}}><Dropdown /></li>
<a className="dropdown-trigger" href="/api/logout" data-target="dropdown1">
<div className="chip">
  <img alt="User profile" className="circle responsive-img" src={this.props.auth.userImg}/>
  {this.props.auth.firstName}
</div><i className="material-icons right">arrow_drop_down</i></a>
</li>
