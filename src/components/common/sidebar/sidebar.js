import React, {Component} from 'react';
import './sidebar.css';
import logo from './../../../logo.JPG';
import {SidebarBottomItems, SidebarTopItems} from "../../../data/sidebar"; // User specific data should be here or it might me in redux i just kept it simple ! :|
import {Icon, SearchBox, TooltipHost} from "@fluentui/react";

class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: 1,
            showOverflowItems: false,
            sideBarTopItems: SidebarTopItems,
            sidBarOverflowItems: [],
            filteredOverflowItems: [],
            sideBarBottomItems: SidebarBottomItems,
            viewHeight: window.innerHeight
        };
        this.handleSidebarClick = this.handleSidebarClick.bind(this);
        // This function is to handle the sidebar item click event
        this.resizeSideBar = this.resizeSideBar.bind(this);
        // This is to increase and decrease the sidebar items as well as overflow items according to screen size
        this.handleItemSearch = this.handleItemSearch.bind(this);
        // This is to handle the overflow search field
    }

    handleSidebarClick(id) {  // This function is to handle the sidebar item click event
        this.setState({
            active: id
        });
    }

    handleItemSearch(value, items) {  // This is to handle the overflow search field
        if (value !== undefined) {
            const filteredItems = items.filter((item) => item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
            if (!filteredItems || !filteredItems.length) {
                filteredItems.push({
                    id: 0,
                    name: 'Nothing Found'
                });
            }
            this.setState({
                filteredOverflowItems: filteredItems
            });
        } else { // this else is to abort the search field
            this.setState({
                filteredOverflowItems: []
            });
        }
    }

    toggleOverflowItems() { // This is to toggle overflow menu
        this.setState({
            showOverflowItems: !this.state.showOverflowItems
        });
    }

    updateDimensions = () => {
        this.setState({
            viewHeight: window.innerHeight
        });
        this.resizeSideBar(this.state.viewHeight);
    };

    componentDidMount() { // Used react lifecycle hooks to trigger  resizeSideBar()
        window.addEventListener('resize', this.updateDimensions);
        this.resizeSideBar(this.state.viewHeight);
    }

    componentWillUnmount() { // Used react lifecycle hooks to trigger  resizeSideBar()
        window.removeEventListener('resize', this.updateDimensions);
        this.resizeSideBar(this.state.viewHeight);
    }

    resizeSideBar(viewHeight) { // This is to increase and decrease the sidebar items as well as overflow items according to screen size
        if (!document.getElementById('overflowItemsSearchBox')) { // this block of code is to refresh the items according to the search field
            this.handleItemSearch(undefined, this.state.sidBarOverflowItems);
        } else {
            this.handleItemSearch(document.getElementById('overflowItemsSearchBox').value, this.state.sidBarOverflowItems);
        }
        if (viewHeight <= 500) { // This is to increase and decrease the sidebar items as well as overflow items according to screen size
            this.setState({
                sideBarTopItems: SidebarTopItems.slice(0, 2),
                sidBarOverflowItems: SidebarTopItems.slice(2, SidebarTopItems.length - 1)
            });

        } else if (viewHeight <= 768) { // This is to increase and decrease the sidebar items as well as overflow items according to screen size
            this.setState({
                sideBarTopItems: SidebarTopItems.slice(0, 3),
                sidBarOverflowItems: SidebarTopItems.slice(3, SidebarTopItems.length - 1)
            });
        } else if (viewHeight <= 979) { // This is to increase and decrease the sidebar items as well as overflow items according to screen size
            this.setState({
                sideBarTopItems: SidebarTopItems.slice(0, 5),
                sidBarOverflowItems: SidebarTopItems.slice(5, SidebarTopItems.length - 1)
            });
        } else if (viewHeight >= 979) { // This is to increase and decrease the sidebar items as well as overflow items according to screen size
            this.setState({
                sideBarTopItems: SidebarTopItems.slice(0, 7),
                sidBarOverflowItems: SidebarTopItems.slice(7, SidebarTopItems.length - 1)
            });
        } else {
            this.setState({ // This is to increase and decrease the sidebar items as well as overflow items according to screen size
                sideBarTopItems: SidebarTopItems,
                sidBarOverflowItems: [],
                filteredOverflowItems: [],
                showOverflowItems: false
            });

        }
    }

    render() {
        return (
            <div>
                <div className="sidebar">
                    <div className="sidebar-top">
                        <ul>
                            <li key="home" className="logo">
                                <TooltipHost
                                    content="Home">
                                    <img src={logo} alt="zerodai logo" width="60px"/>
                                </TooltipHost>
                            </li>
                            {this.state.sideBarTopItems.map((item) => {
                                return (
                                    <li key={item.id} className={`${this.state.active === item.id ? "active" : ""}`}
                                        onClick={() => this.handleSidebarClick(item.id)}>
                                        <Icon iconName={item.icon}/>
                                        <span>{item.name}</span></li>
                                )
                            })}
                            {this.state.sidBarOverflowItems.length > 0 ?
                                <li key="more" className="more" onClick={() => this.toggleOverflowItems()}>
                                    <Icon iconName={'More'}/>
                                </li> : ''}

                        </ul>
                    </div>
                    <div className="sidebar-bottom">
                        <ul>
                            {this.state.sideBarBottomItems.map((item) => {
                                return (
                                    <li key={item.id} className={`${this.state.active === item.id ? "active" : ""}`}
                                        onClick={() => this.handleSidebarClick(item.id)}>
                                        <Icon iconName={item.icon}/>
                                        <span>{item.name}</span></li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <RenderOverflowItems
                    items={this.state.sidBarOverflowItems}
                    filteredItems={this.state.filteredOverflowItems}
                    showItems={this.state.showOverflowItems}
                    onClickItems={this.handleSidebarClick}
                    onSearch={this.handleItemSearch}
                    activeLink={this.state.active}
                />

            </div>

        );
    }

}

function RenderOverflowItems({items, filteredItems, showItems, onClickItems, onSearch, activeLink}) { // This function renders the overflow menu
    if (showItems && items.length > 0) {
        return (<div className="overflow-items">
            <SearchBox
                id="overflowItemsSearchBox"
                ariaLabel="Filter actions by text"
                placeholder="Filter actions"
                onChange={(event) => onSearch(event ? event.target.value : undefined, items)}
            />
            {filteredItems.length > 0 && filteredItems ? <ul>
                {filteredItems.map((item) => {
                    return (
                        <li key={item.id} onClick={() => onClickItems(item.id)}
                            className={`${activeLink === item.id ? "active" : ""}`}>
                            <Icon iconName={item.icon}/>
                            <span>{item.name}</span></li>
                    )
                })}
            </ul> : <ul>
                {items.map((item) => {
                    return (
                        <li key={item.id} onClick={() => onClickItems(item.id)}
                            className={`${activeLink === item.id ? "active" : ""}`}>
                            <Icon iconName={item.icon}/>
                            <span>{item.name}</span></li>
                    )
                })}
            </ul>}
        </div>);

    } else {
        return (<div></div>);
    }

}

export default Sidebar;
