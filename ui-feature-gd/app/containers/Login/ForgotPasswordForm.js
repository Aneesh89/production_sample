import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import captchaService from '../../services/captchaService';

import AuthService from '../../services/authService';

import { Col, Row, Button, FormGroup, Label, Input, FormText, Container, FormFeedback } from 'reactstrap';
import Loader from 'react-loaders';
import {
    toast
} from 'react-toastify';




function saveValue(values) {
    alert(JSON.stringify(values, null, 2));
}
const ForgotPasswordForm = () => {
    const [captchas, setCaptcha] = useState([]);
    const [ready, setReady] = useState(false);
    const [previousLogin, setPreviousLogin] = useState(false);
    const [logoutToken, setLogoutToken] = useState('');

    useEffect(() => {
        getCaptcha();
    }, []);

    function getCaptcha() {
        setReady(false);
        captchaService.get()
            .then(response => {
                //alert(JSON.stringify(response.status));
                setCaptcha(response);
                setReady(true);

            })
            .catch(error => {
                toast(error, { position: 'top-right', type: 'error' })
                //alert(JSON.stringify(error.status));

            })
    }

    function logoutPreviousSession(token) {
        AuthService.logout(token)
            .then
    }

    function formReset() {
        getCaptcha();

    }

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
                onSubmit={(values, { setSubmitting }) => {
                    values.token = token;
                    setSubmitting(true);
                    AuthService.login(values)
                        .then(response => {

                            if (response.logoutToken) {
                                alert(JSON.stringify(response.logoutToken));
                                if (confirm("Another session is already running!! Do you want to logout previous session?")) {
                                    AuthService.logout(response.logoutToken, values.username)
                                        .then(response => {
                                            alert(JSON.stringify(response));
                                        })
                                        .catch(error => {
                                            alert(JSON.stringify(error));
                                        });
                                }
                            }

                        })
                        .catch(error => {
                            setSubmitting(false);
                            if (!error.status) {
                                toast(error, { position: 'top-right', type: 'error' })
                            } else {
                                alert(JSON.stringify(error.status));
                            }
                        })

                }}
            >
                {({ errors, touched, isSubmitting, dirty, resetForm, values, setFieldValue }) => (
                    <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
                        <div className="app-logo" />
                        <h4 className="mb-0">
                            <span>Forgot Password!!</span>
                        </h4>
                        <Row className="divider" />
                        <div>
                            <Form>
                                <FormGroup row>
                                    <Label for="username" sm={2}>Username</Label>
                                    <Col sm={7}>
                                        <Field
                                            type="text"
                                            name="username"
                                            bsSize="sm"
                                            as={Input}
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
                        <Row className="divider" />
                        <div>
                            <h6>
                             <Link to="/login" >Click to Login</Link>
                            </h6>
                        </div>
                    </Col>
                )}
            </Formik>
        </>
    );
};

export default ForgotPasswordForm;