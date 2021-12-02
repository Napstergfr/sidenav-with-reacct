import React from 'react';
import './sidebar.css';
import logo from './../../../logo.JPG';
import {SidebarBottomItems, SidebarTopItems} from "../../../data/sidebar";

const sideBarTopItems = SidebarTopItems;
const sideBarBottomItems = SidebarBottomItems;
const active = 1;
function Sidebar () {
    return(
        <div className="sidebar">
            <div className="sidebar-top">
                <ul>
                    <li><img src={logo} alt="zerodai logo" width="60px"/></li>
                    {sideBarTopItems.map((item) => { return (<li className={`${active === item.id ? "active" : ""}`}>{item.name}</li>)})}
                    <li>More</li>
                </ul>
            </div>
            <div className="sidebar-bottom">
                <ul>
                    {sideBarBottomItems.map((item) => { return (<li>{item.name}</li>)})}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
