/**
 *
 * ForgotPassword
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import ForgotPasswordForm from './ForgotPasswordForm';
import OtpForm from './OtpForm';
import UpdatePasswordForm from './UpdatePasswordForm';

export function ForgotPassword() {
  const [nav, setNav] = useState('forgotform');
  const [fprops, setFprops] = useState(null);
  return (
    <>
      {{
        'forgotform': <ForgotPasswordForm 
        setNav={setNav} 
        fprops={fprops}
        setFprops={setFprops}  
        />, 
        'otp': <OtpForm  
        setNav={setNav} 
        fprops={fprops} 
        setFprops={setFprops} 
        />,
        'updatepassword': <UpdatePasswordForm  
        setNav={setNav} 
        fprops={fprops} 
        setFprops={setFprops} 
        />
      }[nav]}
    </>
  )
}

ForgotPassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(ForgotPassword);
