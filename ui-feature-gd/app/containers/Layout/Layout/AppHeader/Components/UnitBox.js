import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import http from 'services/http';
import { GET_UNITS, SET_UNIT } from '../../../Api';
import AuthService from 'services/authService';


import {
    DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem,
    Nav, Col, Row, Button, NavItem, NavLink,
    UncontrolledTooltip, UncontrolledButtonDropdown
} from 'reactstrap';

import {
    toast,
    Bounce
} from 'react-toastify';


import {
    faAngleDown,

} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function UnitBox({ unit, onSetUnit, units }) {

    const [multiUnit, setMultiUnit] = useState(false);
    const [ready, setReady] = useState(false);
    const [unitList, setUnitList] = useState([]);
    let history = useHistory();
    useEffect(() => {

        if (units && units.length > 1) {

            let list = units.filter((x) => { return x.unitCd != unit.unitCd });
            setUnitList(list);


        }

        const fetchData = async () => {
            // getUnitsList();
        };
        fetchData();
    }, [units, unit]);

    const DropDownItemsMapped = unitList ? unitList.map((item, i) => {
        return <DropdownItem key={i} onClick={() => setUserUnit(item)}>{item.unit + " " + item.unitType}</DropdownItem>
    }) : '';

    function setUserUnit(val) {
        http.post(SET_UNIT, {
            unitSelectedCd: val.unitCd
        })
            .then(res => {
                const response = res.data;
                if (res.status == 200) {
                    onSetUnit(val);
                    AuthService.setLocalUnit(val);
                }
            })
            .then(() => {
                window.location.replace("/");

            })
            .catch(error => {
                if (!error.status) {
                    toast(error, { position: 'top-right', type: 'error' })
                } else {

                }
            })
            .then(() => {

            })
    }

    return (
        <>
            {unitList ? <UncontrolledButtonDropdown nav inNavbar>
                <DropdownToggle nav>
                    <i className="nav-link-icon pe-7s-culture"> </i>
                    {unit.unit ? unit.unit + " " + unit.unitType : ''}
                    <FontAwesomeIcon className="ml-2 opacity-5" icon={faAngleDown} />
                </DropdownToggle>
                <DropdownMenu className="rm-pointers dropdown-menu-md" >
                    <div className="dropdown-menu-header ">
                        <div className="dropdown-menu-header-inner bg-info">

                            <div className="menu-header-content text-center text-white">
                                <h6 className="menu-header-subtitle mt-0">Change Unit</h6>
                            </div>
                        </div>
                    </div>
                    {DropDownItemsMapped}

                </DropdownMenu>
            </UncontrolledButtonDropdown> :
                <>
                    <UncontrolledButtonDropdown nav inNavbar>
                        <DropdownToggle nav>
                            <i className="nav-link-icon pe-7s-culture"> </i>
                            {unit.unit ? unit.unit : ''}
                        </DropdownToggle>
                    </UncontrolledButtonDropdown>
                </>
            }

        </>
    )

}

export default UnitBox;