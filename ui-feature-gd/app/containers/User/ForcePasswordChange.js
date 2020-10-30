import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { setUnit, setNxtPg } from '../App/actions';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectApp from '../App/selectors';
import reducer from '../App/reducer';
import saga from '../App/saga';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, Redirect, useHistory } from 'react-router-dom';
import AuthService from 'services/authService';
import { CHANGE_PASSWORD } from './Api';


import { Col, Row, Button, FormGroup, Label, Input, FormText, Container, FormFeedback, Alert } from 'reactstrap';
import { Loader, Types } from 'react-loaders';
import BlockUI from 'react-block-ui';

import Swal from 'sweetalert2';
import {
    toast
} from 'react-toastify';
import http from 'services/http';

const ForcePasswordChange = ({
    app,
    onSetUnit,
    onSetNextPage
}) => {
    useInjectReducer({ key: 'app', reducer });
    useInjectSaga({ key: 'app', saga });

    const [ready, setReady] = useState(false);

    let history = useHistory();




    return (
        <>

            <Formik
                initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
                validationSchema={Yup.object({
                    oldPassword: Yup.string()
                        .min(8, 'Password is too short - should be 8 chars minimum.')
                        .max(24, 'Password is too long - should be 24 chars maximum.')
                        .matches(/((?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_\-+=]).{8,24})/, 'Should contain alphabets,digits and special charecters')
                        .required('Old password is required'),
                    newPassword: Yup.string()
                        .min(8, 'Password is too short - should be 8 chars minimum.')
                        .max(24, 'Password is too long - should be 24 chars maximum.')
                        .matches(/((?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_\-+=]).{8,24})/, 'Should contain alphabets,digits and special charecters')
                        .notOneOf([Yup.ref('oldPassword'), null], 'Should be different from old password')
                        .required('New password is required'),
                    confirmPassword: Yup.string()
                        .min(8, 'Password is too short - should be 8 chars minimum.')
                        .max(24, 'Password is too long - should be 24 chars maximum.')
                        .matches(/((?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_\-+=]).{8,24})/, 'Should contain alphabets,digits and special charecters')
                        .oneOf([Yup.ref('newPassword'), null], 'Should be same as new password')
                        .required('Confirm password is required'),
                })}
                onSubmit={(values, actions) => {
                    actions.setSubmitting(true);
                    http.post(CHANGE_PASSWORD, {
                        oldPassword: values.oldPassword,
                        newPassword: values.newPassword
                    })
                        .then(res => {
                            const response = res.data;
                            if (res.status == 200) {
                                actions.setSubmitting(false);

                                Swal.fire(
                                    'Password Changed Successfully',
                                    response.message,
                                    'Success'
                                )
                                setTimeout(() => {
                                    AuthService.clearStorage();
                                    history.push('/login');
                                }, 3000);


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
                        <h4 className="mb-0">
                            <span>Change your Password</span>
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
                                        <Label for="oldPassword" sm={2}>Old Password</Label>
                                        <Col sm={7}>
                                            <Field
                                                type="password"
                                                name="oldPassword"
                                                bsSize="sm"
                                                placeholder="Enter your old Password"
                                                autoComplete="nope"
                                                as={Input}
                                                invalid={errors.oldPassword && touched.oldPassword} />

                                            <FormFeedback><ErrorMessage name="oldPassword" /></FormFeedback>
                                        </Col>

                                    </FormGroup>
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


                    </Col>
                )}
            </Formik>


        </>
    );
};

ForcePasswordChange.propTypes = {
    app: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onSetUnit: PropTypes.func,
    onSetNextPage: PropTypes.func

};

const mapStateToProps = createStructuredSelector({
    app: makeSelectApp(),
});

function mapDispatchToProps(dispatch) {
    return {
        onSetUnit: unit => dispatch(setUnit(unit)),
        onSetNextPage: (pg) => dispatch(setNxtPg(pg))


    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(withConnect)(ForcePasswordChange);