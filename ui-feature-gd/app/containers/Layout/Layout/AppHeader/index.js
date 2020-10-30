/**
 *
 * AppHeader
 *
 */
import React, { useState, useEffect, Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Link } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import cx from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { makeSelectLayout } from '../../selectors';
import makeSelectApp from '../../../App/selectors';
import { setUnit } from '../../../App/actions';
import reducer from '../../reducer';
import saga from '../../saga';

// Architect
import HeaderLogo from '../AppLogo';
import SearchBox from './Components/SearchBox';
import UserBox from './Components/UserBox';
import UnitBox from './Components/UnitBox';

import HeaderDots from './Components/HeaderDots';
// import ResizeDetector from 'react-resize-detector';

// import AppHeader from './Layout/AppMain';

export function Header({ UI, app, onSetUnit }) {
  useInjectReducer({ key: 'layout', reducer });
  useInjectSaga({ key: 'layout', saga });

  return (
    <Fragment>
      <ReactCSSTransitionGroup
        component="div"
        className={cx('app-header', UI.headerBackgroundColor, {
          'header-shadow': UI.enableHeaderShadow,
        })}
        transitionName="HeaderAnimation"
        transitionAppear
        transitionAppearTimeout={1500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <HeaderLogo />

        <div
          className={cx('app-header__content', {
            'header-mobile-open': UI.enableMobileMenuSmall,
          })}
        >
          <div className="app-header-left">
            <SearchBox />
          </div>
          <div className="app-header-right">
            <UnitBox
              unit={app.unit}
              onSetUnit={onSetUnit}
              units={app.units.list}
            />
            <UserBox user={app.user.data} />
          </div>
        </div>
      </ReactCSSTransitionGroup>
    </Fragment>
  );
}
Header.propTypes = {
  UI: PropTypes.object,
  app: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onSetUnit: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  UI: makeSelectLayout(),
  app: makeSelectApp(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSetUnit: unit => dispatch(setUnit(unit)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Header);
