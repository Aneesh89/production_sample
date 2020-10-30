import React, { Fragment, memo,useState,useEffect} from 'react';
import {
  Modal,ModalHeader, 
  ModalBody,ModalFooter,
  Row,Col,Card,CardBody,CardTitle,CardHeader,FormGroup,
  Input,InputGroup,InputGroupAddon,InputGroupText,
  Button,Label,FormFeedback
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faSignInAlt,
  faSearch,faTimes
} from '@fortawesome/free-solid-svg-icons';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import RSelect from '../../../../components/RSelect/RSelect';
import * as Yup from 'yup';
import http from '../../../../services/http';
import { GET_MASTER_DATA } from '../../../../services/constants';
import {Country,DatePicker} from '../firicon_json';
import MyDatepicker from './NewDatePicker';
import {
  toast
} from 'react-toastify';
const IdentityModal=(props)=>{
  // console.log(props);
  const [idTypeData,setIdTypeData]=useState([]);
  const [idTypeLoading,setidTypeLoading]=useState(false);
  const [dateOfIssue, setDateOfIssue] = useState(new Date());
////////////////master data request////////////////
/////List Country
useEffect(() => {
  async function getIdentity() {
    setIdTypeData(Country);
    setidTypeLoading(true);
    await http({
      method: 'POST',
      url: GET_MASTER_DATA,
      data: {
        requestName: 'getAll_m_identity_type',
      },
    })
      .then(function (response) {
        setIdTypeData(response.data);
        setidTypeLoading(false);
      })
      .catch(error => {
        toast(error, { position: 'top-right', type: 'error' });
        console.log(error);
        setidTypeLoading(false);
      });
  }
  getIdentity();
}, []);

////////////////////////////////////////////////

const idTypeFunc=(value,setFieldValue)=>{
  setFieldValue('idType', value);
}

const dateOfIssueFunc=(value,setFieldValue)=>{
  setFieldValue('dateOfIssue', value);
  setDateOfIssue(value); 
}




  // console.log(timeOfOccurance);
  let initialValue={
    idType:"",
    idNumber:"",
    placeOfIssue:"",
    dateOfIssue:"",
   }
  const identityValidateSchema=Yup.object().shape({


  });
  const handleSubmit = (values) => {
  
   props.identityData(values);
   alert(JSON.stringify(values, null, 2));
   props.hide();
  }

//  console.log(addressId);
  const closeBtn = <button className="close" onClick={props.hide}>&times;</button>;
  return <Fragment>

    
     <Modal isOpen={props.isShowing} toggle={props.hide} backdrop={true} size={props.size} >
     <ModalHeader toggle={props.hide} close={closeBtn}>{props.name}</ModalHeader>
     <Formik  
           initialValues={initialValue}
           validationSchema={identityValidateSchema}
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
    return( <Form>
     
          <ModalBody>
          
            <Row>
            <Col md="12">
              <FormGroup>
                <Card className="fir-card">
                   <CardHeader className="card-header-tab z-index-2 fir-card">Address</CardHeader>
                  <CardBody>
                    <Row>
                      <Col md="6">
                      
                      <CardTitle>Id Type</CardTitle>
                      <FormGroup>
                            <Field
                              component={RSelect}
                              name="idType"
                              value={values.idType}
                              onChange={ev => idTypeFunc(ev, setFieldValue)}
                              options={idTypeData}
                              error={errors.idType}
                              touched={touched.idType}
                              placeholder="idType"
                            />
                      </FormGroup>
                      
                      </Col>
                      <Col md="6">
                    
                        <CardTitle>Id Number</CardTitle>
                        <FormGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <FontAwesomeIcon icon={faLock} />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Field  
                                  placeholder="Id Number"
                                  type="text"
                                  name="idNumber"
                                  as={Input}
                                  invalid={errors.idNumber && touched.idNumber} />
                                <FormFeedback><ErrorMessage name="idNumber" /></FormFeedback>
                      </InputGroup>
                          </FormGroup>   
                      
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                      
                        <CardTitle>Place Of Issue</CardTitle>
                        <FormGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <FontAwesomeIcon icon={faLock} />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Field  
                                  placeholder="Place of Issue"
                                  type="text"
                                  name="placeOfIssue"
                                  as={Input}
                                  invalid={errors.placeOfIssue && touched.placeOfIssue} />
                                <FormFeedback><ErrorMessage name="placeOfIssue" /></FormFeedback>
                      </InputGroup>
                          </FormGroup>   
                      
                      </Col>
                      <Col md="6">
                      <CardTitle>Date Of Issue</CardTitle>
                      <MyDatepicker 
                            startDate={dateOfIssue}
                            onChangeValue={ev=>dateOfIssueFunc(ev,setFieldValue)} 
                            datePicker={DatePicker} /> 
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </FormGroup>
            </Col>
          </Row> 
          </ModalBody>
          <ModalFooter>
          <Button className="btn btn-success" type="submit">Save</Button>
          </ModalFooter>
          </Form>);
           }}
           </Formik>
     </Modal>
     
  </Fragment>

}
export default IdentityModal; 
