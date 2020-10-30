/**
 *
 * AppSidebar
 *
 */

import React, { useState, useEffect, Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import cx from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeSelectLayout } from '../../selectors';
import { makeSelectMenu} from '../../../App/selectors';
import reducer from '../../reducer';
import saga from '../../saga';

// Architect
import Nav from '../AppNav/VerticalNavWrapper';

import HeaderLogo from '../AppLogo';

import { setEnableMobileMenu } from '../../actions';

export function AppSidebar({ UI, onSetEnableMobileMenu, onFetchMenu }) {
  useInjectReducer({ key: 'layout', reducer });
  useInjectSaga({ key: 'layout', saga });

  const toggleMobileSidebar = () => {
    const { enableMobileMenu } = UI;
    onSetEnableMobileMenu(!enableMobileMenu);
  };

  return (
    <Fragment>
      <div className="sidebar-mobile-overlay" onClick={toggleMobileSidebar} />
      <ReactCSSTransitionGroup
        component="div"
        className={cx('app-sidebar', UI.backgroundColor, {
          'sidebar-shadow': UI.enableSidebarShadow,
        })}
        transitionName="SidebarAnimation"
        transitionAppear
        transitionAppearTimeout={1500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <HeaderLogo />
        <PerfectScrollbar>
          <div className="app-sidebar__inner">
            <Nav />
          </div>
        </PerfectScrollbar>
        <div
          className={cx('app-sidebar-bg', UI.backgroundImageOpacity)}
          style={{
            backgroundImage: UI.enableBackgroundImage
              ? `url(${UI.backgroundImage})`
              : null,
          }}
        />
      </ReactCSSTransitionGroup>
    </Fragment>
  );
}

AppSidebar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  UI: PropTypes.object,
  onSetEnableMobileMenu: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  UI: makeSelectLayout(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onSetEnableMobileMenu: enable => dispatch(setEnableMobileMenu(enable)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AppSidebar);
