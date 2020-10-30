import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {setUnit, setNxtPg } from '../App/actions';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectApp from '../App/selectors';
import reducer from '../App/reducer';
import saga from '../App/saga';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, Redirect,useHistory } from 'react-router-dom';
import captchaService from '../../services/captchaService';
import AuthService from '../../services/authService';

import { Col, Row, Button, FormGroup, Label, Input, FormText, Container, FormFeedback, Alert } from 'reactstrap';
import { Loader, Types } from 'react-loaders';
import BlockUI from 'react-block-ui';

import Swal from 'sweetalert2';
import {
    toast
} from 'react-toastify';

const LoginForm = ({
    app,
    onSetUnit,
    onSetNextPage
  }) => {
    useInjectReducer({ key: 'app', reducer });
    useInjectSaga({ key: 'app', saga });
    const [captchas, setCaptcha] = useState([]);
    const [ready, setReady] = useState(false);
    let history = useHistory();



    useEffect(() => {
        const mounted = { current: true };
        if (mounted.current) {
            getCaptcha();
        }
        return () => {
            mounted.current = false;
        }
    }, []);


    async function getCaptcha() {
        setReady(false);
        await captchaService.get()
            .then(res => {
                const response = res.data
                // alert(JSON.stringify(response));
                setCaptcha(response);
                setReady(true);


            })
            .catch(error => {
                toast(error, { position: 'top-right', type: 'error' })
                //alert(JSON.stringify(error.status));

            })
    }


    function resetCaptcha() {
        getCaptcha();
    }

    const handleReset = (resetForm) => {
          resetForm();
          resetCaptcha();
    
      };

    //console.log("captcha", captchaObj);
    let { token, captchaImg } = captchas;
    const CaptchaImage = ({ captcha }) => {
        return (
            <>
                <img src={`data:image/jpeg;base64,${captchaImg}`} />
                <Button type="button" className="mb-2 mr-2 btn-icon" color="link" onClick={getCaptcha} title="Reload image">
                    <i className="pe-7s-refresh-2 btn-icon-wrapper"> </i>
                </Button>
            </>)
    };
    return (
        <>

            <Formik
                initialValues={{ username: '', password: '', captcha: '' }}
                validationSchema={Yup.object({
                    username: Yup.string()
                        .max(20, 'Invalid username')
                        .required('Username is required'),
                    password: Yup.string()
                        .required('Password is required'),
                    captcha: Yup.string()
                        .max(20, 'Invalid securitycode')
                        .required('Security code is required'),
                })}
                onSubmit={(values, actions) => {
                    values.token = token;
                    actions.setSubmitting(true);
                    
                    AuthService.login(values)
                        .then(res => {
                            const response = res.data
                            
                            ///if user already loggged in
                            if (response.logoutToken) {
                                Swal.fire({
                                    title: 'Another Login Found!!',
                                    text: 'Another login found for the same user!',
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: 'Remove previous Session!',
                                    cancelButtonText: 'No, keep it'
                                }).then((result) => {
                                    if (result.value) {
                                        actions.setSubmitting(true);
                                        AuthService.logout(response.logoutToken, values.username)
                                            .then(res => {
                                                const response = res.data
                                                Swal.fire(
                                                    'Previous Session Removed!',
                                                    response.message,
                                                    'success'
                                                );
                                                actions.setSubmitting(false);
                                                //toast(response.message, { position: 'top-right', type: 'success' });
                                                resetCaptcha();
                                                actions.setFieldValue('captcha','');

                                            })
                                            .catch(error => {
                                               // actions.setSubmitting(false);
                                                Swal.fire(
                                                    'Cannot Remove Now!',
                                                    response.message,
                                                    'error'
                                                )
                                                //toast(error, { position: 'top-right', type: 'error' })
                                            });

                                    }
                                });
                                resetCaptcha();   
                                actions.setFieldValue('captcha','');                             
                                actions.setSubmitting(false);
                            }

                            if (response.validationErrors) {
                                actions.setSubmitting(false);
                                resetCaptcha();
                                //console.log(response.validationErrors);
                                for (let [key, value] of Object.entries(response.validationErrors)) {
                                    actions.setFieldError(key, value);
                                }
                            }

                            if (response.errors) {
                                actions.setSubmitting(false);
                               // actions.setFieldValue('captcha','');
                                resetCaptcha();
                                //console.log(response.validationErrors);                             
                                actions.setFieldError('general', response.message);
                               // actions.setFieldValue('captcha','');
                            }
                            if (response.keycloakToken) {                                
                                AuthService.startSession(response);
                                if(response.user.nextPageFlag === "Home"){
                                    let unit = {
                                        unitCd:response.user.baseUnitCd,
                                        unit:response.user.baseUnit
                                    }
                                    onSetUnit(unit);
                                    AuthService.setLocalUnit(unit);
                                   // window.location.replace("/");
                                    history.push('/');                                                                        
                                }else if(response.user.nextPageFlag === "Password"){

                                    onSetNextPage(response.user.nextPageFlag);
                                    history.push('/changePassword');
                                }
                                
                                
                                
                            }
                            
                            // 

                            //setReady(true);
                        })
                        .catch(error => {
                            //actions.setSubmitting(false);
                            console.log(error);
                            if (error.status) {
                                toast(error, { position: 'top-right', type: 'error' })
                            } else {
                                toast("Unexpected Error", { position: 'top-right', type: 'error' })
                            }
                        })

                    /* 
                     setTimeout(() => {
                         alert(JSON.stringify(values, null, 2));
                         setSubmitting(false);
                     }, 400);
     
                     */
                }
                }
            >
                {({ errors, touched, isSubmitting, dirty, resetForm, values, setFieldValue }) => (
                    <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
                        <div className="app-logo" />
                        <h4 className="mb-0">
                            <span>Sign in to your CCTNS account.</span>
                        </h4>
                        <Row className="divider" />
                        <BlockUI tag="div" blocking={isSubmitting} loader={<Loader active type='ball-pulse-sync' />}>
                            <div>
                                <Form>

                                    <div className="col-sm-12">
                                        {errors.general && <Alert color="danger">
                                            {errors.general}
                                        </Alert>}

                                    </div>
                                    <FormGroup row>
                                        <Label for="username" sm={2}>Username</Label>
                                        <Col sm={7}>
                                            <Field
                                                type="text"
                                                name="username"
                                                bsSize="sm"
                                                placeholder="Enter Username"
                                                autoComplete="nope"
                                                as={Input}
                                                invalid={errors.username && touched.username} />
                                            <FormFeedback><ErrorMessage name="username" /></FormFeedback>
                                        </Col>

                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="userpassword" sm={2}>Password</Label>
                                        <Col sm={7}>
                                            <Field
                                                type="password"
                                                name="password"
                                                bsSize="sm"
                                                placeholder="Enter Password"
                                                as={Input}
                                                invalid={errors.password && touched.password}
                                            />
                                            <FormFeedback><ErrorMessage name="password" /></FormFeedback>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="userCaptcha" sm={2}></Label>
                                        <Col sm={7}>
                                            {!ready && <Loader type="line-scale" />}
                                            {ready && <CaptchaImage captcha={captchaImg} />}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="captcha" sm={2}>Security code</Label>
                                        <Col sm={7}>
                                            <Field
                                                type="text"
                                                name="captcha"
                                                bsSize="sm"
                                                placeholder="Enter above code here"
                                                autoComplete="nope"
                                                as={Input}
                                                invalid={errors.captcha && touched.captcha}
                                            />
                                            <FormFeedback><ErrorMessage name="captcha" /></FormFeedback>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup check row>
                                        <Col sm={{ size: 0, offset: 2 }}>
                                            <Button color="secondary" type="reset" onClick={handleReset.bind(null, resetForm)} disabled={!dirty} >Clear</Button> {' '}
                                            <Button color="info" type="submit" disabled={isSubmitting}>Submit</Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </div>
                        </BlockUI>
                        <Row className="divider" />
                        <div>
                            <h6>
                                If you forgot your password, <Link to="/forgotpassword" >Recover Your Password Here</Link>
                            </h6>
                        </div>
                    </Col>
                )}
            </Formik>


        </>
    );
};

LoginForm.propTypes = {
    app: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onSetUnit: PropTypes.func,
    onSetNextPage :PropTypes.func

  };
  
  const mapStateToProps = createStructuredSelector({
    app: makeSelectApp(),
  });
  
  function mapDispatchToProps(dispatch) {
    return {
      onSetUnit: unit => dispatch(setUnit(unit)),
      onSetNextPage:(pg)=>dispatch(setNxtPg(pg))

  
    };
  }
  
  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );
  
  export default compose(withConnect)(LoginForm);