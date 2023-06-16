import './navbar_style.css'
import Logo from "../images/logo.png"
import { nav_data } from './nav_data'
import { Bs0CircleFill, BsCircle, FaAccusoft } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SideNavBar = ()=> {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0)
    const onClickHandle = (path, tabIndex) => {
        navigate(path)
        setActiveTab(tabIndex)
    }


    return (
        <div className="side_navbar-container">
            <div className='logo_container'>
                <img src={Logo} alt="logo" className='logo'></img>
            </div>
            <div className='nav-tag-container'>
                
                {
                    nav_data.map(
                        (item, index) => <div className={ activeTab == index ? "nav-tag active-tab" :"nav-tag "} isActive={activeTab } onClick={ () =>{onClickHandle(item.link, index)}}  >
                        {item.icon}
                        <div className='nav-tag-title'> {item.text}</div>
                    </div>
                    )
                }
            </div>
        </div>
    )
}



export default SideNavBar