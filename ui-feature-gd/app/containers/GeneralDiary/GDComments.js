import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { setActSection, setCommentsCount } from './actions';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectActSection,makeSelectCommentsCount } from './selectors';
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
import { ADD_GD_COMMENTS } from './Api';
import Swal from 'sweetalert2';
import {
    toast
} from 'react-toastify';

function GDComments(props) {
    useInjectReducer({ key: 'generalDiary', reducer });
    useInjectSaga({ key: 'generalDiary', saga });

    const [gdCommentsList, setGdCommentsList] = useState([]);

    useEffect(() => {
        setGdCommentsList(props.comments);
    }, [props.comments]);

    async function saveCommentsList(tempJsonSort) {
        await http({
            method: 'POST',
            url: ADD_GD_COMMENTS,
            data: tempJsonSort,
        })
            .then(function (response) {
                props.setCommentLoadInd(false);
                if (response.status === 200) {
                    Swal.fire({
                        title: 'GD comments added successfully',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        setGdCommentsList(response.data.comments);
                        props.onSetCommentsCount(props.commentsCount+1);
                    })
                }
                else if (response.status === 203) {
                    Swal.fire({
                        title: 'validation error',
                        icon: 'error',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                    })
                }
                else if (response.status === 500) {
                    Swal.fire({
                        title: 'internal server error',
                        icon: 'error',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                    })
                }

            })
            .catch(error => {
                props.setCommentLoadInd(false);
                props.handleClose(props);
                Swal.fire({
                    title: 'unexpected error',
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                })
                toast(error.message, { position: 'top-right', type: 'error' });
                console.log(error);
            });
    }

    return (
        <>
            <Formik
                initialValues={{ comments: '' }}
                validationSchema={Yup.object({
                    comments: Yup.string()
                        .min(10, 'Comments is too short')
                        .max(1000, 'Invalid brief')
                        .required('Comments is required')
                        .matches(
                            /^[a-zA-Z0-9?=.*!@#$%^&*()_\-+\s ]+$/,
                            {
                                message: 'Alphanumeric characters or special characters only',
                                excludeEmptyString: true,
                            },
                        ),

                })}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    let commentsArray = {}
                    let temp = {}
                    commentsArray =
                    {
                        "comment": values.comments
                    }
                    temp = {
                        "gdNum": props.gdNum,
                        "comments": commentsArray
                    }
                    saveCommentsList(temp);
                    props.setCommentLoadInd(true);
                    resetForm();
                }}
            >
                {({ errors, touched, isSubmitting, dirty, resetForm, values, setFieldValue, setFieldTouched }) => (
                    <Col sm="12">
                        <Form>
                            <FormGroup row>
                                <Col sm={12}>
                                    <Row>
                                        <Col sm={10}>
                                            <Field
                                                type="textarea"
                                                name="comments"
                                                placeholder="enter your comments here..."
                                                bsSize="sm"
                                                rows='3'
                                                as={Input}
                                                invalid={errors.comments && touched.comments} />
                                            <FormFeedback><ErrorMessage name="comments" /></FormFeedback>
                                        </Col>
                                        <Col sm={2}>
                                            <Button
                                                color="primary"
                                                type="submit"
                                                size="sm"
                                                id="addComments"
                                                value="addComments"
                                            >
                                                <FontAwesomeIcon size="lg" icon={faCommentMedical} />
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </FormGroup>

                            {gdCommentsList !== null ?
                                gdCommentsList.map((ch, index) => {
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
                                                        <div align="left">
                                                        <small className="opacity-6" >
                                                           {ch.officerName} {ch.unit}
                                                        </small><br/>
                                                            <small className="opacity-6" >
                                                                <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                                                                {ch.dateTime}
                                                            </small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                : <div className="chat-wrapper" >
                                    <small className="opacity-6" >
                                        No Comments
                                    </small>
                                </div>
                            }
                        </Form>
                    </Col>
                )}
            </Formik>
        </>

    )
}

GDComments.propTypes = {
    dispatch: PropTypes.func.isRequired,
    onSetActSection: PropTypes.func,
    onSetCommentsCount: PropTypes.func,
  };
  
  const mapStateToProps = createStructuredSelector({
    actsections: makeSelectActSection(),
    commentsCount:makeSelectCommentsCount(),    

  });
  
  function mapDispatchToProps(dispatch) {
    return {
      dispatch,
      onSetActSection: (actsections) => dispatch(setActSection(actsections)),
      onSetCommentsCount:(commentsCount) =>  dispatch(setCommentsCount(commentsCount)),
    };
  }
  
  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );
  
  export default compose(
    withConnect,
    memo,
  )(GDComments);