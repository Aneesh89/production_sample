/**
 *
 * Loader
 *
 */
import React from 'react';
import { Loader as LoaderAnim } from 'react-loaders';
import {
  Container
} from 'reactstrap';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function Loader() {
  return (
    <>
      <div className="container h-100" >
        <div className="row h-100 justify-content-center align-items-center">
          <div
            className="col-12 loader-wrapper d-flex justify-content-center align-items-center ">
            <LoaderAnim type="ball-grid-pulse" />
          </div>
        </div>
      </div>
    </>
  );
}

Loader.propTypes = {};

export default Loader;
