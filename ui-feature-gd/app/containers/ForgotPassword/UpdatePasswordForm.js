import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import request from 'services/axiosApi';
import { useHistory } from 'react-router-dom';
import { GENERATE_OTP, VALIDATE_OTP, UPDATE_PASSWORD, RESEND_OTP } from './Api';


import { Col, Row, Button, FormGroup, Label, Input, FormText, Container, FormFeedback, Alert } from 'reactstrap';
import Loader from 'react-loaders';
import BlockUI from 'react-block-ui';
import {
    toast
} from 'react-toastify';
import Swal from 'sweetalert2';


const UpdatePasswordForm = (props) => {

    const [resend, setResend] = useState(false);
    const [blocking, setBlocking] = useState(false);
    let history = useHistory();

    

    return (
        <>

            <Formik
                initialValues={{ newPassword: '', confirmPassword: '' }}
                validationSchema={Yup.object({
                    newPassword: Yup.string()
                        .min(8, 'Password is too short - should be 8 chars minimum.')
                        .max(24, 'Password is too long - should be 24 chars maximum.')
                        .matches(/((?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_\-+=]).{8,24})/, 'Should contain alphabets,digits and special charecters')
                        .required('New password is required'),
                    confirmPassword: Yup.string()
                        .min(8, 'Password is too short - should be 8 chars minimum.')
                        .max(24, 'Password is too long - should be 24 chars maximum.')
                        .matches(/((?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_\-+=]).{8,24})/, 'Should contain alphabets,digits and special charecters')
                        .oneOf([Yup.ref('newPassword'), null], 'Should be same as new password')
                        .required('Confirm password is required'),
                })}
                onSubmit={(values, actions) => {
                    values.otpToken = props.fprops.token;
                    actions.setSubmitting(true);
                    request({
                        url: UPDATE_PASSWORD,
                        method: 'POST',
                        data: values
                    })
                        .then(res => {
                            const response = res.data;
                            if (res.status === 200) {
                                actions.setSubmitting(false);
                                Swal.fire(
                                    'Password Changed Successfully',
                                    response.message,
                                    'Success'
                                )
                                setTimeout(() => {
                                    history.push('/login');
                                }, 2000);
                            }

                            if (response.validationErrors) {
                                actions.setSubmitting(false);
                                //console.log(response.validationErrors);
                                for (let [key, value] of Object.entries(response.validationErrors)) {
                                    actions.setFieldError(key, value)
                                }
                            }

                            if (response.errors) {
                                actions.setSubmitting(false);
                                //console.log(response.validationErrors);                             
                                actions.setFieldError('general', response.message)
                            }
                        })
                        .catch(error => {
                            actions.setSubmitting(false);
                            if (!error.status) {
                                toast(error, { position: 'top-center', type: 'error' })
                            } else {
                                toast("Unexpected error", { position: 'top-center', type: 'error' })
                            }
                        })
                        .then(() => {

                        })

                }
                }
            >
                {({ errors, touched, isSubmitting, dirty, resetForm, values, setFieldValue }) => (
                    <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
                        <div className="app-logo" />
                        <h4 className="mb-0 te text-warning">
                            <span>Please create new password</span>
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
                                        <Label for="newPassword" sm={2}>New Password</Label>
                                        <Col sm={7}>
                                            <Field
                                                type="password"
                                                name="newPassword"
                                                bsSize="sm"
                                                placeholder="Enter New Password"
                                                as={Input}
                                                invalid={errors.newPassword && touched.newPassword}
                                            />
                                            <FormFeedback><ErrorMessage name="newPassword" /></FormFeedback>
                                            <FormText className="text-muted">Password must be at least 8 characters in length and maximum 24 charecters. Atleast one numeric and one special charecter required.  </FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="confirmPassword" sm={2}>Confirm New Password</Label>
                                        <Col sm={7}>
                                            <Field
                                                type="password"
                                                name="confirmPassword"
                                                bsSize="sm"
                                                placeholder="Confirm New Password"
                                                as={Input}
                                                invalid={errors.confirmPassword && touched.confirmPassword}
                                            />
                                            <FormFeedback><ErrorMessage name="confirmPassword" /></FormFeedback>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup check row>
                                        <Col sm={{ size: 0, offset: 2 }}>
                                            <Button color="secondary" type="reset" onClick={resetForm} disabled={!dirty} >Clear</Button> {' '}
                                            <Button color="info" type="submit" disabled={isSubmitting}>Submit</Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </div>
                        </BlockUI>
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

export default UpdatePasswordForm;