import React, { Component } from 'react';
import Showcase from './Showcase';

class Home extends Component{

  componentDidMount(){
    window.scrollTo(0,0);
  }


  render(){
    return(
      <div className="Home">
        <Showcase/>
      </div>     
    );
  }
}

export default Home;