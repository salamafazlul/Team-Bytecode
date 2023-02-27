import React , {Component} from 'react';
import './nav.css'
import logo from '../image/logo.png';


export class Nav extends Component{
    render(){
        return(
            <div className="side">
               
               
                <img src = {logo} className="logo" alt=""/>
                    <div className="link">
                    <tr><button class="button-link">Dashboard</button></tr>
                    <tr> <button class="button-link">Users</button></tr>
                    <tr> <button class="button-link">Discount & pramotion</button></tr>
                    <tr><button class="button-link">Report</button></tr>
                    </div>
                
                
               
                            
                 
            </div>

        )
        
    }

}