/**
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';


import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLogin from './selectors';
import reducer from './reducer';
import saga from './saga';

//arcitect
import { Switch, Route } from 'react-router-dom';
import Slider from "react-slick";
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
import bg1 from '../../images/01.png';
import bg2 from '../../images/02.png';
import bg3 from '../../images/03.png';
import LoginForm from './LoginForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import  ForgotPassword  from '../ForgotPassword/Loadable';


export function Login() {
  // useInjectReducer({ key: 'login', reducer });
  // useInjectSaga({ key: 'login', saga });
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    initialSlide: 0,
    autoplay: true,
    adaptiveHeight: true
  };
  return (
    <>
      <div className="h-100">
        <Row className="h-100 no-gutters">
          <Col lg="4" className="d-none d-lg-block">
            <div className="slider-light">
              <Slider  {...settings}>
                <div
                  className="h-100 d-flex justify-content-center align-items-center bg-plum-plate">
                  <div className="slide-img-bg opacity-10"
                    style={{
                      backgroundImage: 'url(' + bg1 + ')'
                    }} />
                  {/* <div className="slider-content">
                    <h3>Kerala Police</h3>
                    <p>
                      Crime and Criminal Tracking Network & Systems
                                            </p>
                  </div> */}
                </div>
                <div
                  className="h-100 d-flex justify-content-center align-items-center bg-premium-dark">
                  <div className="slide-img-bg opacity-10"
                    style={{
                      backgroundImage: 'url(' + bg3 + ')'
                    }} />
                  {/* <div className="slider-content">
                    <h3>Kerala Police</h3>
                    <p>
                      Crime and Criminal Tracking Network & Systems
                                            </p>
                  </div> */}
                </div>
                <div
                  className="h-100 d-flex justify-content-center align-items-center bg-sunny-morning">
                  <div className="slide-img-bg opacity-10"
                    style={{
                      backgroundImage: 'url(' + bg2 + ')'
                    }} />
                  {/* <div className="slider-content">
                    <h3>Kerala Police</h3>
                    <p>
                      Crime and Criminal Tracking Network & Systems
                                            </p>
                  </div> */}
                </div>
              </Slider>
            </div>
          </Col>
          <Col lg="8" md="12" className="h-100 d-flex bg-white justify-content-center align-items-center">
            <Switch>
              <Route exact path="/login" component={LoginForm} />
              <Route exact path="/forgotpassword" component={ForgotPassword} />
            </Switch>


          </Col>
        </Row>
      </div>
      
    </>);
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Login);
