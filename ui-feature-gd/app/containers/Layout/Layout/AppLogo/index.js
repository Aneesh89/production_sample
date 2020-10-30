/**
 *
 * AppLogo
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
    setEnableClosedSidebar
} from '../../actions';
import reducer from '../../reducer';
import saga from '../../saga';

//Architect
import Hamburger from 'react-hamburgers';

import AppMobileMenu from '../AppMobileMenu';



export function HeaderLogo({
    UI,
    onSetEnableClosedSidebar
}) {
    useInjectReducer({ key: 'layout', reducer });
    useInjectSaga({ key: 'layout', saga });

    const [active, setActive] = useState(false);
    const [mobile, setMobile] = useState(false);
    const [activeSecondaryMenuMobile, setActiveSecondaryMenuMobile] = useState(false);


    const toggleEnableClosedSidebar = () => {
        let { enableClosedSidebar } = UI;
        onSetEnableClosedSidebar(!enableClosedSidebar);
    }

    return (
        <Fragment>
            <div className="app-header__logo">
                <div className="logo-src" />
                <div className="header__pane ml-auto">
                    <div onClick={toggleEnableClosedSidebar}>
                        <Hamburger
                            active={UI.enableClosedSidebar}
                            type="elastic"
                            onClick={() => setActive(!{ active })}
                        />
                    </div>
                </div>
            </div>
            <AppMobileMenu />
        </Fragment>
    )


}

HeaderLogo.propTypes = {
    dispatch: PropTypes.func.isRequired,
    UI: PropTypes.object,
    onSetEnableClosedSidebar: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
    UI: makeSelectLayout(),
});


export function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        onSetEnableClosedSidebar: enable => dispatch(setEnableClosedSidebar(enable)),        
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(withConnect, memo)(HeaderLogo);
