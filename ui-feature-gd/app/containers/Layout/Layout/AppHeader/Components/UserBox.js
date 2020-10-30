import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';

import {
    DropdownToggle, DropdownMenu,DropdownItem,
    Nav, Col, Row, Button, NavItem, NavLink,
    UncontrolledTooltip, UncontrolledButtonDropdown,ButtonDropdown
} from 'reactstrap';

import {
    toast,
    Bounce
} from 'react-toastify';


import {
    faAngleDown,

} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import city3 from 'assets/utils/images/dropdown-header/city3.jpg';
import avatar1 from 'assets/utils/images/avatars/1.jpg';

function UserBox ({user}) {

    const [active, setActive] = useState(false);

    
        return (
            <>
                <div className="header-btn-lg pr-0">
                    <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                       
                            <div className="widget-content-left">
                            
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle color="link" className="p-0">
                                        <img width={42} className="rounded-circle" src={''} alt=""/>
                                        <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown}/>
                                    </DropdownToggle>
                                    <DropdownMenu right className="rm-pointers dropdown-menu-lg" >                                  
                                        <div className="dropdown-menu-header">
                                            <div className="dropdown-menu-header-inner bg-info">

                                                <div className="menu-header-content text-left">
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-3">
                                                                <img width={42} className="rounded-circle" src={''}
                                                                     alt=""/>
                                                            </div>
                                                            <div className="widget-content-left">
                                                                <div className="widget-heading">
                                                                    {user.profileName}
                                                                </div>
                                                                <div className="widget-subheading opacity-8">
                                                                    {user.rank}
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-right mr-2">
                                                                <Button className="btn-pill btn-shadow btn-shine"
                                                                        color="focus" to="/logout" tag={Link} >
                                                                    Logout
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="scroll-area-xs" style={{
                                            height: '150px'
                                        }}>
                                            <PerfectScrollbar>
                                                <Nav vertical>
                                                    <NavItem className="nav-item-header">
                                                        Account
                                                    </NavItem>
                                                    <NavItem className="nav-link">
                                                        <Link to="/changeUserPassword" >
                                                            Change Password
                                                        </Link>
                                                    </NavItem>
                                                    <NavItem className="nav-link">
                                                        <Link to="/fir">
                                                            FIR
                                                        </Link>
                                                    </NavItem>
                                                    
                                                </Nav>
                                            </PerfectScrollbar>
                                        </div>
                                        
                                        
                                        
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </div>
                            <div className="widget-content-left  ml-3 header-user-info">
                                <div className="widget-heading">
                                {user.profileName}
                                </div>
                                <div className="widget-subheading">
                                {user.rank}
                                </div>
                            </div>

                            
                        </div>
                    </div>
                </div>
            </>
        )
}

export default UserBox;