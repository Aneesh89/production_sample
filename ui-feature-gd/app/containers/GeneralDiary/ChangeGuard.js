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
    Col, Row, Button, FormGroup, Label, Input, Table, Card, FormFeedback
} from 'reactstrap';
import useModal from '../../components/UseModal/useModal';
import UserDetailsModal from './UserDetailsModal';
import {
    faUserPlus, faTrash, faPlus
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import Swal from 'sweetalert2';

let guardtype;
export function ChangeGuard(props) {
    useInjectReducer({ key: 'generalDiary', reducer });
    useInjectSaga({ key: 'generalDiary', saga });

    const { isShowing, toggle } = useModal();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState();
    const [userFlag, setUserFlag] = useState(false);

    const handleDeleteButton = (ev, row) => {
        let temp = [...props.data];
        props.setGuardChange(temp.filter(item => item !== row));
    };
    const addCurrentUser = () => {
        guardtype = "outgoing"
        setUserFlag(true);
        toggle();
    };
    const addNewUser = () => {
        guardtype = "incoming"
        setUserFlag(true);
        toggle();
    };
    const handlecloseUser = () => {
        setUserFlag(false);
    };
    const useUsername = (value, setFieldValue) => {
        setFieldValue('incommingGuardPenNo', value);
    }

    const useProfilename = (value, setFieldValue) => {
        setFieldValue('incommingGuard', value);
    }

    const useCurrentUsername = (value, setFieldValue) => {
        setFieldValue('outgoingGuardPenNo', value);
    }

    const useCurrentProfilename = (value, setFieldValue) => {
        setFieldValue('outgoingGuard', value);
    }

    const handleFromDateChange = (value, setFieldValue) => {
        setStartDate(value);
        setFieldValue('fromDateTime', value);
    };
    const handleFromDateBlur = (value, setFieldTouched) => {
        setFieldTouched('fromDateTime', true);
    };
    const handleToDateChange = (value, setFieldValue) => {
        setEndDate(value);
        setFieldValue('toDateTime', value);
    };

    const handleToDateBlur = (value, setFieldTouched) => {
        setFieldTouched('toDateTime', true);
    };
    return (
        <>
            <Formik
                initialValues={{ outgoingGuardPenNo: '', outgoingGuard: '', incommingGuardPenNo: '', incommingGuard: '', fromDateTime: startDate, toDateTime: endDate }}
                validationSchema={Yup.object({
                    outgoingGuardPenNo: Yup.string()
                        .required('outgoing guard penno is required'),
                    outgoingGuard: Yup.string()
                        .required('outgoing guardname is required'),
                    incommingGuardPenNo: Yup.string()
                        .required('incomming guard penno is required'),
                    incommingGuard: Yup.string()
                        .required('incomming guardname  is required'),
                    fromDateTime: Yup.date()
                        .required('from date time is required'),
                    toDateTime: Yup.date()
                        .required('to date time is required')

                })}
                onSubmit={(values, { setSubmitting, resetForm }) => {

                    setSubmitting(true);
                    const changeGuardArray = [...props.data];
                    if (values.incommingGuard !== values.outgoingGuard) {
                        changeGuardArray.push(
                            {
                                "incommingGuardPenNo": values.incommingGuardPenNo,
                                "incommingGuard": values.incommingGuard,
                                "outgoingGuardPenNo": values.outgoingGuardPenNo,
                                "outgoingGuard": values.outgoingGuard,
                                "fromDateTime": moment(startDate).format('DD/MM/YYYY HH:mm'),
                                "toDateTime": moment(endDate).format('DD/MM/YYYY HH:mm'),
                            }
                        )
                        props.setGuardChange(changeGuardArray);
                        resetForm();
                        setEndDate("");
                    }
                    else {
                        Swal.fire({
                            title: 'Incoming guard and Outgoing guard should be different',
                            icon: 'error',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'OK'
                        })
                    }
                }}
            >
                {({ errors, touched, isSubmitting, dirty, resetForm, values, setFieldValue, setFieldTouched }) => (
                    <Form>
                        {userFlag ?
                            <UserDetailsModal
                                isShowing={isShowing}
                                hide={toggle}
                                name="Change Guard"
                                size="lg"
                                guardtype={guardtype}
                                onReceiveUsername={ev => useUsername(ev, setFieldValue)}
                                onReceiveProfilename={ev => useProfilename(ev, setFieldValue)}
                                onReceiveCurrentUsername={ev => useCurrentUsername(ev, setFieldValue)}
                                onReceiveCurrentProfilename={ev => useCurrentProfilename(ev, setFieldValue)}
                                onHandleCloseUser={handlecloseUser}
                            />
                            : null}
                        <Card style={{ backgroundColor: "#FAFAFA", padding: 10, border: '1px solid #DEE2E6' }}>
                            <FormGroup row>
                                <Col sm={6}>
                                    <Row>
                                        <Label for="fromDateTime" sm={8}>From Date Time</Label>
                                    </Row>
                                    <Row>
                                        <Col sm={12}>
                                            <DatePicker
                                                dateFormat="dd/MM/yyyy hh:mm a"
                                                timeIntervals={1}
                                                selected={startDate}
                                                onChange={ev => handleFromDateChange(ev, setFieldValue)}
                                                onBlur={ev => handleFromDateBlur(ev, setFieldTouched)}
                                                showTimeSelect
                                                name="fromDateTime"
                                                bsSize="lg"
                                                onHandleCloseUser={handlecloseUser}
                                            />
                                            {errors.fromDateTime && touched.fromDateTime ? <div
                                                style={{ color: "#DC3545", fontSize: 11.264, marginTop: ".4rem" }}
                                            >
                                                {errors.fromDateTime}
                                            </div> : null}
                                        </Col>
                                    </Row>

                                </Col>
                                <Col sm={6}>
                                    <Row>
                                        <Label for="toDateTime" sm={8}>To Date Time</Label>
                                    </Row>
                                    <Row>
                                        <Col sm={12}>
                                            <DatePicker
                                                dateFormat="dd/MM/yyyy hh:mm a"
                                                timeIntervals={1}
                                                selected={endDate}
                                                onChange={ev => handleToDateChange(ev, setFieldValue)}
                                                onBlur={ev => handleToDateBlur(ev, setFieldTouched)}
                                                showTimeSelect
                                                name="toDateTime"
                                                bsSize="lg"
                                            />
                                            {errors.toDateTime && touched.toDateTime ? <div
                                                style={{ color: "#DC3545", fontSize: 11.264, marginTop: ".4rem" }}
                                            >
                                                {errors.toDateTime}
                                            </div> : null}
                                        </Col>
                                    </Row>

                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col>
                                    <Row>
                                        <Label for="outgoingGuardPenNo" sm={8}>Outgoing Guard</Label>
                                    </Row>
                                    <Row>
                                        <Col sm={8}>
                                            <Field
                                                type="hidden"
                                                name="outgoingGuardPenNo"
                                                bsSize="sm"
                                                value={values.outgoingGuardPenNo}
                                                as={Input}
                                                invalid={errors.outgoingGuardPenNo && touched.outgoingGuardPenNo} />
                                            <Field
                                                type="text"
                                                name="outgoingGuard"
                                                bsSize="sm"
                                                readOnly
                                                value={values.outgoingGuard}
                                                as={Input}
                                                invalid={errors.outgoingGuard && touched.outgoingGuard} />
                                            <FormFeedback><ErrorMessage name="outgoingGuard" /></FormFeedback>

                                        </Col>
                                        <Col sm={4} align="left">
                                            <Button
                                                onClick={addCurrentUser}
                                                color="link"
                                                size="sm"
                                                id="outgoingGuard"
                                                value="outgoingGuard"
                                            >
                                                <FontAwesomeIcon size="lg" align="left" icon={faUserPlus} />
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col>
                                    <Row>
                                        <Label for="incommingGuardPenNo" sm={8}>Incoming Guard</Label>
                                    </Row>
                                    <Row>
                                        <Col sm={8}>
                                            <Field
                                                type="hidden"
                                                name="incommingGuardPenNo"
                                                bsSize="sm"
                                                value={values.incommingGuardPenNo}
                                                as={Input}
                                                invalid={errors.incommingGuardPenNo && touched.incommingGuardPenNo} />
                                            <Field
                                                type="text"
                                                name="incommingGuard"
                                                bsSize="sm"
                                                readOnly
                                                value={values.incommingGuard}
                                                as={Input}
                                                invalid={errors.incommingGuard && touched.incommingGuard} />
                                            <FormFeedback><ErrorMessage name="incommingGuard" /></FormFeedback>

                                        </Col>
                                        <Col sm={4} align="left">
                                            <Button
                                                onClick={addNewUser}
                                                color="link"
                                                className="btn-pill btn-shadow mr-3"
                                                size="sm"
                                                id="incomingGuard"
                                                value="incomingGuard"
                                            >
                                                <FontAwesomeIcon size="lg" align="left" icon={faUserPlus} />
                                            </Button>
                                            <Button color="info" type="submit" ><FontAwesomeIcon icon={faPlus} /> Add</Button>

                                        </Col>

                                    </Row>
                                </Col>
                            </FormGroup>
                            <Table striped bordered hover>
                                <thead className='bg-white'>
                                    <tr >
                                        <th >SlNo</th>
                                        <th>Outgoing Officer</th>
                                        <th>Incoming Officer</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.data.map((as, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{as.outgoingGuard}({as.outgoingGuardPenNo})</td>
                                                    <td>{as.incommingGuard}({as.incommingGuardPenNo})</td>
                                                    <td align="center">
                                                        <FontAwesomeIcon className="text-danger" icon={faTrash} onClick={ev => handleDeleteButton(ev, as)} value="Delete" id="btn_delete" />
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

ChangeGuard.propTypes = {
    dispatch: PropTypes.func,
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
)(ChangeGuard);
