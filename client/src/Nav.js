import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import "./Nav.css"
import { withRouter } from 'react-router';
class Nav extends Component{

  render(){

    const {userType,isAuth} = this.props;
    return(
      <header className="Nav">
        <div className="Nav-container">
          <div className="Nav-Logo"></div>
          <ul>
            <NavLink className="Nav-Links" activeClassName="Current" exact to="/">Home</NavLink>
            <NavLink className="Nav-Links" activeClassName="Current" to="/about">About</NavLink>
            {!isAuth && <NavLink className="Nav-Links" activeClassName="Current" to="/authentication">Register | Login</NavLink>}
            {isAuth && userType==="customer" &&  <NavLink className="Nav-Links" activeClassName="Current" to="/neworder">New Order</NavLink>}
            {isAuth && userType==="customer" && <NavLink className="Nav-Links" activeClassName="Current" to="/orders">My Orders</NavLink>}
            {isAuth && userType==="transporter" && <NavLink className="Nav-Links" activeClassName="Current" to="/pending"> Orders To Deliver</NavLink>}
            {isAuth && <NavLink className="Nav-Links"  to="/" onClick={this.props.logout}>Logout</NavLink>}
          </ul>
        </div>
      </header>
    );
  }

}

export default withRouter(Nav);