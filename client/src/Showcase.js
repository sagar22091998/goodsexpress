import React, { Component } from 'react';
import "./Showcase.css";
import {Link} from "react-router-dom";

class Showcase extends Component{
  render(){
    return(
      <header className="Showcase">
        <div className="Showcase-container">
          <h1 className="l-heading text-primary">Welcome to GoodsExpress. </h1>
          <p className="Showcase-text m-text">
              Delivering Goods all around the world.
          </p>
              {localStorage.token===undefined &&
              (
              <div className='m-text Showcase-Info'>
                <p>To get our services or To work with us first :-</p>
                <Link className="Showcase-Button" to="/authentication">Register | Login</Link>
              </div>
              )
              }
        </div>
      </header>  
    );
  }
}




export default Showcase;