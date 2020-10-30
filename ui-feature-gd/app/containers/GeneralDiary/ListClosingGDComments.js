import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { setActSection, setCommentsCount } from './actions';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectActSection, makeSelectCommentsCount } from './selectors';
import reducer from './reducer';
import saga from './saga';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
    Col, Row, Button, FormGroup, Input, FormFeedback
} from 'reactstrap';
import {
    faCommentMedical, faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import http from '../../services/http';
import { ADD_GD_COMMENTS, ADD_CLOSING_GD_COMMENTS } from './Api';
import Swal from 'sweetalert2';
import {
    toast
} from 'react-toastify';

function ListClosingGDComments(props) {
    useInjectReducer({ key: 'generalDiary', reducer });
    useInjectSaga({ key: 'generalDiary', saga });



    return (
        <>
            <Col sm={12}>
                {
                    props.closingGdComments.map((ch, index) => {
                        return (
                            <div className="chat-wrapper" key={index}>
                                <div className="chat-box-wrapper">
                                    <div>
                                        <div className="chat-box">
                                            <div>
                                                {ch.comment}
                                            </div>
                                        </div>
                                        <div>
                                            {/* <div align="left">
                                                        <small className="opacity-6" >
                                                           {ch.officerName} {ch.unit}
                                                        </small><br/>
                                                            <small className="opacity-6" >
                                                                <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                                                                {ch.dateTime}
                                                            </small>
                                                        </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </Col>
        </>
    )
}

ListClosingGDComments.propTypes = {
    dispatch: PropTypes.func.isRequired,
    onSetActSection: PropTypes.func,
    onSetCommentsCount: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
    actsections: makeSelectActSection(),
    commentsCount: makeSelectCommentsCount(),

});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        onSetActSection: (actsections) => dispatch(setActSection(actsections)),
        onSetCommentsCount: (commentsCount) => dispatch(setCommentsCount(commentsCount)),
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
    memo,
)(ListClosingGDComments);