import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Col, Row, Button, FormGroup, Label, Input, FormFeedback
} from 'reactstrap';
import useModal from '../../components/UseModal/useModal';
import UserDetailsModal from './UserDetailsModal';
import {
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import http from '../../services/http';
import { ADD_GD } from './Api';
import Swal from 'sweetalert2';
import {
  toast
} from 'react-toastify';


export function ChangeGdCharge(props) {
  useInjectReducer({ key: 'generalDiary', reducer });
  useInjectSaga({ key: 'generalDiary', saga });

  const { isShowing, toggle } = useModal();

  let criminalCaseArray = {
    "caseType": null,
    "listActSection": []
  }
  let changeGdChargeArray = {
    "incommingOfficerPenNo": null,
    "incomingOfficer": null,
    "outgoingOfficerPenNo": null,
    "outgoingOfficer": null
  }
  let changeGuardArray = [];
  let dutyDetailsArray = [];

  const [userFlag, setUserFlag] = useState(false);



  const addUser = () => {
    setUserFlag(true);
    toggle();
  };
  const handlecloseUser = () => {
    setUserFlag(false);
  };

  const useUsername = (value, setFieldValue) => {
    setFieldValue('newofficerinchargepenno', value);
  }

  const useProfilename = (value, setFieldValue) => {
    setFieldValue('newofficerincharge', value);
  }

  // add gd
  async function addGDList(tempJsonSort, setFieldError) {
    await http({
      method: 'POST',
      url: ADD_GD,
      data: tempJsonSort,
    })
      .then(function (response) {
        props.setLoadInd(false);
        if (response.status === 200) {
          props.handleClose(props);
          Swal.fire({
            title: 'GD added successfully',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.value) {
              window.location.reload()
            }
          })
        }
        else if (response.status === 203) {
          for (let [key, value] of Object.entries(response.data.validationErrors)) {
            setFieldError(key, value);
          }
        }
        else {
          toast(response.message, { position: 'top-right', type: 'error' })
        }

      })
      .catch(error => {
        props.setLoadInd(false);
        toast(error.message, { position: 'top-right', type: 'error' })
      })
  }
  return (
    <>
      <Formik
        initialValues={{ currentofficerinchargepenno: props.currentUser, currentofficerincharge: props.currentProfile, newofficerinchargepenno: '', newofficerincharge: '', subject: '', gdBrief: '' }}
        validationSchema={Yup.object({
          currentofficerinchargepenno: Yup.string(),
          currentofficerincharge: Yup.string(),
          newofficerinchargepenno: Yup.string(),
          newofficerincharge: Yup.string(),
          subject: Yup.string()
            .max(100, 'Invalid subject')
            .matches(
              /^.[a-zA-Z0-9\u0D00-\u0D7F\u200B-\u200D#()_ ]+$/,
              {
                message: 'Alphanumeric characters or special character like #,(),_ only',
                excludeEmptyString: true,
              },
            )
            .required('subject is required'),
          gdBrief: Yup.string()
            .min(10, 'Brief is too short')
            .max(8000, 'Invalid brief')
            .required('GD brief is required')
            .matches(
              /^[a-zA-Z0-9\u0D00-\u0D7F\u200B-\u200D?=.,*!@#$%^&*()_\-+\s ]+$/,
              {
                message: 'Alphanumeric characters or special characters only',
                excludeEmptyString: true,
              },
            ),
        })}
        onSubmit={(values, { setSubmitting, resetForm, setFieldError }, actions) => {
          setSubmitting(true);
          props.setLoadInd(true);
          let Subject, GdBrief;
          let tempJsonSort = {}

          if(values.newofficerincharge !== values.currentofficerincharge){
          if (values.newofficerinchargepenno != '' && values.newofficerincharge != '' && values.currentofficerinchargepenno != '' && values.currentofficerincharge != '') {
            changeGdChargeArray = {
              "incommingOfficerPenNo": values.newofficerinchargepenno,
              "incomingOfficer": values.newofficerincharge,
              "outgoingOfficerPenNo": values.currentofficerinchargepenno,
              "outgoingOfficer": values.currentofficerincharge
            }
          }
        }
        else {
          Swal.fire({
              title: 'Current Officer in charge and new officer in charge should be different',
              icon: 'error',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK'
          })
      }
          if (values.subject != '') {
            Subject = values.subject;
          }
          if (values.gdBrief != '') {
            GdBrief = values.gdBrief;
          }

          tempJsonSort = {
            'gdType': props.GDType,
            'subject': Subject,
            'gdBrief': GdBrief,
            'criminalCase': criminalCaseArray,
            'changeGdCharge': changeGdChargeArray,
            'changeGuard': changeGuardArray,
            'dutyDetails': dutyDetailsArray
          };
          addGDList(tempJsonSort, setFieldError);

          // setTimeout(() => {
          //   resetForm();
          // }, 3000);
        }}
      >
        {({ errors, touched, isSubmitting, dirty, resetForm, values, setFieldValue, setFieldTouched }) => (
          <Col  >
            <Form>
              {userFlag ?
                <UserDetailsModal
                  isShowing={isShowing}
                  hide={toggle}
                  name="Change GD Charge"
                  size="lg"
                  onReceiveUsername={ev => useUsername(ev, setFieldValue)}
                  onReceiveProfilename={ev => useProfilename(ev, setFieldValue)}
                  onHandleCloseUser={handlecloseUser}
                />
                : null}

              <FormGroup row>
                <Col>
                  <Row>
                    <Label for="currentofficerincharge" sm={8}>Current Officer In Charge</Label>
                  </Row>
                  <Row>
                    <Col sm={8}>
                      <Field
                        type="hidden"
                        name="currentofficerinchargepenno"
                        bsSize="sm"
                        value={values.currentofficerinchargepenno}
                        as={Input}
                        invalid={errors.currentofficerinchargepenno && touched.currentofficerinchargepenno} />
                      <Field
                        type="text"
                        name="currentofficerincharge"
                        bsSize="sm"
                        readOnly
                        value={values.currentofficerincharge}
                        as={Input}
                        invalid={errors.currentofficerincharge && touched.currentofficerincharge} />
                      <FormFeedback><ErrorMessage name="currentofficerincharge" /></FormFeedback>
                    </Col>
                  </Row>
                </Col>

                <Col>
                  <Row>
                    <Label for="newofficerincharge" sm={8}>New Officer In Charge</Label>
                  </Row>
                  <Row>
                    <Col sm={8}>
                      <Field
                        type="hidden"
                        name="newofficerinchargepenno"
                        bsSize="sm"
                        value={values.newofficerinchargepenno}
                        as={Input}
                        invalid={errors.newofficerinchargepenno && touched.newofficerinchargepenno} />
                      <Field
                        type="text"
                        name="newofficerincharge"
                        bsSize="sm"
                        readOnly
                        value={values.newofficerincharge}
                        as={Input}
                        invalid={errors.newofficerincharge && touched.newofficerincharge} />
                      <FormFeedback><ErrorMessage name="newofficerincharge" /></FormFeedback>

                    </Col>
                    <Col sm={4} align="left">
                      <Button
                        onClick={addUser}
                        color="link"
                        size="sm"
                        id="searchUser"
                        value="Search"
                      >
                        <FontAwesomeIcon size="lg" align="left" icon={faUserPlus} />
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col>
                  <Row>
                    <Label for="subject" sm={8}>Subject</Label>
                  </Row>
                  <Row>
                    <Col sm={12}>
                      <Field
                        type="text"
                        name="subject"
                        bsSize="sm"
                        as={Input}
                        invalid={errors.subject && touched.subject} />
                      <FormFeedback><ErrorMessage name="subject" /></FormFeedback>
                    </Col>
                  </Row>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col>
                  <Row>
                    <Label for="gdBrief" sm={4}>GD Brief</Label>
                  </Row>
                  <Row>
                    <Col sm={12}>
                      <Field
                        type="textarea"
                        name="gdBrief"
                        bsSize="sm"
                        rows='10'
                        as={Input}
                        invalid={errors.gdBrief && touched.gdBrief} />
                      <FormFeedback><ErrorMessage name="gdBrief" /></FormFeedback>
                    </Col>
                  </Row>
                </Col>
              </FormGroup>

              <FormGroup check row>
                <Col sm={{ size: 0, offset: 2 }} align="right">
                <Button color="danger" type="reset" >Reset</Button>&nbsp;
                  <Button color="info" type="submit" disabled={isSubmitting}>Save</Button>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        )}
      </Formik>
    </>
  )
}

ChangeGdCharge.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
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

export default compose(
  withConnect,
  memo,
)(ChangeGdCharge);
