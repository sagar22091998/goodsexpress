import React, { Component } from 'react';
import img1 from "./i1.jpg";
import img2 from "./i2.jpg";
import img3 from "./i3.jpg";
import "./Creators.css"
class Creators extends Component{
  render(){
    return(
      <div className="Creators">
        <h1 className="m-heading py-2">Meet Our Team</h1>
        <div className="Image-Container">
          <div className="Images" 
            data-aos="slide-right"
            data-aos-offset="150"
            data-aos-duration="1000"
            data-aos-once="true">
            <h3>Somnath Sarkar</h3>
            <img alt="Image1" src={img1}/>
          </div>
          <div className="Images" 
            data-aos="slide-up"
            data-aos-offset="150"
            data-aos-duration="1000"
            data-aos-once="true">
            <h3>Manas Jhalani</h3>
            <img alt="Image2" src={img2}/>
          </div>
          <div className="Images" 
            data-aos="slide-left"
            data-aos-offset="150"
            data-aos-duration="1000"
            data-aos-once="true">
            <h3>Sagar Bhattacharya</h3>
            <img alt="Image3" src={img3}/>
          </div>
        </div>
      </div>     
    );
  }
}

export default Creators;