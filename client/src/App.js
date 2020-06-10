import React, { Component } from 'react';
import {Route,Switch, Redirect} from "react-router-dom";
import Home from "./Home";
import Register from "./Register"
import About from "./About"
import './App.css';
import NewOrder from './NewOrder';
import Nav from "./Nav";
import Footer from './Footer';
import Orders from './Orders';
import Pending from './Pending';
class App extends Component {

  constructor(){
    super();
    this.state = {
      isAuth: false,
      token:"",
      userId:"",
      userType:""
    }
    this.loginHandler = this.loginHandler.bind(this); 
    this.logoutHandler = this.logoutHandler.bind(this); 
    this.setAutoLogout = this.setAutoLogout.bind(this); 
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }
    const userId = localStorage.getItem('userId');
    const userType = localStorage.getItem('userType');
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    this.setState({ isAuth: true, token: token, userId: userId ,userType:userType });
    this.setAutoLogout(remainingMilliseconds);
  }

  logoutHandler(){
    this.setState({ isAuth: false, token: "" , userId:"" , userType : "" });
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
  }

  loginHandler(loginData){
    this.setState({ 
      isAuth : true , 
      token:loginData.token , 
      userId:loginData.userId,
      userType:loginData.userType
    })
    localStorage.setItem('token', loginData.token);
    localStorage.setItem('userId', loginData.userId);
    localStorage.setItem('userType', loginData.userType);
    const remainingMilliseconds = 60 * 60 * 1000; //1hr
    const expiryDate = new Date(
      new Date().getTime() + remainingMilliseconds
    );
    localStorage.setItem('expiryDate', expiryDate.toISOString());
    this.setAutoLogout(remainingMilliseconds);
  }

  setAutoLogout(ms){
    setTimeout(() => {
      this.logoutHandler();
    }, ms);
  };

  render(){
    const {isAuth,userId,userType,token} = this.state;
      return (
        <div className="App">
          <Nav isAuth={isAuth} userType={userType} logout={this.logoutHandler} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route  path="/authentication" render={() => <Register loginHandler={this.loginHandler}/>}/> 
            <Route  path="/about" component={About} />
            {isAuth && userType==="customer" && <Route path="/orders" component={()=> <Orders userId={userId} token={token}/>}/> }
            {isAuth && userType==="customer" &&<Route  path="/neworder" component={()=> <NewOrder userId={userId} token={token}/>} /> }
            {isAuth && userType==="transporter" &&<Route  path="/pending" component={()=> <Pending userId={userId} token={token}/>} /> }
            <Redirect to='/'  component={Home} />
          </Switch>
          <Footer/>
        </div>
      );
  }
}

export default App;
