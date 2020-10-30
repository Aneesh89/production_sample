import React, { memo, Suspense, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Loader from 'react-loaders';
import makeSelectGeneralDiary from './selectors';
import makeSelectApp from '../App/selectors';
import reducer from './reducer';
import saga from './saga';
import http from '../../services/http';
import useModal from '../../components/UseModal/useModal';
import UnitsUnderHeirarchyModal from './UnitsUnderHeirarchyModal';
import UserDetailsModal from './UserDetailsModal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { GET_MASTER_DATA } from '../../services/constants';
import { ASSIGN_GD } from './Api';
import SearchGD from './searchGD';
import AddGD from './addGD';
import PageTitle from '../Layout/Layout/AppMain/PageTitle';
import Swal from 'sweetalert2';
import {
    toast
} from 'react-toastify';
import {
    Col, Row, Button, FormGroup, Label, Input, FormText, Card,
    Container, FormFeedback, Alert, Modal, ModalBody, ModalTitle, ModalHeader, ModalFooter, Table
} from 'reactstrap';
import {
    faEye, faSearch, faPlusSquare, faPrint, faDownload, faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function AssigningOfficerInCharge(props) {
    useInjectReducer({ key: 'generalDiary', reducer });
    useInjectSaga({ key: 'generalDiary', saga });

    const [gdType, setGdType] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const { isShowing, toggle } = useModal();
    const [unitFlag, setUnitFlag] = useState(false);
    const [userFlag, setUserFlag] = useState(false);


    const onReceiveData = () => {
        console.log("data got in index");
    }
    const assumeGdCharge = () => {
       
    };

  
    
    async function assignGd(tempJsonSort) {
        setIsLoading(true);
        await http({
            method: 'POST',
            url: ASSIGN_GD,
            data: tempJsonSort,
        })
            .then(function (response) {
                // setIsLoading(false);
                if (response.status === 200) {
                    Swal.fire({
                        title: 'District officer assigned officer in charge  successfully',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                    })
                }
                else if (response.status === 203) {
                    Swal.fire({
                        title: 'validation error',
                        icon: 'error',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                    }).then((result) => {

                        if (result.value) {
                        }
                    })
                }
            })
            .catch(error => {
                toast(error, { position: 'top-right', type: 'error' });
                // setIsLoading(false);
            });
    }
    const addUnit = () => {
        setUnitFlag(true);
        toggle();
    };
    const useUnitCode = (value, setFieldValue) => {
        setFieldValue('unitcode', value);
    }
    const useUnit = (value, setFieldValue) => {
        setFieldValue('unit', value);
    }
    const handleclose = () => {
        setUnitFlag(false);
    };

    const addUser = () => {
        setUserFlag(true);
        toggle();
    };
    const useUsername = (value, setFieldValue) => {
        setFieldValue('newofficerpenno', value);
    }

    const useProfilename = (value, setFieldValue) => {
        setFieldValue('newofficer', value);
    }
    const handlecloseUser = () => {
        setUserFlag(false);
    };
    return (
        <>
            <Formik
                initialValues={{ unit: '', unitcode: '', newofficerpenno: '', newofficer: '', currentofficerpenno: '', currentofficer: '' }}
                validationSchema={Yup.object({
                    unit: Yup.string(),
                    unitcode: Yup.string(),
                    newofficerpenno: Yup.string(),
                    newofficer: Yup.string(),
                    // currentofficerpenno: Yup.string(),
                    // currentofficer: Yup.string()
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    let tempJsonSort = {
                        // "currentOfficerPenNo": props.app.user.data.username,
                        // "currentOfficerName": props.app.user.data.profileName,
                        "newOfficerPenNo":values.newofficerpenno,
                        "newOfficerName":values.newofficer,
                        "unitCD":values.unitcode,
                        "unitName":values.unit
                    }
                    assignGd(tempJsonSort);
                }}
            >
                {({
                    errors,
                    touched,
                    isSubmitting,
                    dirty,
                    resetForm,
                    values,
                    setFieldValue,
                    setFieldTouched,
                }) => (

                        <Suspense fallback={<Loader type="ball-pulse-rise" />}>
                            <ReactCSSTransitionGroup
                                component="div"
                                transitionName="MainAnimation"
                                transitionAppear
                                transitionAppearTimeout={0}
                                transitionEnter={false}
                                transitionLeave={false}
                            >
                                <PageTitle
                                    heading="General Diary"
                                    subheading="Assigning Officer In GD Charge"
                                    icon="pe-7s-news-paper icon-gradient bg-deep-blue"
                                    content="General Diary"
                                    activeContent="Assigning Officer In GD Charge"
                                />

                                <Col sm={6}>
                                    <Card style={{ backgroundColor: "#FFFFFF", padding: 20, border: '1px solid #DEE2E6' }}>
                                        <Form>
                                            {
                                                unitFlag ?
                                                    <UnitsUnderHeirarchyModal
                                                        isShowing={isShowing}
                                                        hide={toggle}
                                                        name="Assigning Officer in GD Charge"
                                                        size="lg"
                                                        onReceiveUnitCode={ev => useUnitCode(ev, setFieldValue)}
                                                        onReceiveUnit={ev => useUnit(ev, setFieldValue)}
                                                        onHandleClose={handleclose}
                                                    />
                                                    : null
                                            }
                                            {userFlag ?
                                                <UserDetailsModal
                                                    isShowing={isShowing}
                                                    hide={toggle}
                                                    name="Assigning Officer in GD Charge"
                                                    size="lg"
                                                    onReceiveUsername={ev => useUsername(ev, setFieldValue)}
                                                    onReceiveProfilename={ev => useProfilename(ev, setFieldValue)}
                                                    onHandleCloseUser={handlecloseUser}
                                                />
                                                : null}
                                            <Col sm={12}>
                                                <FormGroup row>
                                                    <Col sm={6}>

                                                        <Row>
                                                        <Col sm={8}>
                                                            <Label>Unit</Label>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col sm={8}>

                                                                <Field
                                                                    type="hidden"
                                                                    name="unitcode"
                                                                    bsSize="sm"
                                                                    value={values.unitcode}
                                                                    as={Input}
                                                                />
                                                                <Field
                                                                    type="text"
                                                                    name="unit"
                                                                    bsSize="sm"
                                                                    readOnly
                                                                    value={values.unit}
                                                                    as={Input}
                                                                />
                                                            </Col>
                                                            <Col sm={4}>
                                                                <Button
                                                                    onClick={addUnit}
                                                                    color="info"
                                                                    size="sm"
                                                                    id="unitHeirarchy"
                                                                    value="unitHeirarchy"
                                                                >
                                                                    <FontAwesomeIcon size="lg" align="left" icon={faPlusSquare} />
                                                                </Button>
                                                            </Col>


                                                        </Row>
                                                    </Col>

                                                    {/* <Col sm={4}>
                                                        <Row>
                                                            <Label>Current Officer in charge</Label>
                                                        </Row>
                                                        <Row>
                                                        <Col sm={8}>
                                                            <b>{props.app.user.data.profileName} ( {props.app.user.data.username} )</b>
                                                            </Col>
                                                        </Row>

                                                    </Col> */}

                                                    <Col sm={6}>
                                                        <Row>
                                                        <Col sm={8}>
                                                            <Label>New Officer in charge</Label>
                                                            </Col>
                                                        </Row>



                                                        <Row>
                                                            <Col sm={8}>
                                                                <Field
                                                                    type="hidden"
                                                                    name="newofficerpenno"
                                                                    bsSize="sm"
                                                                    value={values.newofficerpenno}
                                                                    as={Input}
                                                                    invalid={errors.newofficerpenno && touched.newofficerpenno} />
                                                                <Field
                                                                    type="text"
                                                                    name="newofficer"
                                                                    bsSize="sm"
                                                                    readOnly
                                                                    value={values.newofficer}
                                                                    as={Input}
                                                                    invalid={errors.newofficer && touched.newofficer} />
                                                                <FormFeedback><ErrorMessage name="newofficer" /></FormFeedback>

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
                                                <FormGroup row></FormGroup>
                                                <FormGroup row>
                                                    <Col sm={12} align="center">
                                                        <Button
                                                            color="primary"
                                                            type="submit"
                                                            size="sm"
                                                            id="AssignGDCharge"
                                                            value="AssignGDCharge"
                                                            // onClick={assumeGdCharge}
                                                        >Assign GD Charge
                                        </Button>
                                                    </Col>
                                                </FormGroup>
                                            </Col>
                                        </Form>
                                    </Card>
                                </Col>

                            </ReactCSSTransitionGroup>
                        </Suspense>
                    )}
            </Formik>
        </>
    );
}

AssigningOfficerInCharge.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    generalDiary: makeSelectGeneralDiary(),
    app: makeSelectApp(),
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
)(AssigningOfficerInCharge);
