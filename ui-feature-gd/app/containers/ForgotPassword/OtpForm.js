import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import request from 'services/axiosApi';

import {
  Col,
  Row,
  Button,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Alert,
} from 'reactstrap';
import Loader from 'react-loaders';
import BlockUI from 'react-block-ui';
import { toast } from 'react-toastify';
import { VALIDATE_OTP, RESEND_OTP } from './Api';

const OtpForm = props => {
  const [resend, setResend] = useState(false);
  const [blocking, setBlocking] = useState(false);
  const topcenter = 'top-center';

  function resendOtp() {
    setBlocking(true);
    setResend(true);
    request({
      url: RESEND_OTP,
      method: 'POST',
      data: {
        username: props.fprops.username,
        token: props.fprops.token,
      },
    })
      .then(res => {
        const response = res.data;
        setBlocking(false);
        if (res.status === 200) {
          toast(response.message, { position: topcenter, type: 'success' });
        }
        if (response.errors) {
          setBlocking(false);
          // actions.setFieldValue('captcha','');
          // console.log(response.validationErrors);
          toast('Error sending OTP', { position: topcenter, type: 'error' });
          // actions.setFieldValue('captcha','');
        }
      })
      .catch(error => {
        setBlocking(false);
        if (error.status) {
          toast(error, { position: topcenter, type: 'error' });
        } else {
          toast('Unexpected Error', { position: topcenter, type: 'error' });
        }
      });
    // setResending(false);
  }

  return (
    <>
      <Formik
        initialValues={{ otp: '' }}
        validationSchema={Yup.object({
          otp: Yup.number()
            .positive('Invalid OTP')
            .required('OTP is required'),
        })}
        onSubmit={(values, actions) => {
          values.username = props.fprops.username;
          values.token = props.fprops.token;
          actions.setSubmitting(true);
          request({
            url: VALIDATE_OTP,
            method: 'POST',
            data: values,
          })
            .then(res => {
              const response = res.data;
              actions.setSubmitting(false);
              if (res.status === 200) {
                props.setNav('updatepassword');
              }

              if (response.validationErrors) {
                // console.log(response.validationErrors);
                for (const [key, value] of Object.entries(
                  response.validationErrors,
                )) {
                  actions.setFieldError(key, value);
                }
              }

              if (response.errors) {
                // console.log(response.validationErrors);
                actions.setFieldError('general', response.message);
              }
            })
            .catch(error => {
              if (error.status) {
                toast(error, { position: 'top-right', type: 'error' });
              } else {
                toast('Unexpected Error', {
                  position: 'top-right',
                  type: 'error',
                });
              }
            });
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
            <div className="app-logo" />
            <h4 className="mb-0 te text-warning">
              <span>One Time Password has been sent</span>
            </h4>

            <Alert color="success" className="mt-1" hidden={blocking}>
              {props.fprops.message}
            </Alert>
            <Row className="divider" />
            <div>
              <Form>
                <BlockUI
                  tag="div"
                  blocking={blocking}
                  loader={<Loader type="ball-pulse-sync" />}
                >
                  <div className="col-sm-12">
                    {errors.general && (
                      <Alert color="danger">{errors.general}</Alert>
                    )}
                  </div>
                  <FormGroup row>
                    <Label for="otp" sm={2}>
                      OTP
                    </Label>
                    <Col sm={7}>
                      <Field
                        type="text"
                        name="otp"
                        bsSize="sm"
                        as={Input}
                        autoComplete="off"
                        invalid={errors.otp && touched.otp}
                      />
                      <FormFeedback>
                        <ErrorMessage name="otp" />
                      </FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup check row>
                    <Col sm={{ size: 0, offset: 2 }}>
                      <Button
                        color="warning"
                        type="button"
                        onClick={resendOtp}
                        disabled={resend}
                      >
                        Resend OTP
                      </Button>{' '}
                      <Button
                        color="info"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Submit
                      </Button>
                    </Col>
                  </FormGroup>
                </BlockUI>
              </Form>
            </div>
            <Row className="divider" />
            <div>
              <h6>
                <Link to="/login">Click to Login</Link>
              </h6>
            </div>
          </Col>
        )}
      </Formik>
    </>
  );
};


export default OtpForm;
