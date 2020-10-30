/**
 *
 * Toaster
 *
 */
import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {
  toast,
  Bounce
} from 'react-toastify';

const Toaster = (props)=> toast(props.msg ? props.msg:'' , {
    transition: Bounce,
    closeButton: true,
    autoClose: 5000,
    position: props.position ? props.position:'bottom-center',
    type: props.type ? props.type:'success'
});

export default Toaster;
const toas ={
  msg:"gjhghjj"
}

Toaster(toas);
