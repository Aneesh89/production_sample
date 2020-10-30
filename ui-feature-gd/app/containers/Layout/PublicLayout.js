/**
 *
 * Public Layout
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
import {
  makeSelectLayout
} from './selectors';
import reducer from './reducer';
import saga from './saga';

//Architect
import cx from 'classnames';
//import ResizeDetector from 'react-resize-detector';
//import AppMain from './Layout/AppMain';
import AppHeader from './Layout/AppHeader/';
import AppSidebar from './Layout/AppSidebar/';
import AppFooter from './Layout/AppFooter/';
import PageTitle from './Layout/AppMain/PageTitle';
import AuthService from 'services/authService';
import Login from '../Login/Loadable';

export function PublicLayout({ component: Component, UI, ...rest }) {
  useInjectReducer({ key: 'layout', reducer });
  useInjectSaga({ key: 'layout', saga });
  return (

    <Route {...rest} render={matchProps => (
     // !AuthService.isLoggedIn() ? (!AuthService.checkTab() ? <NotAllowed />:<Login /> ) :<Redirect to='/' />
      !AuthService.isLoggedIn() ? <Login />  :<Redirect to='/' />
      //!matchProps.session ? <Login />  :<Redirect to='/' />
        )} />
      )    
    
    }
    
PublicLayout.propTypes = {
          dispatch: PropTypes.func.isRequired,
        UI: PropTypes.object
      };
      
const mapStateToProps = createStructuredSelector({
          UI: makeSelectLayout(),
      });
      
      
export function mapDispatchToProps(dispatch) {
  return {
          dispatch,
  };
      }
      
      const withConnect = connect(
        mapStateToProps,
        mapDispatchToProps,
      );
      
      export default compose(withConnect, memo)(PublicLayout);
