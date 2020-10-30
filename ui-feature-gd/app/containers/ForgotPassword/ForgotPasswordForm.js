import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import request from 'services/axiosApi';
import { GENERATE_OTP } from './Api';
import captchaService from '../../services/captchaService';

import AuthService from '../../services/authService';

import { Col, Row, Button, FormGroup, Label, Input, FormText, Container, FormFeedback ,Alert} from 'reactstrap';
import Loader from 'react-loaders';
import BlockUI from 'react-block-ui';
import Swal from 'sweetalert2';
import {
    toast
} from 'react-toastify';


const ForgotPasswordForm = (props) => {
    const [captchas, setCaptcha] = useState([]);
    const [ready, setReady] = useState(false);

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

    let { token, captchaImg } = captchas;
    const CaptchaImage = () => {
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
                initialValues={{ username: '', captcha: '' }}
                validationSchema={Yup.object({
                    username: Yup.string()
                        .max(20, 'Invalid username')
                        .required('Username is required'),
                    captcha: Yup.string()
                        .max(20, 'Invalid securitycode')
                        .required('Security code is required'),
                })}
                onSubmit={(values, actions) => {
                    values.token = token;
                    actions.setSubmitting(true);
                    request({
                        url: GENERATE_OTP,
                        method: 'POST',
                        data: values
                    })
                        .then(res => {
                            actions.setSubmitting(false);
                            const response = res.data
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
               
                                actions.setSubmitting(false);
                            }
                            if (response.token) {
                                response.username=values.username;
                                props.setFprops(response);
                                props.setNav('otp');
                            }

                            if (response.validationErrors) {
                                actions.setSubmitting(false);
                                //console.log(response.validationErrors);
                                for (let [key, value] of Object.entries(response.validationErrors)) {
                                    actions.setFieldError(key, value)
                                }
                                resetCaptcha();
                            }

                            if (response.errors) {
                                actions.setSubmitting(false);
                                //console.log(response.validationErrors);                             
                                actions.setFieldError('general', response.message)
                                resetCaptcha();

                            }
                        })
                        .catch(error => {
                            if (error.status) {
                                toast(error, { position: 'top-right', type: 'error' })
                            } else {
                                toast("Unexpected Error", { position: 'top-right', type: 'error' })
                            }
                        });



                }}
            >
                {({ errors, touched, isSubmitting, dirty, resetForm, values, setFieldValue }) => (
                    <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
                        <div className="app-logo" />
                        <h3 className="mb-0 text-warning">
                            <span>Reset Your Password</span>
                        </h3>
                        <p>Please enter your username to reset the password. </p>
                        <Row className="divider" />
                        <BlockUI tag="div" blocking={isSubmitting} loader={<Loader active type='ball-pulse-sync'/>}>
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
                                                as={Input}
                                                autoComplete="off"
                                                placeholder="Enter Username"
                                                invalid={errors.username && touched.username} />
                                            <FormFeedback><ErrorMessage name="username" /></FormFeedback>
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
                                                as={Input}
                                                autoComplete="off"
                                                invalid={errors.captcha && touched.captcha}
                                            />

                                            <FormFeedback><ErrorMessage name="captcha" /></FormFeedback>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup check row>
                                        <Col sm={{ size: 0, offset: 2 }}>

                                            <Button color="info" type="submit" disabled={isSubmitting}>Next</Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </div>
                        </BlockUI>
                        <Row className="divider" />
                        <div>
                            <h6>
                                <Link to="/login" >Back to Login</Link>
                            </h6>
                        </div>
                    </Col>
                )}
            </Formik>
        </>
    );
};

export default ForgotPasswordForm;