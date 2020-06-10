import React, { Component } from 'react';
import "./RegForm.css"
import Login from "./Login"
import Form from "./Form"
class RegForm extends Component{

  constructor(props){
    super(props);
    this.state={
      login: false
    };
    this.handleClick = this.handleClick.bind(this); 
  }
  
  handleClick(e){
    this.setState( x =>{ 
         return({login : !(x.login)}); 
      });
    }
  
  render(){
    let classLeft,classRight;
    if(!this.state.login){
      classLeft = `Regform-Left none`
      classRight = `Regform-Right`
    }
    else{
      classLeft = `Regform-Left`
      classRight = `Regform-Right none`
    }

    return(
      <div className="Regform">
        <div className={classLeft}>
          <p>Already Registered?</p>
          <button onClick={this.handleClick} className="regBtn" to="/register/login">Log In</button>
        </div>
        <div className="Regform-Middle">
          { !this.state.login ?
            <Login loginHandler={this.props.loginHandler}/> :
            <Form/>}
        </div>
        <div  className={classRight}>
          <p>Don't Have Account?</p>
          <button onClick={this.handleClick} className="regBtn" 
          to="/register/form">Register Now!</ button>
        </div>
      </div>
    );
  }
}

export default RegForm;