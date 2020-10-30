import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import {
    Col,
    Row,
    Button,
    FormGroup,
    Input,
    FormFeedback,
    Alert,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter
} from 'reactstrap';
import { Loader } from 'react-loaders';
import BlockUI from 'react-block-ui';

import captchaService from '../../services/captchaService';

import AuthService from '../../services/authService';

const LoginModal = (props) => {
    const [captchas, setCaptcha] = useState([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (props.session === false) {
                getCaptcha()
            }

        };

        fetchData();


    }, []);


    async function getCaptcha() {
        setReady(false);
        await captchaService.get()
            .then(res => {
                const response = res.data
                setCaptcha(response);
                setReady(true);


            })
            .catch(error => {
                toast(error, { position: 'top-right', type: 'error' })

            })
    }


    function resetCaptcha() {
        getCaptcha();
    }

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
            <Modal isOpen={props.isOpen} backdrop={true}>
                <ModalHeader >Your Session Expired - Enter password to continue</ModalHeader>
                <ModalBody>
                    <Formik
                        initialValues={{ username: props.user.username, password: '', captcha: '' }}
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
                            AuthService.relogin(values)
                                .then(res => {
                                    const response = res.data
                                    ///if user already loggged in
                                    if (response.logoutToken) {
                                        Swal.fire({
                                            btnSize:'sm',
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
                                                            'Removed!',
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

                                    if (response.keycloakToken) {
                                        AuthService.startSession(response);
                                        // setLoggedIn(true);

                                    }
                                    // 

                                    //setReady(true);
                                })
                                .catch(error => {
                                    actions.setSubmitting(false);
                                    if (!error.status) {
                                        toast(error, { position: 'top-right', type: 'error' })
                                    } else {

                                    }
                                })

                        }
                        }
                    >
                        {({ errors, touched, isSubmitting, dirty, resetForm, values, setFieldValue }) => (
                            <Col lg="10" md="10" sm="12" className="mx-auto app-login-box">
                                <h5 className="al">
                                    <span>Sign in as <span style={{ fontWeight: "bold" }}> {props.user.profileName}</span></span>
                                </h5>
                                <BlockUI tag="div" blocking={isSubmitting} loader={<Loader active type='ball-pulse-sync' color="#02a17c" />}>
                                    <div>
                                        <Form>

                                            <div className="col-sm-12">
                                                {errors.general && <Alert color="danger">
                                                    {errors.general}
                                                </Alert>}

                                            </div>
                                            <FormGroup row>
                                                <Col sm={12}>
                                                    <Field
                                                        type="hidden"
                                                        name="username"
                                                        as={Input}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>

                                                <Col sm={12}>
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
                                                <Col sm={12}>
                                                    {!ready && <Loader type="line-scale" />}
                                                    {ready && <CaptchaImage captcha={captchaImg} />}
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Col sm={12}>
                                                    <Field
                                                        type="text"
                                                        name="captcha"
                                                        bsSize="sm"
                                                        placeholder="Enter above code here"
                                                        autoComplete="off"
                                                        as={Input}
                                                        invalid={errors.captcha && touched.captcha}
                                                    />
                                                    <FormFeedback><ErrorMessage name="captcha" /></FormFeedback>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup check row>
                                                <Col lg={{ size: 0, offset: 4 }}>
                                                    <Button color="info" type="submit" disabled={isSubmitting}>Submit</Button>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                    </div>
                                </BlockUI>
                                <Row className="divider" />
                                <div>
                                    <h6>
                                        Sign in as another user, <Link to="/logout" >Sign in here</Link>
                                    </h6>
                                </div>
                            </Col>
                        )}
                    </Formik>
                </ModalBody>
                <ModalFooter>

                </ModalFooter>
            </Modal>



        </>
    );
};

export default LoginModal;