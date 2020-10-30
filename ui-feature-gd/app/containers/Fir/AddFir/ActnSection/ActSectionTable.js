import React, { memo, Component, useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
// import Loader from 'react-loaders';
import reducer from '../../reducer';
import saga from '../../saga';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Col, Row, Button, FormGroup, Label, Input, FormText, Table,
  Container, FormFeedback, Alert, Modal, ModalBody, ModalTitle, ModalHeader, ModalFooter, Card
} from 'reactstrap';
import RSelect from '../../../../components/RSelect/RSelect';
import RSelectMulti from '../../../../components/RSelectMulti/RSelectMulti';
import {
  faEdit, faBan, faEye, faSearch, faUserPlus, faTrash
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import http from '../../../../services/http';
import { GET_MASTER_DATA } from '../../../../services/constants';
import Swal from 'sweetalert2';
import {
  toast
} from 'react-toastify';
import BlockUI from 'react-block-ui';
import { Loader } from 'react-loaders';
let actSectionLabel = [];
let tempSection = [];

export function ActSectionTable(props) {
  useInjectReducer({ key: 'generalDiary', reducer });
  useInjectSaga({ key: 'generalDiary', saga });

  const [acts, setActs] = useState();
  const [sectionsArray, setSections] = useState([]);

  const [isCaseTypeLoading, setIsCaseTypeLoading] = useState(false);
  const [isActsLoading, setIsActsLoading] = useState(false);
  const [isSectionsLoading, setIsSectionsLoading] = useState(false);

  // const [actsections, setActSections] = useState([]);
  // const [actSectionFlag, setActSectionFlag] = useState(false);

  const [actsectionslabel, setActSectionsLabel] = useState([]);
  const [initialValues, setInitialValues] = useState({ acts: '', sections: [] })
  const [editFlag, setEditFlag] = useState(false);

  const handleEditButton = (ev, row, setFieldValue) => {
    console.log('row for update :', row);
    setEditFlag(true);
    setFieldValue("acts", row.acts);
    setFieldValue("sections", row.sections);
    handleDeleteButton(ev, row);
  };


  const handleDeleteButton = (ev, row) => {
    console.log('acts for delete :', row);

    // let temp = [...actsections];
    let temp = [...props.data];

    props.setActSections(temp.filter(item => item !== row));
    // onSetActSection(temp.filter(item => item !== row));   
    let actTemp = [...acts, row.acts];
    setActs(actTemp);
    // const sorted = actTemp.sort((a, b) => b[acts.label] - a[acts.label]);
    // let sorted = actTemp.sort((a,b) => a.acts.localeCompare(b.acts));
    // var obj = [...this.state.data];
    // let sorted = actTemp.sort((a,b) => a.acts - b.acts);
    //       setActs(sorted);
  };

  // acts
  useEffect(() => {
    async function getActs() {
      // setReady(false);
      setIsActsLoading(true);
      await http({
        method: 'POST',
        url: GET_MASTER_DATA,
        data: {
          requestName: 'getForActs_m_act',
        },
      })
        .then(function (response) {
          // alert('success gdtype');
          console.log('gd type =' + response.data);
          setActs(response.data);
          setIsActsLoading(false);
          // setLoading(false);
        })
        .catch(error => {
          // alert('failure');
          toast(error, { position: 'top-right', type: 'error' });
          console.log(error);
          setIsActsLoading(false);
        });
    }
    getActs();
  }, []);

  const handleActsChange = (value, setFieldValue) => {

    setFieldValue("acts", value);
    console.log("acts =" + value.key);
    async function getSections() {
      // setReady(false);
      setIsSectionsLoading(true);
      await http({
        method: 'POST',
        url: GET_MASTER_DATA,
        data: {
          requestName: 'getForSection_m_section',
          "params": [
            {
              "paramValue": value.key
            }]

        },
      })
        .then(function (response) {
          // alert('success gdtype');
          console.log('gd type =' + response.data);
          // setSections(response.data);
          processData(response.data);
          setIsSectionsLoading(false);
          // setLoading(false);
        })
        .catch(error => {
          // alert('failure');
          toast(error, { position: 'top-right', type: 'error' });
          console.log(error);
          setIsSectionsLoading(false);
        });
    }

    getSections();
    setFieldValue("sections", "");
  }
  let processData = (section) => {
    console.log("temp section =" + section);
    section.map((s => {
      tempSection.push(
        {
          "value": s.key,
          "label": s.label
        }
      )
    }));
    setSections(sectionsArray => tempSection);

    tempSection = [];

  }

  const handleActsBlur = (value, setFieldTouched) => {
    setFieldTouched("acts", true)
  }

  const handleSectionsChange = (value, setFieldValue) => {
    console.log("value of sections")

    setFieldValue("sections", value)
    console.log(sectionsArray.length)
  };

  const handleSectionsBlur = (value, setFieldTouched) => {
    setFieldTouched("sections", true)
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          acts: Yup.string(),
            // .required('acts is required'),
          sections: Yup.array()
            // .required('sections is required')
          // .min(2, "Pick at least 2 tags")
          // .max(100,"Pick at most 3 tags")
          // .of(
          //   Yup.object().shape({
          //     label: Yup.string().required(),
          //     key: Yup.string().required()
          //   })
          // ),

        })}
        onSubmit={(values, { setSubmitting, setFieldValue, setFieldTouched, resetForm }) => {
          setEditFlag(false);
          setSubmitting(true);
          const temp = [...props.data];
          temp.push(
            {
              "acts": values.acts,
              "sections": values.sections.map((s, index) =>
                s
              )

            })
          props.setActSections(temp);
          let actTemp = [...acts].filter(item => item !== values.acts);
          setActs(actTemp);
          resetForm();

          setTimeout(() => {
            setFieldValue('acts', "");
            setFieldValue('sections', "");
          }, 3000);
        }}
      >
        {({ errors, touched, isSubmitting, dirty, resetForm, values, setFieldValue, setFieldTouched }) => (
          <Col sm="12">
            <Form>
              <Card style={{ backgroundColor: "#FAFAFA", padding: 10, border: '1px solid #DEE2E6' }}>
                <FormGroup row>
                  <Col>
                    <Row>
                      <Label for="acts" sm={8}>Acts</Label>
                    </Row>
                    <Row>
                      <Col sm={12}>
                        <Field component={RSelect}
                          name="acts"
                          onChange={ev => handleActsChange(ev, setFieldValue)}
                          onBlur={ev => handleActsBlur(ev, setFieldTouched)}
                          value={values.acts}
                          error={errors.acts}
                          touched={touched.acts}
                          options={acts}
                          // options={actsOptions}
                          isLoading={isActsLoading}
                        />
                      </Col>
                    </Row>
                  </Col>

                  <Col>
                    <Row>
                      <Label for="sections" sm={8}>Sections</Label>
                    </Row>
                    <Row>
                      <Col sm={12}>
                        <Field component={RSelectMulti}
                          name="sections"
                          onChange={ev => handleSectionsChange(ev, setFieldValue)}
                          onBlur={ev => handleSectionsBlur(ev, setFieldTouched)}
                          value={values.sections}
                          error={errors.sections}
                          touched={touched.sections}
                          options={sectionsArray}
                          // options={sectionsOptions}
                          isLoading={isSectionsLoading}
                        />

                      </Col>
                    </Row>
                  </Col>

                  <Col sm="4">
                    <Row>&nbsp;</Row>
                    <Row>&nbsp;</Row>
                    <Row>
                      {editFlag ? <Button color="warning" type="submit" >Update</Button> :
                        <Button color="primary" type="submit" >Add</Button>}
                    </Row>
                  </Col>
                </FormGroup>

                <Table striped bordered hover>
                  <thead className='bg-white'>
                    <tr >
                      <th >SlNo</th>
                      <th>Acts</th>
                      <th>Sections</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      props.data.map((as, index) => {
                        var i = 0;
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{as.acts.label}</td>
                            <td>
                              {as.sections.map((s => {
                                i++;
                                return (i !== as.sections.length ? s.label + "," : s.label)
                              }))}
                            </td>
                            <td align="center">
                              <FontAwesomeIcon icon={faEdit} value="Edit" className="text-success" onClick={ev => handleEditButton(ev, as, setFieldValue)} id="btn_edit" /> &nbsp;&nbsp;&nbsp;
                              <FontAwesomeIcon className="text-danger" icon={faTrash} value="Delete" onClick={ev => handleDeleteButton(ev, as)} id="btn_delete" />
                            </td>
                          </tr>
                        )
                      })
                    }

                  </tbody>
                </Table>
              </Card>

            </Form>
          </Col>
        )}
      </Formik>
    </>

  )
}

ActSectionTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  // onSetActSection: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // actsections: makeSelectActSection(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    // onSetActSection: (actsections) => dispatch(setActSection(actsections)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ActSectionTable);
