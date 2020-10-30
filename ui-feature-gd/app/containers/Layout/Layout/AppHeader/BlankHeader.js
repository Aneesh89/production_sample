/**
 *
 * AppHeader
 *
 */
import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';


import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
    makeSelectLayout
} from '../../selectors';
import makeSelectApp from '../../../App/selectors';
import { setUnit } from '../../../App/actions';
import reducer from '../../reducer';
import saga from '../../saga';

//Architect
import cx from 'classnames';
import {
    Button
} from 'reactstrap';

import HeaderLogo from '../AppLogo';

export function BlankHeader({
    UI
}) {
    useInjectReducer({ key: 'layout', reducer });
    useInjectSaga({ key: 'layout', saga });

    return (
        <Fragment>

            <div className={cx("app-header", UI.headerBackgroundColor, { 'header-shadow': UI.enableHeaderShadow })}>
                <HeaderLogo />

                <div className={cx(
                    "app-header__content",
                    { 'header-mobile-open': UI.enableMobileMenuSmall },
                )}>
                    <div className="app-header-left">
                        

                    </div>
                    <div className="app-header-right">

                        <Button className="btn-pill btn-shadow btn-shine"
                            color="focus" href="/logout">
                            Logout
                                                                </Button>
                    </div>
                </div>
            </div>

        </Fragment>
    )

}
BlankHeader.propTypes = {
    UI: PropTypes.object,
    app: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onSetUnit: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
    UI: makeSelectLayout(),
    app: makeSelectApp()
});

export function mapDispatchToProps(dispatch) {
    return {
        onSetUnit: (unit) => dispatch(setUnit(unit))
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(withConnect, memo)(BlankHeader);
