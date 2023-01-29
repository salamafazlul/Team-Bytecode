import React,{ useState,state, Component,props } from "react";
import { ReactDOM } from "react-dom";



class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          email     : '' ,
          password  : ''
      };
    }

     handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.email)
        console.log(this.state.password)

        if(this.state.email == "fazlulsalama@gmail.com" && this.state.password == 123){
            const mes = "Welcome Salama"
            alert(mes);
            
        }
    
    }
    
     changeHandler = (c) => {

        const name = c.target.name;
        const value = c.target.value;

        this.setState({
          [name] : value,
         
        });
    }


render() {
/*
const [email, setEmail]         = State('');
const [password, setPassword]   = State('');
const [errMsg, setErrMsg]       = State('');
const [success, setSuccess]     = State('');
*/
/*
this.state = {
    email :''
};*/


    return (

        <div className ="auth-form-container">
        <h1>Signup</h1>
        
        <form className="login-form" onSubmit={this.handleSubmit}>
                <label htmlfor="email">Username</label>
                <input value={this.state.email} type="email" placeholder="Enter your username" id="email" name="email" required onChange={this.changeHandler}></input>
                <label htmlfor="password">password</label>
                <input value={this.state.password} type="password" placeholder="****" id="password" name="password" required onChange={this.changeHandler}></input>
                <button className="sign" type="submit">Login</button>
        </form>
        

        </div>


    );
}
}

export default Login