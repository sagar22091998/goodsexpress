import React, { Component } from 'react';
import "./NewOrder.css";
import {withRouter} from "react-router-dom"
class NewOrder extends Component{

  constructor(props){
    super(props);
    this.state={
      receiverName : "",
      receiverAddress : "",
      contact:"" ,
      weight:0,
      error:false,
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
    const {receiverName,receiverAddress,contact,weight} = this.state; 

    if(receiverName === "" || receiverAddress === "" || contact === "" || weight === 0){
      this.handleError("Please Fill Out All the Fields");
      return;
    }


    const newOrder = {
      receiverName,
      receiverAddress,
      contact,
      weight,
      userId:this.props.userId
    }

    const response = await fetch('http://localhost:8080/customer/neworder',{
      method:"PUT",
      headers : {
        "Content-Type" : "application/json",
        Authorization : "Bearer " + this.props.token
      },
      body:JSON.stringify(newOrder)
    })

    if(response.status===422)
      this.handleError("Invalid Inputs")
    else if(response.status===500)
    this.handleError("Internal Server Error")
    else if(response.status===200){
      this.props.history.push("/orders")
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
        <form className="NewOrder" onSubmit={this.handleSumbit}>
          <h1 className="m-heading">Enter Order Details</h1>
          {this.state.error && <p className="NewOrder-Error">{this.state.errorText}</p>}
          <label htmlFor="receiverName">Receiver's Name</label>
          <input 
            type="text" 
            placeholder="Enter Receiver's Name"
            value={this.state.receiverName}
            name="receiverName" 
            id="receiverName"
            onChange={this.handleChange}/>
          <label htmlFor="receiverAddress">Receiver's Address</label>
          <input 
            type="text" 
            placeholder="Enter Receiver's Address" 
            value={this.state.receiverAddress}
            name="receiverAddress"
            id="receiverAddress"
            onChange={this.handleChange}
          />
          <label htmlFor="contact">Receiver Contact</label>
          <input 
            type="text" 
            placeholder="Enter Contact Number"
            value={this.state.number}
            name="contact" 
            id="contact"
            onChange={this.handleChange}/>
          <label htmlFor="weight">Parcel Weight Approximate(In Kgs)</label>
          <input 
            type="number"  
            step="0.001"
            value = {this.state.weight}
            name ="weight"
            id = "weight"
            onChange={this.handleChange}/>
          <input className = "btn" type="submit" value="Place Order"/>
        </form> 
    );
  }
}

export default withRouter(NewOrder);