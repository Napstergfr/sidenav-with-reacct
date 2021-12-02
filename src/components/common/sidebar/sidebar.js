import React, {Component} from 'react';
import './sidebar.css';
import logo from './../../../logo.JPG';
import {SidebarBottomItems, SidebarTopItems} from "../../../data/sidebar";
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
        this.resizeSideBar = this.resizeSideBar.bind(this);
        this.handleItemSearch = this.handleItemSearch.bind(this);

    }

    handleSidebarClick(id) {
        this.setState({
            active: id
        });
    }
    handleItemSearch(event, items){
        if (event !== undefined) {
            const filteredItems = items.filter((item) => item.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1);
            if (!filteredItems || !filteredItems.length) {
                filteredItems.push({
                    id: 0,
                    name: 'Nothing Found'
                });
            }
            this.setState({
                filteredOverflowItems: filteredItems
            });
        } else {
            this.setState({
                filteredOverflowItems: []
            });
        }
    }
    toggleOverflowItems() {
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

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        this.resizeSideBar(this.state.viewHeight);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
        this.resizeSideBar(this.state.viewHeight);
    }

    resizeSideBar(viewHeight) {
        if (!document.getElementById('overflowItemsSearchBox')) {
            this.handleItemSearch(undefined, this.state.sidBarOverflowItems);
        }
        if (viewHeight <= 500) {
            this.setState({
                sideBarTopItems: SidebarTopItems.slice(0, 2),
                sidBarOverflowItems: SidebarTopItems.slice(2, SidebarTopItems.length - 1)
            });

        } else if (viewHeight <= 768) {
            this.setState({
                sideBarTopItems: SidebarTopItems.slice(0, 3),
                sidBarOverflowItems: SidebarTopItems.slice(3, SidebarTopItems.length - 1)
            });
        } else if (viewHeight <= 979) {
            this.setState({
                sideBarTopItems: SidebarTopItems.slice(0, 5),
                sidBarOverflowItems: SidebarTopItems.slice(5, SidebarTopItems.length - 1)
            });
        } else if (viewHeight >= 979) {
            this.setState({
                sideBarTopItems: SidebarTopItems.slice(0, 7),
                sidBarOverflowItems: SidebarTopItems.slice(7, SidebarTopItems.length - 1)
            });
        } else {
            this.setState({
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
                    />

                </div>

            );
    }

}
function RenderOverflowItems({items, filteredItems, showItems, onClickItems, onSearch}) {
    if(showItems && items.length > 0) {
            return( <div className="overflow-items">
                <SearchBox
                    id="overflowItemsSearchBox"
                    ariaLabel="Filter actions by text"
                    placeholder="Filter actions"
                    onChange={(event) => onSearch(event, items)}
                />
                {filteredItems.length > 0 && filteredItems ? <ul>
                    {filteredItems.map((item) => {
                        return (
                            <li key={item.id} onClick={() => onClickItems(item.id)}>
                                <Icon iconName={item.icon}/>
                                <span>{item.name}</span></li>
                        )
                    })}
                </ul> : <ul>
                    {items.map((item) => {
                        return (
                            <li key={item.id} onClick={() => onClickItems(item.id)}>
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
