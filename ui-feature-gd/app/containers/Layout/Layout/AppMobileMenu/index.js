/**
 *
 * AppMobileMenu
 *
 */
import React, { useState, useEffect, Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';


import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
    makeSelectLayout
} from '../../selectors';

import {
    setEnableMobileMenu,
    setEnableMobileMenuSmall,
} from '../../actions';

import reducer from '../../reducer';
import saga from '../../saga';

//Architect
import Hamburger from 'react-hamburgers';

import cx from 'classnames';

import {
    faEllipsisV,

} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {
    Button
} from 'reactstrap';


export function AppMobileMenu({
    UI,
    onSetEnableMobileMenu,
    onSetEnableMobileMenuSmall,
}) {
    useInjectReducer({ key: 'layout', reducer });
    useInjectSaga({ key: 'layout', saga });

    const [active, setActive] = useState(false);
    const [activeMobile, setActiveMobile] = useState(false);
    const [mobile, setMobile] = useState(false);
    const [activeSecondaryMenuMobile, setActiveSecondaryMenuMobile] = useState(false);

   

    const toggleMobileSidebar = () => {
        let {enableMobileMenu} = UI;
        onSetEnableMobileMenu(!enableMobileMenu);
    }


    const toggleMobileSmall = () => {
        
        let {enableMobileMenuSmall} = UI;
        alert(enableMobileMenuSmall);
        onSetEnableMobileMenuSmall(!enableMobileMenuSmall);
    }
   
    return (
        <Fragment>

                <div className="app-header__mobile-menu">
                    <div onClick={toggleMobileSidebar}>
                        <Hamburger
                            active={UI.enableMobileMenu}
                            type="elastic"
                            onClick={() => setActiveMobile(!{activeMobile})}
                        />
                    </div>
                </div>
                <div className="app-header__menu">
                    <span onClick={toggleMobileSmall}>
                        <Button size="sm"
                                className={cx("btn-icon btn-icon-only", {active: activeSecondaryMenuMobile})}
                                color="primary"
                                onClick={() => setActiveSecondaryMenuMobile(!{activeSecondaryMenuMobile})}>
                            <div className="btn-icon-wrapper"><FontAwesomeIcon icon={faEllipsisV}/></div>
                        </Button>
                    </span>
                </div>
            </Fragment>
    )


}

AppMobileMenu.propTypes = {
    dispatch: PropTypes.func.isRequired,
    UI: PropTypes.object,
    onSetEnableMobileMenu: PropTypes.func,
    onSetEnableMobileMenuSmall: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
    UI: makeSelectLayout(),
});


export function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        onSetEnableMobileMenu: enable => dispatch(setEnableMobileMenu(enable)),  
        onSetEnableMobileMenuSmall: enable => dispatch(setEnableMobileMenuSmall(enable)),      
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(withConnect, memo)(AppMobileMenu);
