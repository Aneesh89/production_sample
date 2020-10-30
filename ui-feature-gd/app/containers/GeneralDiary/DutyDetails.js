import React, { memo, useEffect, useState } from 'react';
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
    Col, Row, Button, FormGroup, Label, Input, Table, Card, FormFeedback
} from 'reactstrap';
import useModal from '../../components/UseModal/useModal';
import UserDetailsModal from './UserDetailsModal';
import {
    faUserPlus, faTrash, faPlus
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "react-datepicker/dist/react-datepicker.css";
import http from '../../services/http';
import { GET_MASTER_DATA } from '../../services/constants';
import RSelect from '../../components/RSelect/RSelect';

let guardtype;
export function DutyDetails(props) {
    useInjectReducer({ key: 'generalDiary', reducer });
    useInjectSaga({ key: 'generalDiary', saga });

    const { isShowing, toggle } = useModal();
    const [dutyType, setDutyType] = useState();
    const [isDutyTypeLoading, setIsDutyTypeLoading] = useState(false);
    const [dutyFlag, setDutyFlag] = useState(false);   

    // duty type
    useEffect(() => {
        async function getDutyType() {
            setIsDutyTypeLoading(true);
            await http({
                method: 'POST',
                url: GET_MASTER_DATA,
                data: {
                    requestName: 'getAll_m_r_duty_type',
                },
            })
                .then(function (response) {
                    setDutyType(response.data);
                    setIsDutyTypeLoading(false);
                })
                .catch(error => {
                    toast(error.message, { position: 'top-right', type: 'error' });
                    console.log(error);
                    setIsDutyTypeLoading(false);
                });
        }
        getDutyType();
    }, []);

    const handleDeleteButton = (ev, row) => {
        let temp = [...props.data];
        props.setDutyDetail(temp.filter(item => item !== row));
    };
    const addUser = () => {
        setDutyFlag(true);
        toggle();
    };
    const handlecloseUser = () => {
        setDutyFlag(false);
    };    
    const useUsername = (value, setFieldValue) => {
        setFieldValue('officerPenNo', value);
    }

    const useProfilename = (value, setFieldValue) => {
        setFieldValue('officerName', value);
    }

    const handleDutyTypeChange = (value, setFieldValue) => {
        setFieldValue('dutyType', value);
    }

    const handleDutyTypeBlur = (value, setFieldValue) => {
            setFieldValue('dutyType', value);
        }
    return (
        <>
            <Formik
                initialValues={{ officerPenNo: '', officerName: '', dutyType: '' }}
                validationSchema={Yup.object({
                    officerPenNo: Yup.string()
                        .required('officer penno is required'),
                    officerName: Yup.string()
                        .required('officer name is required'),
                    dutyType: Yup.string()
                        .required('dutyType is required'),

                })}
                onSubmit={(values, { setSubmitting, resetForm }) => {

                    setSubmitting(true);
                    const dutyDetailArray = [...props.data];
                    dutyDetailArray.push(
                        {
                            "officerPenNo": values.officerPenNo,
                            "officerName": values.officerName,
                            "dutyType": values.dutyType
                        }
                    )
                    props.setDutyDetail(dutyDetailArray);
                    resetForm();

                }}
            >
                {({ errors, touched, isSubmitting, dirty, resetForm, values, setFieldValue, setFieldTouched }) => (
                    <Form>
                        {dutyFlag ?
                            <UserDetailsModal
                                isShowing={isShowing}
                                hide={toggle}
                                name="Duty Detail"
                                size="lg"
                                guardtype={guardtype}
                                onReceiveUsername={ev => useUsername(ev, setFieldValue)}
                                onReceiveProfilename={ev => useProfilename(ev, setFieldValue)}
                                onHandleCloseUser={handlecloseUser}
                            />
                            :null}
                            <Card style={{ backgroundColor: "#FAFAFA", padding: 10, border: '1px solid #DEE2E6' }}>
                                <FormGroup row>
                                    <Col sm={6}>
                                        <Row>
                                            <Label for="officerPenNo" sm={6}>Select Officer</Label>
                                        </Row>
                                        <Row>
                                            <Col sm={10}>
                                                <Field
                                                    type="hidden"
                                                    name="officerPenNo"
                                                    bsSize="sm"
                                                    value={values.officerPenNo}
                                                    as={Input}
                                                    invalid={errors.officerPenNo && touched.officerPenNo} />
                                                <Field
                                                    type="text"
                                                    name="officerName"
                                                    bsSize="sm"
                                                    readOnly
                                                    value={values.officerName}
                                                    as={Input}
                                                    invalid={errors.officerName && touched.officerName} />
                                                <FormFeedback><ErrorMessage name="officerName" /></FormFeedback>


                                            </Col>
                                            <Col sm={2}>                                               
                                                    <FontAwesomeIcon size="lg" icon={faUserPlus}  onClick={addUser} id="addUser" value="addUser" className="text-primary" />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm={6} >
                                        <Row>
                                            <Label for="dutyType" sm={6}>Type of Duty</Label>
                                        </Row>
                                        <Row>
                                            <Col sm={10}>
                                                <Field component={RSelect}
                                                    name="dutyType"
                                                    onChange={ev => handleDutyTypeChange(ev, setFieldValue)}
                                                    onBlur={ev => handleDutyTypeBlur(ev, setFieldTouched)}
                                                    value={values.dutyType}
                                                    error={errors.dutyType}
                                                    touched={touched.dutyType}
                                                    options={dutyType}
                                                    isLoading={isDutyTypeLoading}
                                                />
                                            </Col>
                                            <Button color="info" type="submit" ><FontAwesomeIcon icon={faPlus} /></Button>
                                        </Row>

                                    </Col>
                                </FormGroup>
                                <Table striped bordered hover>
                                    <thead className='bg-white'>
                                        <tr >
                                            <th >SlNo</th>
                                            <th>Officer</th>
                                            <th>Type of Duty</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            props.data.map((d, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{d.officerName} ({d.officerPenNo})</td>
                                                        <td>{d.dutyType.label}</td>
                                                        <td align="center">
                                                            <FontAwesomeIcon onClick={ev => handleDeleteButton(ev, d)} icon={faTrash} id="btn_delete" value="Delete" className="text-danger" />
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Card>
                        </Form>                    
                )}
            </Formik>
        </>
    )
}

DutyDetails.propTypes = {
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
)(DutyDetails);
