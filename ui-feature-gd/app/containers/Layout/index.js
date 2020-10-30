/**
 *
 * Layout
 *
 */

import React, { useState, useEffect, Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ResizeDetector from 'react-resize-detector';
import { Route, Redirect } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import cx from 'classnames';
import {
  makeSelectLayout
} from './selectors';
import makeSelectApp from '../App/selectors';
import { setUnit, fetchUnitsSuccess } from '../App/actions';
import reducer from './reducer';
import saga from './saga';

import appReducer from '../App/reducer';
import appSaga from '../App/saga';

//Architect
// import ResizeDetector from 'react-resize-detector';
// import AppMain from './Layout/AppMain';
import AppHeader from "./Layout/AppHeader";
import AppSidebar from "./Layout/AppSidebar";
import AppFooter from "./Layout/AppFooter";
import PageTitle from './Layout/AppMain/PageTitle';
import AuthService from 'services/authService';
import LoginModal from '../Login/LoginModal';
import UnitSelectModal from './UnitSelectModal';
import { fetchMenu } from './actions';

export function Layout({ UI, app, children, onSetUnit, onFetchUnits }) {
  useInjectReducer({ key: 'layout', reducer });
  useInjectSaga({ key: 'layout', saga });
  useInjectReducer({ key: 'app', reducer: appReducer });
  useInjectSaga({ key: 'app', saga: appSaga });

  window.addEventListener('beforeunload', ev => {
    // console.log("EVENT LISTNER", ev);
    ev.preventDefault();

    // return ev.returnValue = 'Are you sure you want to close?';
  });

  return (
    app.user.data.nextPageFlag == 'Password' ?
      <Redirect to="/changePassword" />
      :
      <ResizeDetector
        handleWidth
        render={({ width }) => (
          <Fragment>
            <div
              className={cx(
                "app-container app-theme-" + UI.colorScheme,
                { 'fixed-header': UI.enableFixedHeader },
                { 'fixed-sidebar': UI.enableFixedSidebar || width < 1250 },
                { 'fixed-footer': UI.enableFixedFooter },
                { 'closed-sidebar': UI.enableClosedSidebar || width < 1250 },
                { 'closed-sidebar-mobile': UI.closedSmallerSidebar || width < 1250 },
                { 'sidebar-mobile-open': UI.enableMobileMenu },
                { 'body-tabs-shadow-btn': UI.enablePageTabsAlt },
              )}>

              {
                (app.session === false) ?
                  <LoginModal isOpen={!app.session} session={app.session} user={app.user.data} /> :
                  null
              }
              {
                (app.unit.unitCd === false) ?
                  <UnitSelectModal isOpen={!app.unit.unitCd} unit={app.unit} onSetUnit={onSetUnit} onFetchUnits={onFetchUnits} /> :
                  null
              }
              <AppHeader />
              <div className="app-main">
                <AppSidebar />
                <div className="app-main__outer">
                  <div className="app-main__inner">{children}</div>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      />
  );
}

Layout.propTypes = {
  UI: PropTypes.object,
  app: PropTypes.object,
  onSetUnit: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  UI: makeSelectLayout(),
  app: makeSelectApp(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSetUnit: unit => dispatch(setUnit(unit)),
    onFetchUnits: units => dispatch(fetchUnitsSuccess(units)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Layout);
