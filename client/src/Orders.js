import React, { Component } from 'react';
import "./Orders.css";


class Orders extends Component{

  constructor(){
    super();
    this.state = {
      orders: []
    }
  }

  async componentDidMount(){

    const response = await fetch("http://localhost:8080/customer/orders",{
      method:"POST",
      headers : {
        "Content-Type" : "application/json",
        Authorization : "Bearer " + this.props.token
      },
      body:JSON.stringify({
        _id:this.props.userId
      })
    })

    const responseData = await response.json()

    if(response.status===200)
      this.setState({orders:responseData.orders})

  }

  render(){
    let content;
    if(this.state.orders.length === 0)
      content = <h1>No Orders Placed</h1>
    else
      content = this.state.orders.map(order=>{
        return (
        <div className="Order-Items" key={order._id}>
          <h3>Order Id :- {order._id}</h3>
          <p><span>Receiver Name :- {order.receiverName}</span></p>
          <p><span>Address :- {order.receiverAddress}</span></p>
          <p><span>Contact :- {order.contact}</span><span>Parcel Weight :- {order.weight}</span></p>
          <h4>Delivery Status :- {
          order.delivered ? 
          <span className="Green">Delivered</span> : 
          <span className="Red">Undelivered</span> }</h4>
        </div>)
      })
    return(
      <header className="Orders">
        <h1 className="m-heading">Your Orders</h1>
        {content}
      </header>  
    );
  }
}

export default Orders;