import React, { Component } from 'react';
import "./Form.css";



class Form extends Component{
  constructor(){
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      confirm: '',
      profileType: '',
      error : false ,
      errorText : "",
      successText : ""
    };
    this.handleError=this.handleError.bind(this);
    this.handleError=this.handleError.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.handleSumbit=this.handleSumbit.bind(this);
  }   
  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  async handleSumbit(e){
    
    e.preventDefault();
    const {name,email,password,profileType,confirm} =  this.state; 
    
    if(name==="" || email==="" || password==="" || profileType==="" ||confirm===""){
      this.handleError("Please Fill Out All the Fields");
      return;
    }
    
    if(confirm!==password){
        this.handleError("Passwords Dont Match");
        return;
      }
      
    if(password.length<8){
    this.handleError("Password length should be greater than or equal to 8");
    return;
     }
 
    const newUser = {
      name: name,
      email: email,
      password: password,
      profileType: profileType
    }

    const response = await fetch('http://localhost:8080/auth/signup',{
      method:"PUT",
      headers : {
        "Content-Type" : "application/json"
      },
      body:JSON.stringify(newUser)
    })

    if(response.status===422)
      this.handleError("Email Already exist")
    else if(response.status===500)
      this.handleError("Internal Server Error")
    else if(response.status===200)
      this.handleSuccess("Registration Successful!! Login Now")

  }

  handleError( text ){

    if(!this.state.error){
      this.setState(  x => ({error : !x.error}) );
    }
    this.setState({errorText : text });

  }

  handleSuccess(text){
    this.setState({ error:false,successText: text});
  }

  render(){
    return(
      <form className="Form" onSubmit={this.handleSumbit}>
        {this.state.error ? <label className="Error"> {this.state.errorText} </label> :null }
        {!this.state.error && this.state.successText.length !== "" ? <label className="Success"> {this.state.successText} </label> :null }
        <div className="Form-Set">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            placeholder="Enter Name"
            value={this.state.name}
            name="name" 
            id="name"
            onChange={this.handleChange}/>
        </div>
        <div className="Form-Set">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            placeholder="Enter Email" 
            id="email"
            value={this.state.email}
            name="email"
            onChange={this.handleChange}
          />
        </div>
        <div className="Form-Set">
          <label htmlFor="pass1">Password</label>
          <input 
            type="password" 
            placeholder="Enter Password"
            value={this.state.password}
            name="password"
            id="pass1"
            onChange={this.handleChange}/>
        </div>
         <div className="Form-Set">
          <label htmlFor="pass2">Confirm Password</label>
          <input 
            type="password" 
            placeholder="Re-enter Password"
            id="pass2"
            value={this.state.confirm}
            name="confirm"
            onChange={this.handleChange}
            />
        </div> 
        <div className="Register-Type">
          <p> Sign Up As </p>
          <input type="radio" name="profileType" value="customer"  checked={this.state.profileType === "customer"} onChange={ this.handleChange }/> Customer 
          <input type="radio" name="profileType" value="transporter"  checked={this.state.profileType === "transporter"} onChange={ this.handleChange }/> Transporter
        </div>
        <input className = "btn" type="submit" value="Register"/>
      </form>   
    );
  }
}

export default Form;