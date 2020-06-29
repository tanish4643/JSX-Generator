import React, { Component } from 'react';
import '../App.css';
import {history} from '../history'
import Header from '../components/Header';
import config from '../assets/config';

class Login extends Component{
  constructor(props){
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  componentWillMount(){
    var user = window.sessionStorage.getItem("user");
    if(user) {
      history.push("/");
      return;
    }
  }

  login(){
    const {username, password} = this.state;
    var user = config.users.find(item => item.username == username && item.password == password);

    if(user){
      window.sessionStorage.setItem("user",user.id);
      history.push("/");
      return;
    }else{
      alert('Invalid username and/or password');
    }
  }

  render(){
    return(
      <div className="App">
        <Header />
        <div className="login-content">
          <div className="login-content-internal">
            <h4>Hello!</h4>
            <span className="login-text">Login to your account</span>
            <input  value={this.state.username} 
                    onChange={(e) => this.setState({username: e.target.value})}
                    className="input" type="text" 
                    placeholder="Username" style={{marginTop: 35}} />
            <input  value={this.state.password} 
                    onChange={(e) => this.setState({password: e.target.value})}
                    className="input" type="password" 
                    placeholder="Password" />
            <span className="button-view">
              <button onClick={() => this.login()} className="login-button">Login</button>
            </span>
          </div>
        </div>
        
      </div>
    )
  }
}

export default Login;
