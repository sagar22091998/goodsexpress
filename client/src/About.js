import React, { Component } from 'react';
import Creators from "./Creators";
import "./About.css";

class About extends Component{
  

  componentDidMount() {
    window.scrollTo(0,0);
  }

  render(){
    return(
      <div className="About-Section">
        <div className="About-Main ">
          <div className="About-Content p-3">
            <h1 className="l-heading py-1">About Us!!</h1>
            <p className="m-text">Goods Express is a Courier delivery system which automates the process of delivering various items such as heavyweight and lightweight Couriers, letters from person to person across various cities in the country.</p>
    
            <p className="m-text">The Manual and offline process of delivering goods is a difficult task when it comes to handling a large number of customers and orders across various cities. Goods Express looks into this matter and automates the process. Along with delivering the goods from person to person, Goods Express also provides online tracking of all the orders placed by the customer.  The online platform will ensure security and provide a fast and secure system to ease the task to send the Courier from one place to another. The system will automatically generate the Courier-ID and assign the required employees for the task.</p>
          </div>
        </div>
        <Creators/>
      </div>
    );
  }
}

export default About;