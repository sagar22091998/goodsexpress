import React, { Component } from 'react';
import "./Login.css";
import {withRouter} from "react-router-dom"
class Login extends Component{

  constructor(props){
    super(props);
    this.state={
      email : "",
      password : "",
      error:false ,
      errorText:""
    };
    this.handleError=this.handleError.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.handleSumbit=this.handleSumbit.bind(this);
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  async handleSumbit(e){
    
    e.preventDefault();
    const credentials = {
      email: this.state.email,
      password: this.state.password
    }

    const response = await fetch('http://localhost:8080/auth/login',{
      method:"POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body:JSON.stringify(credentials)
    })

    const responseData = await response.json()

    if(response.status===422)
      this.handleError("Invalid Credentials")
    else if(response.status===401)
      this.handleError("Incorrect Password")
    else if(response.status===500)
      this.handleError("Internal Server Error")
    else if(response.status===200){
      this.props.loginHandler(responseData);
      this.props.history.push("/")
    }
  
  }

  handleError( text ){

    if(!this.state.error){
      this.setState(  x => ({error : !x.error}) );
    }
    this.setState({errorText : text });

  }


  render(){
    return(
        <form className="Login" onSubmit={this.handleSumbit}>
          <h1 className="m-heading">Login</h1>
          {this.state.error && <p className="Login-Error">{this.state.errorText}</p>}
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            placeholder="Enter Email"
            value={this.state.email}
            name="email" 
            id="name"
            onChange={this.handleChange}/>
          <label htmlFor="pass">Password</label>
          <input 
            type="password" 
            placeholder="Enter Password" 
            value={this.state.password}
            name="password"
            id="pass"
            onChange={this.handleChange}
          />
          <input className = "btn" type="submit" value="Login"/>
        </form> 
    );
  }
}

export default withRouter(Login);