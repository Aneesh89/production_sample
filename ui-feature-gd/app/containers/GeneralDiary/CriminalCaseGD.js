import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import { setReloadGDList } from './actions';
import { makeSelectReloadGDList } from './selectors';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Col, Row, Button, FormGroup, Label, Input, FormFeedback
} from 'reactstrap';
import RSelect from '../../components/RSelect/RSelect';
import http from '../../services/http';
import { ADD_GD } from './Api';
import { GET_MASTER_DATA } from '../../services/constants';
import Swal from 'sweetalert2';
import {
  toast
} from 'react-toastify';
import ActSectionTable from './ActSectionTable';

export function CriminalCaseGD(props) {
  useInjectReducer({ key: 'generalDiary', reducer });
  useInjectSaga({ key: 'generalDiary', saga });


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

  const [caseType, setCaseType] = useState();
  const [isCaseTypeLoading, setIsCaseTypeLoading] = useState(false);
  const [actsections, setActSections] = useState([]);


  // case type
  useEffect(() => {
    async function getCaseType() {
      setIsCaseTypeLoading(true);
      await http({
        method: 'POST',
        url: GET_MASTER_DATA,
        data: {
          requestName: 'getForcaseType_m_case_type',
        },
      })
        .then(function (response) {
          setCaseType(response.data);
          setIsCaseTypeLoading(false);
        })
        .catch(error => {
          toast(error, { position: 'top-right', type: 'error' });
          setIsCaseTypeLoading(false);
        });
    }
    getCaseType();
  }, []);

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
              props.onSetReloadGDList(true);
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

  const handleCaseTypeChange = (value, setFieldValue) => {
    setFieldValue("casetype", value)
  };

  const handleCaseTypeBlur = (value, setFieldTouched) => {
    setFieldTouched("casetype", true)
  };
  return (
    <>
      <Formik
        initialValues={{ casetype: '', subject: '', gdBrief: '' }}
        validationSchema={Yup.object({
          casetype: Yup.string(),
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

          let listActSection = [];
          actsections.map((as => {
            listActSection.push({
              "act": as.acts.key,
              "section": as.sections.map((s, index) =>
                s.value
              )
            });
          }));

          criminalCaseArray = {
            "caseType": values.casetype.key,
            "listActSection": listActSection
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
            <Form id="criminalCase">
              <FormGroup row>
                <Col>
                  <Row>
                    <Label for="casetype" sm={6}>Case Type</Label>
                  </Row>
                  <Row>
                    <Col sm={6}>
                      <Field component={RSelect}
                        name="casetype"
                        onChange={ev => handleCaseTypeChange(ev, setFieldValue)}
                        onBlur={ev => handleCaseTypeBlur(ev, setFieldTouched)}
                        value={values.casetype}
                        error={errors.casetype}
                        touched={touched.casetype}
                        options={caseType}
                        isLoading={isCaseTypeLoading}
                      />
                    </Col>
                  </Row>

                </Col>
              </FormGroup>

              <FormGroup row>
                <ActSectionTable data={actsections} setActSections={setActSections} />
              </FormGroup>
              <FormGroup row>
                <Col>
                  <Row>
                    <Label for="subject" sm={4}>Subject</Label>
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

CriminalCaseGD.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onSetReloadGDList: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  reloadGDList: makeSelectReloadGDList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onSetReloadGDList: (reloadGDList) => dispatch(setReloadGDList(reloadGDList)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CriminalCaseGD);
