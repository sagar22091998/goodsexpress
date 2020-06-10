import React, { Component } from 'react';
import "./Pending.css";


class Pending extends Component{

  constructor(){
    super();
    this.state = {
      pendingOrders: []
    }
    this.handleClick = this.handleClick.bind(this);
    this.getPendingOrders=this.getPendingOrders.bind(this); 
  }

  async componentDidMount(){
    this.getPendingOrders();
  }

  async getPendingOrders(){
    const response = await fetch("http://localhost:8080/transporter/pending",{
      method:"GET",
      headers : {
        "Content-Type" : "application/json",
        Authorization : "Bearer " + this.props.token
      }
    })

    const responseData = await response.json()

    if(response.status===200)
      this.setState({pendingOrders:responseData.pendingOrders})
  }

  async handleClick(e){
    const orderId = e.target.previousSibling.value;
    
    const response = await await fetch(`http://localhost:8080/transporter/pending/${orderId}`,{
      method:"PUT",
      headers : {
        "Content-Type" : "application/json",
        Authorization : "Bearer " + this.props.token
      }
    })
    
    if(response.status===200){
      this.getPendingOrders();
    }

  }

  render(){
    let content;
    if(this.state.pendingOrders.length === 0)
      content = <h1>No Pending Orders</h1>
    else
      content = this.state.pendingOrders.map(order=>{
        return (
        <div className="Pending-Items" key={order._id}>
          <h3>Order Id :- {order._id}</h3>
          <p><span>Receiver Name :- {order.receiverName}</span></p>
          <p><span>Address :- {order.receiverAddress}</span></p>
          <p><span>Contact :- {order.contact}</span><span>Parcel Weight :- {order.weight}</span></p>
          <input type="hidden" value={order._id}></input>
          <button onClick={this.handleClick} className="Pending-Button">Done Delivering!</button>
        </div>)
      })
    return(
      <header className="Pending">
        <h1 className="s-heading">Orders To Deliver</h1>
        {content}
      </header>  
    );
  }
}

export default Pending;