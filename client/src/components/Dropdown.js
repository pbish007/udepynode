import React, { Component } from 'react';
import M from 'materialize-css';


class Dropdown_menu extends Component {

    componentDidMount() {
        let elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, {inDuration: 300, outDuration: 225});
    }

    render(){
        return(
            <div className="input-field col s12" >
                <ul id='dropdown1' className='dropdown-content' bottom>
                  <li><a href="#!"><i className="material-icons">person</i>Profile</a></li>
                  <li className="divider"></li>
                  <li><a href="/api/logout"><i className="material-icons">power_settings_new</i>Logout</a></li>
                </ul>
            </div>

        )
    }

}
export default Dropdown_menu;
