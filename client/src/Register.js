import React, { Component } from 'react';
import RegForm from './RegForm';
import "./Register.css"

class Register extends Component{

  componentDidMount(){
    window.scrollTo(0,0);
  }

  render(){
    return(
      <div className="Register ">
        <div className="Register-Background">
          <div className="Register-Cover p-1">
            <h1 className="l-heading my-1 text-primary">Welcome To GoodsExpress</h1>
            <RegForm loginHandler={this.props.loginHandler}/>
          </div>
        </div>     
      </div>
    
      );
  }
}

export default Register;