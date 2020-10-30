import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, Redirect } from 'react-router-dom';

import captchaService from '../../services/captchaService';

import AuthService from '../../services/authService';
import http from '../../services/http';
import { GET_UNITS, SET_UNIT, GET_USER } from './Api';

import {
    Col, Row, Button, FormGroup, Label, Input, FormText,
    Container, FormFeedback, Alert, Modal, ModalBody, ModalHeader, ModalFooter
} from 'reactstrap';
import { Loader, Types } from 'react-loaders';
import BlockUI from 'react-block-ui';

import Swal from 'sweetalert2';
import {
    toast
} from 'react-toastify';

import Options from '../../components/Form/Options';


const UnitSelectModal = (props) => {
    const [ready, setReady] = useState(false);
    const [unitList, setUnitList] = useState([]);
    //const [open, setOpen] = useState(props.isOpen);

    //const close = ()=>setOpen(!open);

    let unitOptions = unitList.map((unit, i) =>
        <option key={i} value={unit['unitCd']}>{unit['unit'] + unit['unitType']}</option>
    );

    useEffect(() => {
        const fetchData = async () => {
            getUnitsList();
        };
        fetchData();
    }, []);

console.log(""+unitList)
    async function getUnitsList() {
        if (props.isOpen) {
            setReady(false);
            await http.post(GET_UNITS)
                .then(res => {
                    
                    let o = res.data.map(
                        obj => {                         
                            return {
                              "unitCd": obj.unitCd,
                              "unit": obj.unit +" "+ obj.unitType,                             
                            }                        
                        }
                      );
                      setUnitList(o);

                    setReady(true);
                    props.onFetchUnits(res.data)
                })
                .catch(error => {
                    toast(error, { position: 'top-right', type: 'error' })
                    

                })
        }

    }


    return (
        <>
            <Modal isOpen={props.isOpen} backdrop={true}>
                <ModalHeader >Please select a unit to continue</ModalHeader>
                <ModalBody>
                    <Formik
                        initialValues={{ unit: '' }}
                        validationSchema={Yup.object({
                            unit: Yup.string().required('Please select a unit')
                        })}
                        onSubmit={(values, actions) => {
                            actions.setSubmitting(true);
                            http.post(SET_UNIT, {
                                unitSelectedCd: values.unit
                            })
                                .then(res => {
                                    const response = res.data;
                                    if (res.status == 200) {
                                        let unit = unitList.filter(a => a.unitCd == values.unit);
                                        props.onSetUnit(unit[0]);
                                        AuthService.setLocalUnit(unit[0]);
                                        toast(response.message, { position: 'top-right', type: 'success' })
                                    }
                                })
                                .catch(error => {
                                    actions.setSubmitting(false);
                                    if (!error.status) {
                                        toast(error, { position: 'top-right', type: 'error' })
                                    } else {

                                    }
                                })
                                .then(() => {

                                })




                          
                        }
                        }
                    >
                        {({ errors, touched, isSubmitting, dirty, resetForm, values, setFieldValue }) => (
                            <Col lg="10" md="10" sm="12" className="mx-auto app-login-box">
                                <BlockUI tag="div" blocking={isSubmitting} loader={<Loader active type='ball-pulse-sync'/>}>
                                    <div>
                                        <Form>

                                            <div className="col-sm-12">
                                                {errors.general && <Alert color="danger">
                                                    {errors.general}
                                                </Alert>}

                                            </div>

                                            <FormGroup row>
                                                <Col sm={12}>
                                                    <Field as={Input}
                                                        name="unit"
                                                        type="select"
                                                        invalid={errors.unit && touched.unit}
                                                    >
                                                        <Options list={unitList} value="unitCd" label="unit" />
                                                    </Field>
                                                    <FormFeedback><ErrorMessage name="unit" /></FormFeedback>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup check row>
                                                <Col lg={{ size: 0, offset: 4 }}>
                                                    <Button color="info" type="submit" disabled={isSubmitting}>Submit</Button>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                    </div>
                                </BlockUI>

                            </Col>
                        )}
                    </Formik>
                </ModalBody>
                <ModalFooter>

                </ModalFooter>
            </Modal>



        </>
    );
};

export default UnitSelectModal;