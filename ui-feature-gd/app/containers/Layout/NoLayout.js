/**
 *
 * NoLayout
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
import makeSelectApp from '../App/selectors';
import reducer from './reducer';
import saga from './saga';
import AuthService from 'services/authService'

//Architect
import cx from 'classnames';
//import ResizeDetector from 'react-resize-detector';
//import AppMain from './Layout/AppMain';




export function NoLayout({ component: Component, ...rest }) {
    return (
        <Route {...rest} render={matchProps => (
            AuthService.isLoggedIn() === true ?
                //matchProps.session === true ?
                <Component {...matchProps} />
                :
                <Redirect to='/login' />
        )}
        />
    );
}

NoLayout.propTypes = {
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
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

export default compose(withConnect, memo)(NoLayout);
