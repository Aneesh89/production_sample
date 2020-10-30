/**
 *
 * Logout
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { logout } from '../App/actions';
import AuthService from '../../services/authService';
import BlockUI from 'react-block-ui';
import Swal from 'sweetalert2';
import { Loader, Types } from 'react-loaders';
import { Redirect } from 'react-router-dom';

export function Logout({ onLogout }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    appLogout();
  }, []);

  function appLogout() {
    AuthService.userLogout()
      .then(res => {

        onLogout();
        setLoading(false);

      })
      .catch(error => {

      });
  }

  if (!loading) {
    return <Redirect to='/login' />
  }
  return (
    <BlockUI tag="div" blocking={loading} loader={<Loader active type='ball-pulse-sync'  />}>
      <div className="row h-100 justify-content-center align-items-center"></div>
    </BlockUI>
  );
}

Logout.propTypes = {
  onLogout: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    onLogout: () => dispatch(logout())
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(Logout);
