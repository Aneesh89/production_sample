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

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import RSelect from '../../../../components/RSelect/RSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';
import OccuranceInfoModal from "./occuranceInfoModal";
import useModal from '../../../../components/UseModal/useModal';
import {occurancD,DirectionFromPS} from '../firicon_json';
export default function OccuranceInfo() {
const { isShowing, toggle } = useModal();
const [occuranceInfoData,setOccuranceInfoData]=useState([]);
const [occuranceInfo,setOccuranceInfo]=useState([]);

var occuranceLength=occuranceInfoData.length;
const showoccuranceInfoModal=()=>{
  toggle();
}

// let prices = {
//   banana: 1,
//   orange: 2,
//   meat: 4,
// };

// let doublePrices = Object.fromEntries(
//   Object.entries(prices).map(([key, value]) => [key, value])
// );

// alert(doublePrices.meat);

const occuranceDataFunc=(value)=>{
  occuranceInfoData.push(value);
}
const deleteOccuranceFunc=(occuranceId)=>{
   var occuranceContent=occuranceInfoData.filter(occuranceValue=>occuranceValue.occuranceId!==occuranceId);
   setOccuranceInfoData(occuranceContent);
 
}
// console.log(occuranceInfoData);
// useEffect(()=>{
//   // setOccuranceInfoArray(occuranceInfoData)
  
// },[occuranceInfoData])

//  console.log(DirectionFromPS);
// Object.fromEntries(
//   Object.entries(occuranceInfoData).map(([key, value]) => [key, value])
// );
// console.log(occuranceLength);
// let doublePricess = Object.fromEntries(
//   Object.entries(occuranceInfoData).map(([key, value]) => [key, value])
// );

// console.log(doublePricess.occuranceDateFrom);
// console.log(occuranceInfoData);
let initialValue={
  infoReceivedAtPS:"",
  inRegistrationByPolice:"",
  inReportingByComplainant:""
 }

const occuranceInfoValidateSchema=Yup.object().shape({
  infoReceivedAtPS: Yup.string()
  .required("Required"),

});
const handleSubmit=(values,{setSubmitting})=>{
  values.occuranceDetails=occuranceInfoData;
  occuranceInfo.push(values);
  console.log(occuranceInfo);
  setSubmitting(true);
  alert(JSON.stringify(values,2,null))
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
              Occurance Info
            </div>
          </CardHeader>
            
          <Formik  
           initialValues={initialValue}
           validationSchema={occuranceInfoValidateSchema}
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
                    <Row>
                      <Col md="12">  
                      <FormGroup>
                      <Card className="fir-card">
                      <CardBody>
                      <Row>
                            <Col md="4">
                            <FormGroup>
                            <Card className="fir-card">
                            <CardHeader className="card-header-tab z-index-6 fir-card">Information Received at Police Station</CardHeader>
                            <CardBody>
                              <CardTitle>Information Received at PS</CardTitle>
                                <FormGroup>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <FontAwesomeIcon icon={faLock} />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Field
                                    type="text" 
                                    name="infoReceivedAtPS"
                                    placeholder="Information Received at PS"
                                    as={Input}
                                    invalid={errors.infoReceivedAtPS && touched.infoReceivedAtPS}
                                  />
                                  <FormFeedback>
                                    <ErrorMessage name="infoReceivedAtPS" />
                                  </FormFeedback>
                                  </InputGroup>
                                </FormGroup>
                            </CardBody>
                            </Card>
                            </FormGroup>
                            </Col>
                            <Col md="8">
                            
                             <FormGroup>
                              <Card className="fir-card">
                              <CardHeader className="card-header-tab z-index-6 fir-card">Reason for delay (if any)</CardHeader>
                              <CardBody>
                              <Row>
                              <Col md="6">
                              <CardTitle>In Registration by Police</CardTitle>
                                <FormGroup>
                                  <InputGroup>
                                  <Field
                                    type="textarea" 
                                    rows="5" 
                                    name="inRegistrationByPolice"
                                    placeholder="Reason.."
                                    as={Input}
                                    invalid={errors.inRegistrationByPolice && touched.inRegistrationByPolice}
                                  />
                                  <FormFeedback>
                                    <ErrorMessage name="inRegistrationByPolice" />
                                  </FormFeedback>
                                  </InputGroup>
                                </FormGroup>

                                </Col>
                              
                                <Col md="6">
                              <CardTitle>In Reporting by Complainant</CardTitle>
                                <FormGroup>
                                  <InputGroup>
                                  <Field
                                    type="textarea" 
                                    rows="5" 
                                    name="inReportingByComplainant"
                                    placeholder="Reason"
                                    as={Input}
                                    invalid={errors.inReportingByComplainant && touched.inReportingByComplainant}
                                  />
                                  <FormFeedback>
                                    <ErrorMessage name="inReportingByComplainant" />
                                  </FormFeedback>
                                  </InputGroup>
                                </FormGroup>

                                </Col>
                              
                              </Row>
                              
                              </CardBody>
                              </Card>
                              </FormGroup>
                            
                            
                            </Col>
                            
                      </Row>
                      </CardBody>
                      </Card>
                      </FormGroup>            
                      </Col>
                    </Row>
                  </Col>   
                 </Row>
                 <Row>
                  <Col md="12">
                    <Row>
                      <Col md="12">  
                      <FormGroup>
                      <Card className="fir-card">
                      <CardHeader className="card-header-tab z-index-6 fir-card">
                        Occurance Details
                      <div className="btn-actions-pane-right text-capitalize">
                      <Button 
                        type="button"
                        className="btn-wide mr-md-2 btn btn-info btn-md font-size-md border-0 btn-transition"
                        onClick={showoccuranceInfoModal}
                      >
                      Add Occurance
                      </Button>
                      </div>
                      
                      </CardHeader>
                      <CardBody>
                      <Row>
                            <Col md="12">
                            <FormGroup>
                            <Card className="fir-card">
                            <CardBody>
                              <CardTitle>Occurance Details</CardTitle>
                              <FormGroup>
                              <Table striped>
                              <thead>
                                <tr>
                                  <th>Sl No</th>
                                  <th>Date From</th>
                                  <th>Date To</th>
                                  <th>Direction from PS</th>
                                  <th>Distance from PS</th>
                                  <th>Edit</th>
                                  <th>Remove</th>
                                </tr>
                              </thead>
                              <tbody>
                              {
                                   
                                   occuranceLength>0 ?
                                     <Fragment>
                                       {
                                         occuranceInfoData.map((occuranceinfoData,i)=>(
                                          <tr key={i}>
                                            <td>{i+1}</td>
                                            <td>{occuranceinfoData.isTimeOfOccurance==='K'?occuranceinfoData.occuranceDateFrom:"Unknown"}</td>
                                            <td>{occuranceinfoData.isTimeOfOccurance==='K'?occuranceinfoData.occuranceDateTo:"Unknown"}</td>
                                            <td>{occuranceinfoData.distanceFromPS}</td>
                                            <td>{occuranceinfoData.distanceFromPS}</td>
                                            <td>edit</td>
                                            <td onClick={()=>deleteOccuranceFunc(occuranceinfoData.occuranceId)}>delete</td>
                                          </tr>
                                           ))
                                       }
                                     </Fragment>:
                                     <Fragment>
                                     <tr><td colSpan="7">No Occurance added</td></tr>
                                     </Fragment>
                                 }
                                {/* {
                                  occuranceLength>0?
                                  <Fragment>
                                    <tr>
                                      <td>{occuranceDataArray.occuranceDateFrom}</td>
                                      <td>{occuranceDataArray.occuranceDateFrom}</td>
                                      <td>{occuranceDataArray.occuranceDateTo}</td>
                                      <td>{occuranceDataArray.directionFromPS.label}</td>
                                      <td>{occuranceDataArray.distanceFromPS}</td>
                                      <td>edit</td>
                                    </tr>
                                  </Fragment>:
                                  <Fragment><tr><td colSpan="6">No Occurance Found</td></tr></Fragment>
                                } */}
                            
                                  
                              </tbody>
                            </Table>
                              </FormGroup>
                            </CardBody>
                            </Card>
                            </FormGroup>
                            </Col>
                            
                            
                      </Row>
  
                      </CardBody>
                      </Card>
                      </FormGroup>            
                      </Col>
                    </Row>
                  </Col>    
                 </Row>
                 <OccuranceInfoModal
                  isShowing={isShowing}
                  hide={toggle}
                  name="Occurance Details"
                  size="xl"
                  occuranceData={occuranceDataFunc}
                  occuranceCount={occuranceLength+1}
                />   
              </CardBody>
              <CardFooter>
                <div className="btn-actions-pane-right text-capitalize">
                  <Button 
                    type="submit"
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


