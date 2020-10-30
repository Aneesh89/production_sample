import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectGeneralDiary,{makeSelectCommentsCount} from './selectors';
import makeSelectApp from '../App/selectors';
import reducer from './reducer';
import saga from './saga';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
    Col, Row, Button, FormGroup, Label, Modal, ModalBody, ModalHeader, ModalFooter
} from 'reactstrap';
import BlockUI from 'react-block-ui';
import { Loader } from 'react-loaders';
import {
    faComments, faFilePdf
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GDComments from './GDComments';
import { PRINT_GD } from './Api';
import http from '../../services/http';
import {
    toast
} from 'react-toastify';
import ViewChangeofGuard from './ViewChangeofGuard';
import ViewDutyDetailing from './ViewDutyDetailing';
import ViewCriminalCase from './ViewCriminalCase';
import ViewChangeofGDCharge from './ViewChangeofGDCharge';
import {LoadIndicator} from '../../components/Loader/LoadingIndicator';

let vGdNum, vDate, vDistrict, vUnit, vUnitType, vSubmittedByRank, vSubmittedByPenNo, vSubmmittedByName, vGdType, vSubject, vBrief, vAct, vSection, vCaseType,
    vIncommingGuardPenNo, vIncommingGuard, vOutgoingGuardPenNo, vOutgoingGuard, vFromDateTime, vToDateTime, vIncommingOfficerPenNo, vIncommingOfficer, vOutgoingOfficerPenNo, vOutgoingOfficer;
let initialValue = [];
export function SearchViewGdModal(props) {

    useInjectReducer({ key: 'generalDiary', reducer });
    useInjectSaga({ key: 'generalDiary', saga });

    //view Gd
    vGdNum = props.GdDetails.gdSrNo;
    vDate = props.GdDetails.createdOn;
    vDistrict = props.GdDetails.district;
    vUnit = props.GdDetails.unit;
    vUnitType = props.GdDetails.unitType;
    vSubmittedByRank = props.GdDetails.createdByRank;
    vSubmittedByPenNo = props.GdDetails.createdByNum;
    vSubmmittedByName = props.GdDetails.createdBy;
    vGdType = props.GdDetails.gdType;
    vSubject = props.GdDetails.gdSubject;
    vBrief = props.GdDetails.gdDesc;

    //criminal case
    vCaseType = props.GdDetails.criminalCase.caseType;

    //change gd guard
    vIncommingGuardPenNo = props.GdDetails.changeGuard.incommingGuardPenNo;
    vIncommingGuard = props.GdDetails.changeGuard.incommingGuard;
    vOutgoingGuardPenNo = props.GdDetails.changeGuard.outgoingGuardPenNo;
    vOutgoingGuard = props.GdDetails.changeGuard.outgoingGuard;
    vFromDateTime = props.GdDetails.changeGuard.fromDateTime;
    vToDateTime = props.GdDetails.changeGuard.toDateTime;

    //change gd charge
    vIncommingOfficerPenNo = props.GdDetails.changeGDCharge.incommingOfficerPenNo;
    vIncommingOfficer = props.GdDetails.changeGDCharge.incomingOfficer;
    vOutgoingOfficerPenNo = props.GdDetails.changeGDCharge.incommingOfficerPenNo;
    vOutgoingOfficer = props.GdDetails.changeGDCharge.outgoingOfficer;

    //duty detailing
    const [addCommentBox, setAddCommentBox] = useState(false);
    const [commentLoadInd, setCommentLoadInd] = useState(false);

    if (props.name === "viewGd") {
        initialValue = {
            gdnum: vGdNum, date: vDate, district: vDistrict, unit: vUnit, unittype: vUnitType, submittedbyrank: vSubmittedByRank, submittedbypenno: vSubmittedByPenNo, submmittedbyname: vSubmmittedByName, gdtype: vGdType, subject: vSubject, brief: vBrief,
            casetype: vCaseType, act: vAct, section: vSection, incommingguardpenno: vIncommingGuardPenNo, incommingguard: vIncommingGuard, outgoingguardpenno: vOutgoingGuardPenNo,
            outgoingguard: vOutgoingGuard, fromdatetime: vFromDateTime, todatetime: vToDateTime, incommingofficerPenno: vIncommingOfficerPenNo, incommingofficer: vIncommingOfficer,
            voutgoingofficerpenno: vOutgoingOfficerPenNo, voutgoingofficer: vOutgoingOfficer
        }
    }

    const viewComments = () => {
        setAddCommentBox(true);
    }

    const handleClose = () => {
        setAddCommentBox(false)
        return null;
    }

    async function downloadGD() {
        await http({
            method: 'POST',
            url: PRINT_GD,
            data: {
                "gdNum": props.GdDetails.gdNum
            },
        })
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response.data)
                }
                else {
                    Swal.fire({
                        title: 'internal server error',
                        icon: 'error',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        setLoadInd(false);
                        toggleViewData();
                    })
                }
            })
            .catch(error => {
                toast(error.message, { position: 'top-right', type: 'error' });
            });
    }

    const closeBtn = <button className="close" onClick={ev => props.hide(ev, handleClose())}>&times;</button>;
    return (
        <>
            <span className="d-inline-block mb-2 mr-2">
                <Modal isOpen={props.isShowing} toggle={props.hide} backdrop={true} size={props.size} >
                    <BlockUI tag="div" blocking={props.loadInd} loader={<Loader active type={LoadIndicator} />}>

                        <ModalHeader toggle={props.hide} close={closeBtn}><b>GD No : {vGdNum} - {vDate} Hrs</b></ModalHeader>
                        <ModalBody>
                            <BlockUI tag="div" blocking={commentLoadInd} loader={<Loader active type={LoadIndicator} />}>
                                <Formik
                                    initialValues={initialValue}
                                    validationSchema={Yup.object({
                                        gdnum: Yup.string(),
                                        date: Yup.string(),
                                        district: Yup.string(),
                                        unit: Yup.string(),
                                        unittype: Yup.string(),
                                        submittedbyrank: Yup.string(),
                                        submittedbypenno: Yup.string(),
                                        submmittedbyname: Yup.string(),
                                        gdtype: Yup.string(),
                                        subject: Yup.string(),
                                        brief: Yup.string(),
                                        casetype: Yup.string(),
                                        act: Yup.string(),
                                        section: Yup.string(),

                                        incommingguardpenno: Yup.string(),
                                        incommingguard: Yup.string(),
                                        outgoingguardpenno: Yup.string(),
                                        outgoingguard: Yup.string(),
                                        fromdatetime: Yup.string(),
                                        todatetime: Yup.string(),

                                        incommingofficerpenno: Yup.string(),
                                        incommingofficer: Yup.string(),
                                        outgoingofficerpenno: Yup.string(),
                                        outgoingofficer: Yup.string()
                                    })}
                                    onSubmit={(values, { setSubmitting }) => {
                                        setSubmitting(true);
                                    }}
                                >
                                    {({ errors, touched, isSubmitting, dirty, resetForm, values, setFieldValue, setFieldTouched }) => (
                                        <div>
                                            {props.name === "viewGd" ?
                                                <Form>
                                                    <Col
                                                        className="bg-light" padding='30px'
                                                        style={{ width: '100%', height: '100px', padding: '30px' }}
                                                    >

                                                        <FormGroup row >
                                                            <Col sm={4}>
                                                                <Row>
                                                                    <Label for="gdtype" style={{ color: "black" }}><b>GD Type</b></Label>
                                                                </Row>
                                                                <Row>
                                                                    {vGdType}
                                                                </Row>
                                                            </Col>

                                                            <Col sm={4}>
                                                                <Row>
                                                                    <Label for="unit" style={{ color: "black" }}><b>Unit</b></Label>
                                                                </Row>
                                                                <Row>
                                                                    {vUnit}&nbsp;{vUnitType}
                                                                </Row>
                                                            </Col>
                                                            <Col sm={4}>
                                                                <Row>
                                                                    <Label for="gdtype" style={{ color: "black" }}><b>Submitted by</b></Label>
                                                                </Row>
                                                                <Row>
                                                                    {vSubmittedByRank}&nbsp;
                                                                    {vSubmittedByPenNo}&nbsp;
                                                                    {vSubmmittedByName}&nbsp;
                                                                </Row>
                                                            </Col>

                                                        </FormGroup>
                                                    </Col>
                                                    <FormGroup row></FormGroup>
                                                    {(() => {
                                                        switch (vGdType) {
                                                            case 'Criminal case':
                                                                return <ViewCriminalCase vSubject={vSubject}
                                                                    vCaseType={vCaseType}
                                                                    vBrief={vBrief}
                                                                    GdDetails={props.GdDetails} />
                                                            case 'Change of GD Charge':
                                                                return <ViewChangeofGDCharge vSubject={vSubject}
                                                                    vBrief={vBrief}
                                                                    vIncommingOfficerPenNo={vIncommingOfficerPenNo}
                                                                    vIncommingOfficer={vIncommingOfficer}
                                                                    vOutgoingOfficerPenNo={vOutgoingOfficerPenNo}
                                                                    vOutgoingOfficer={vOutgoingOfficer}
                                                                    GdDetails={props.GdDetails} />
                                                            case 'Change of Guard':
                                                                return <ViewChangeofGuard vSubject={vSubject}
                                                                    vBrief={vBrief}
                                                                    GdDetails={props.GdDetails} />
                                                            case 'Duty Detailing':
                                                                return <ViewDutyDetailing vSubject={vSubject}
                                                                    vBrief={vBrief}
                                                                    GdDetails={props.GdDetails} />
                                                            default:
                                                                return <Col sm={12} style={{ background: "white", color: "black" }} >
                                                                    <FormGroup row>
                                                                        <Col sm={12}>
                                                                            <b>{vSubject}</b>
                                                                        </Col>
                                                                    </FormGroup>

                                                                    <FormGroup row>
                                                                        <Col sm={12}>
                                                                            {vBrief}
                                                                        </Col>
                                                                    </FormGroup>
                                                                </Col>

                                                        }
                                                    })()}

                                                    <FormGroup row>
                                                        <Col sm={4} align="left">
                                                            {
                                                                props.printSingleGD === "Y" ?
                                                                    <Button
                                                                        type="button"
                                                                        color="danger"
                                                                        id="download"
                                                                        value="download"
                                                                        title="download"
                                                                        onClick={downloadGD}
                                                                    >
                                                                        <FontAwesomeIcon size="lg" className="text-light" icon={faFilePdf} />
                                                                            &nbsp;Print
                                                                        </Button>
                                                                    : null
                                                            }&nbsp;
                                                                <Button
                                                                type="button"
                                                                onClick={viewComments}
                                                                color="info"
                                                                id="commentsBox"
                                                                value="commentsBox"
                                                            >
                                                                <FontAwesomeIcon size="lg" className="text-light" icon={faComments} />
                                                                    &nbsp;Comments ({props.commentsCount})
                                                                </Button>
                                                        </Col>
                                                    </FormGroup>
                                                    {addCommentBox ?
                                                        <GDComments 
                                                        comments={props.GdDetails.comments} 
                                                        gdNum={props.GdDetails.gdNum} 
                                                        setAddCommentBox={setAddCommentBox} 
                                                        handleClose={props.hide} 
                                                        setCommentLoadInd={setCommentLoadInd} 
                                                        />
                                                        : null
                                                    }
                                                </Form>
                                                : null}
                                        </div>
                                    )}
                                </Formik>
                            </BlockUI>
                        </ModalBody>
                        <ModalFooter>

                        </ModalFooter>
                    </BlockUI>
                </Modal>
            </span>
        </>
    )
}

SearchViewGdModal.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    generalDiary: makeSelectGeneralDiary(),
    app: makeSelectApp(),
    commentsCount: makeSelectCommentsCount(),
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
)(SearchViewGdModal);
