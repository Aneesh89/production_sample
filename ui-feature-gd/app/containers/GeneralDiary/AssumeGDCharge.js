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

import { GET_MASTER_DATA } from '../../services/constants';
import { ASSUME_GD } from './Api';
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
export function AssumeGDCharge(props) {
    useInjectReducer({ key: 'generalDiary', reducer });
    useInjectSaga({ key: 'generalDiary', saga });

    const [gdType, setGdType] = useState();
    const [isLoading, setIsLoading] = useState(false);


    const onReceiveData = () => {
        console.log("data got in index");
    }
    // const assumeGdCharge = () => {
    //     let tempJsonSort = {
    //         "currentOfficerPenNo": props.app.user.data.username,
    //         "currentOfficerName": props.app.user.data.profileName
    //     }
    //     assumeGd(tempJsonSort);
    // };

    async function assumeGd() {
        setIsLoading(true);
        await http({
            method: 'POST',
            url: ASSUME_GD,
            // data: tempJsonSort,
        })
            .then(function (response) {
                // setIsLoading(false);
                if (response.status === 200) {
                    Swal.fire({
                        title: 'Assumed Charge successfully',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                    })
                }
                else {
                    toast(response.message, { position: 'top-right', type: 'error' })          
                  }
            })
            .catch(error => {
                toast(error.message, { position: 'top-right', type: 'error' });
                // setIsLoading(false);
            });
    }
    return (
        <>
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
                        subheading="Assume GD charge"
                        icon="pe-7s-news-paper icon-gradient bg-deep-blue"
                        content="General Diary"
                        activeContent="Assume GD Charge"
                    />

                    <Col sm={6}>
                        <Card style={{ backgroundColor: "#FFFFFF", padding: 20, border: '1px solid #DEE2E6' }}>
                            <Col sm={12}>
                                <FormGroup row>
                                    <Col sm={6}>

                                        <Row>
                                            <Label>Unit</Label>
                                        </Row>
                                        <Row>
                                            <b>{props.app.unit.unit}</b>
                                        </Row>
                                    </Col>

                                    <Col sm={6}>
                                        <Row>
                                            <Label>Current Officer in charge</Label>
                                        </Row>
                                        <Row>
                                            <b>{props.app.user.data.profileName} ( {props.app.user.data.username} )</b>
                                        </Row>

                                    </Col>                                   
                                </FormGroup>
                                <FormGroup row></FormGroup>
                                <FormGroup row>
                                    <Col sm={12} align="center">
                                        <Button
                                            color="primary"
                                            type="buttton"
                                            size="sm"
                                            id="assumeCharge"
                                            value="assumeCharge"
                                            onClick={assumeGd}
                                        >Assume GD Charge
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Col>

                        </Card>
                    </Col>

                </ReactCSSTransitionGroup>
            </Suspense>
        </>
    );
}

AssumeGDCharge.propTypes = {
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
)(AssumeGDCharge);
