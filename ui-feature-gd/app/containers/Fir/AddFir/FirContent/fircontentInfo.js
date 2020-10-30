import React, { Fragment,memo,useEffect,useState} from 'react';
import {
  Row,
  Col,
  Button,
  CardHeader,
  CardBody,
  Container,
  Card,
  CardTitle,
  Input,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Table, CardFooter,
  FormFeedback
} from 'reactstrap';
// import TextareaAutosize from 'react-textarea-autosize';
import { Link } from 'react-router-dom';
import { TypeofInfo,SourceofComplaint,SourceOfficerData,SourceCourtData,LinktoRegType,LinkRegTypeContent} from '../firicon_json';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import useModal from '../../../../components/UseModal/useModal';
import RSelect from '../../../../components/RSelect/RSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';
import { mapValues, values } from 'lodash';
import http from '../../../../services/http';
import { GET_MASTER_DATA } from '../../../../services/constants';
import {
  toast
} from 'react-toastify';
export default function FirContentInfo() {

///////////////////////////////////////////////////

////////////////master data request////////////////



///////////////set field value///////////////////////
const fileUploadFunc=(value,setFieldValue)=>{
  console.log(value.currentTarget.files[0]);
  setFieldValue('fileUpload',value.currentTarget.files[0])
}


let initialValue={
  firContent:"",
  briefOfFirContent:"",
  fisContent:"",
  fileUpload:""
 }

 const firInfoValidateSchema = Yup.object().shape({
        firContent: Yup.string().required("Required"),
      });

const handleSubmit=(values,{setSubmitting})=>{

    alert(JSON.stringify(values, null, 2));
    setSubmitting(true);
  
}
  return (
    
    <Fragment>
      <Container fluid>
        <Card className="mb-12" >
          <CardHeader className="card-header-tab z-index-6 fir-card">
            <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
              <i className="header-icon lnr-charts icon-gradient bg-happy-green">
                {' '}
              </i>
              Fir Info
            </div>
          </CardHeader>
            
          <Formik  
           initialValues={initialValue}
           validationSchema={firInfoValidateSchema}
           onSubmit={handleSubmit}
           >
          {props => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            dirty,
            resetForm,
            setFieldValue,
            setFieldTouched,

          } = props;
      
          return (
            <Form onSubmit={handleSubmit}>
              <CardBody>
              <Row> 
              <Col md="12">
                      <FormGroup>
                        <Card className="fir-card">
                        <CardBody>
                        <CardTitle>Fir Content</CardTitle>
                          <FormGroup>
                            <InputGroup>
                            <Field
                              type="textarea" 
                              rows="3" 
                              name="firContent"
                              placeholder="Fir Content .."
                              as={Input}
                              invalid={errors.firContent && touched.firContent}
                            />
                            <FormFeedback>
                              <ErrorMessage name="firContent" />
                            </FormFeedback>
                            </InputGroup>
                          </FormGroup>
                        </CardBody>
                        </Card>
                      </FormGroup>
                </Col>
              </Row>
              <Row> 
              <Col md="12">
                      <FormGroup>
                        <Card className="fir-card">
                        <CardBody>
                        <CardTitle>Brief of FIR</CardTitle>
                          <FormGroup>
                            <InputGroup>
                            <Field
                              type="textarea" 
                              rows="6" 
                              id="briefOfFirContent" 
                              name="briefOfFirContent"
                              placeholder="Brief of Fir.."
                              as={Input}
                              invalid={errors.briefOfFir && touched.briefOfFir}
                            />
                            <FormFeedback>
                              <ErrorMessage name="briefOfFirContent" />
                            </FormFeedback>
                            </InputGroup>
                          </FormGroup>
                        </CardBody>
                        </Card>
                      </FormGroup>
                </Col>
              </Row>
              <Row> 
              <Col md="12">
                      <FormGroup>
                        <Card className="fir-card">
                        <CardHeader className="fir-card">First Information Statement</CardHeader>
                        <CardBody>
                          <FormGroup>
                            <InputGroup>
                            <Field
                              type="textarea" 
                              rows="4" 
                              id="fisContent" 
                              name="fisContent"
                              placeholder="Fis Content"
                              as={Input}
                              invalid={errors.fisContent && touched.fisContent}
                            />
                            <FormFeedback>
                              <ErrorMessage name="fisContent" />
                            </FormFeedback>
                            </InputGroup>
                          </FormGroup>
                        </CardBody>
                        </Card>
                      </FormGroup>
                </Col>
                <Col md="12">
                      <FormGroup>
                        <Card className="fir-card">
                        <CardBody>
                        <CardTitle>FIS Upload</CardTitle>
                          <FormGroup>
                            <InputGroup>
                            <input 
                            name="fileUpload" 
                            type="file" 
                            onChange={(ev) => fileUploadFunc(ev,setFieldValue)}
                            invalid={errors.fileUpload && touched.fileUpload}
                            // onChange={(event) => {
                            //   setFieldValue("fileUpload", event.currentTarget.files[0]);
                            // }}
                             />
                            <FormFeedback>
                            <ErrorMessage name="fileUpload" />
                            </FormFeedback>
                            </InputGroup>
                          </FormGroup>
                        </CardBody>
                        </Card>
                      </FormGroup>
                </Col>
              </Row>
      
    
             
          </CardBody>
          <CardFooter>
          <div className="btn-actions-pane-right text-capitalize">
            
              <Button type="submit"
              className="btn-wide mr-md-2 btn btn-info btn-md font-size-md border-0 btn-transition"
              >
              Save
            </Button>
          </div>
          </CardFooter>
            </Form>
          );



          
        }}
      </Formik>
         
         
        </Card>
      </Container>


      




    </Fragment>
  );
}
