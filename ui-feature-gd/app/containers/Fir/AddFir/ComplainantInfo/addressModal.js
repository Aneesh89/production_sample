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
import {Country,State,District,PoliceStation} from '../firicon_json';
import {
  toast
} from 'react-toastify';
const AddressModal=(props)=>{
  // console.log(props);
  const [addressId,setAddressId]=useState();
  const [countryData,setCountryData]=useState([]);
  const [countryLoading,setCountryLoading]=useState(false);
  const [stateData,setStateData]=useState([]);
  const [stateLoading,setStateLoading]=useState(false);
  const [stateInfo,setStateInfo]=useState();
  const [districtData,setDistrictData]=useState([]);
  const [districtLoading,setDistrictLoading]=useState(false);
  const [districtInfo,setDistrictInfo]=useState();
  const [policeStationData,setPoliceStationData]=useState([]);
  const [policeStationLoading,setPoliceStationLoading]=useState(false);
  const [isEdit,setIsEdit]=useState(0);
////////////////master data request////////////////
/////List Country
useEffect(() => {
  async function getCountry() {
    setCountryData(Country);
    setCountryLoading(true);
    await http({
      method: 'POST',
      url: GET_MASTER_DATA,
      data: {
        requestName: 'getAll_m_nationality',
      },
    })
      .then(function (response) {
        setCountryData(response.data);
        setCountryLoading(false);
      })
      .catch(error => {
        toast(error, { position: 'top-right', type: 'error' });
        console.log(error);
        setCountryLoading(false);
      });
  }
  getCountry();
}, []);
///// List State
useEffect(() => {
  async function getState() {
    setStateData(State);
    setStateLoading(true);
    await http({
      method: 'POST',
      url: GET_MASTER_DATA,
      data: {
        requestName: 'getAll_m_state',
      },
    })
      .then(function (response) {
        setStateData(response.data);
        setStateLoading(false);
      })
      .catch(error => {
        toast(error, { position: 'top-right', type: 'error' });
        console.log(error);
        setStateLoading(false);
      });
  }
  getState();
}, []);

useEffect(()=>{
  setAddressId(props.addressCount);
},[props.addressCount])

useEffect(()=>{
  // setFieldValue('houseName',props.editAddressData.houseName)
  if(props.editAddress!==0)
  {
    setIsEdit(props.editAddress);
  }
},[props.editAddress])
////////////////////////////////////////////////

const countryFunc=(value,setFieldValue)=>{
  setFieldValue('country', value);

}
  const stateFunc=(value, setFieldValue)=>{
    setFieldValue('state', value);
    setStateInfo(value);
    async function getDistrict() {
      setDistrictData(District);
      setDistrictLoading(true);
      // console.log(value);
      await http({
        method: 'POST',
        url: GET_MASTER_DATA,
        data: {
          requestName: 'getForState_m_district',
          "params": [
            {
              "paramValue": value.key
            }]
        },
      })
        .then(function (response) {
          // console.log(response);
          setDistrictData(response.data);
          setDistrictLoading(false);
        })
        .catch(error => {
          toast(error, { position: 'top-right', type: 'error' });
          console.log(error);
          setDistrictLoading(false);
        });
    }
    getDistrict();
  }

  const districtFunc=(value, setFieldValue)=>{
    setFieldValue('district', value);
    setDistrictInfo(value);
    async function getPoliceStation() {
      setPoliceStationData(PoliceStation);
      setPoliceStationLoading(true);
      await http({
        method: 'POST',
        url: GET_MASTER_DATA,
        data: {
          requestName: 'getForDistrictCode_m_police_station',
          "params": [
            {
              "paramValue": value.key
            }]
        },
      })
        .then(function (response) {
          setPoliceStationData(response.data);
          setPoliceStationLoading(false);
        })
        .catch(error => {
          toast(error, { position: 'top-right', type: 'error' });
          console.log(error);
          setPoliceStationLoading(false);
        });
    }
    getPoliceStation();
  }
  const policeStationFunc=(value, setFieldValue)=>{
    setFieldValue('policeStation', value);

  }

  // console.log(timeOfOccurance);
  let initialValue={
    addressId:isEdit===1?props.editAddressData.addressId:addressId,
    houseName:isEdit===1?props.editAddressData.houseName:"",
    houseNumber:isEdit===1?props.editAddressData.houseNumber:"",
    streetName:isEdit===1?props.editAddressData.streetName:"",
    locality:isEdit===1?props.editAddressData.locality:"",
    tehsilBlockMandal:isEdit===1?props.editAddressData.tehsilBlockMandal:"",
    villageTownCity:isEdit===1?props.editAddressData.villageTownCity:"",
    pincode:isEdit===1?props.editAddressData.pincode:"",
    isPermanantAddress:isEdit===1?props.editAddressData.isPermanantAddress:"N",
    country:isEdit===1?props.editAddressData.country:"",
    state:isEdit===1?props.editAddressData.state:"",
    district:isEdit===1?props.editAddressData.district:"",
    policeStation:isEdit===1?props.editAddressData.policeStation:"",
   }
  const addressValidateSchema=Yup.object().shape({
    villageTownCity:Yup.string().required("Required"),
    country:Yup.string().required("Required"),
    state:Yup.string().required("Required"),
    district:Yup.string().required("Required"),
  });
  const handleSubmit = (values) => {
  
   props.addressData(values);
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
           validationSchema={addressValidateSchema}
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
                      
                        <CardTitle>House Name</CardTitle>
                        <FormGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <FontAwesomeIcon icon={faLock} />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Field  
                                  placeholder="House Name"
                                  type="text"
                                  name="houseName"
                                  as={Input}
                                  invalid={errors.houseName && touched.houseName} />
                                <FormFeedback><ErrorMessage name="houseName" /></FormFeedback>
                      </InputGroup>
                          </FormGroup>   
                      
                      </Col>
                      <Col md="6">
                    
                        <CardTitle>House No</CardTitle>
                        <FormGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <FontAwesomeIcon icon={faLock} />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Field  
                                  placeholder="House Number"
                                  type="text"
                                  name="houseNumber"
                                  as={Input}
                                  invalid={errors.houseNumber && touched.houseNumber} />
                                <FormFeedback><ErrorMessage name="houseNumber" /></FormFeedback>
                      </InputGroup>
                          </FormGroup>   
                      
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                      
                        <CardTitle>Street Name</CardTitle>
                        <FormGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <FontAwesomeIcon icon={faLock} />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Field  
                                  placeholder="Street Name"
                                  type="text"
                                  name="streetName"
                                  as={Input}
                                  invalid={errors.streetName && touched.streetName} />
                                <FormFeedback><ErrorMessage name="streetName" /></FormFeedback>
                      </InputGroup>
                          </FormGroup>   
                      
                      </Col>
                      <Col md="6">
                    
                        <CardTitle>Locality/Colony/Area</CardTitle>
                        <FormGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <FontAwesomeIcon icon={faLock} />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Field  
                                  placeholder="Locality"
                                  type="text"
                                  name="locality"
                                  as={Input}
                                  invalid={errors.locality && touched.locality} />
                                <FormFeedback><ErrorMessage name="locality" /></FormFeedback>
                      </InputGroup>
                          </FormGroup>   
                      
                      </Col>
                    </Row>
                    <Row>
                    <Col md="6">
                      
                      <CardTitle>Tehsil/Block/Mandal</CardTitle>
                      <FormGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <FontAwesomeIcon icon={faLock} />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field  
                                placeholder="Tehsil/Block/Mandal"
                                type="text"
                                name="tehsilBlockMandal"
                                as={Input}
                                invalid={errors.tehsilBlockMandal && touched.tehsilBlockMandal} />
                              <FormFeedback><ErrorMessage name="tehsilBlockMandal" /></FormFeedback>
                    </InputGroup>
                        </FormGroup>   
                    
                    </Col>
                    
                      <Col md="6">
                      
                        <CardTitle>Village/Town/City</CardTitle>
                        <FormGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <FontAwesomeIcon icon={faLock} />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Field  
                                  placeholder="Village/Town/City"
                                  type="text"
                                  name="villageTownCity"
                                  as={Input}
                                  invalid={errors.villageTownCity && touched.villageTownCity} />
                                <FormFeedback><ErrorMessage name="villageTownCity" /></FormFeedback>
                      </InputGroup>
                          </FormGroup>   
                      
                      </Col>
                        </Row>
                    <Row>
                    <Col md="6">
                    
                    <CardTitle>Pincode</CardTitle>
                    <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <FontAwesomeIcon icon={faLock} />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Field  
                              placeholder="Pincode"
                              type="text"
                              name="pincode"
                              as={Input}
                              invalid={errors.pincode && touched.pincode} />
                            <FormFeedback><ErrorMessage name="pincode" /></FormFeedback>
                  </InputGroup>
                      </FormGroup>   
                  
                  </Col>
                  <Col md="6">
                    
                    <CardTitle>Is This Permanant Address</CardTitle>
                    <FormGroup check inline>
                            <Label check>
                                  <Field 
                                      type="radio"
                                      name="isPermanantAddress"
                                      value="Y"
                                      checked={values.isPermanantAddress === "Y"}
                                      onChange={() =>  setFieldValue("isPermanantAddress", "Y")}          
                                  />&nbsp;Yes &nbsp;&nbsp;
                            </Label>
                            <Label check>
                                  <Field 
                                      type="radio"
                                      name="isPermanantAddress"
                                      value="N"
                                      checked={values.isPermanantAddress === "N"}
                                      onChange={() =>  setFieldValue("isPermanantAddress", "N")}
                                  />&nbsp;No &nbsp;&nbsp;
                            </Label>
                      </FormGroup> 
                  
                  </Col>
              
                    </Row>
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
                    <Row>
                    <Col md="3">
                    
                    <CardTitle>Country</CardTitle>
                    <FormGroup>
                          <Field
                            component={RSelect}
                            name="country"
                            value={values.country}
                            onChange={ev => countryFunc(ev, setFieldValue)}
                            options={countryData}
                            error={errors.country}
                            touched={touched.country}
                            placeholder="Country"
                          />
          
                    </FormGroup>
                  </Col>
                    <Col md="3">
                    
                    <CardTitle>State</CardTitle>
                    <FormGroup>
                          <Field
                            component={RSelect}
                            name="state"
                            value={values.state}
                            onChange={ev => stateFunc(ev, setFieldValue)}
                            options={stateData}
                            error={errors.state}
                            touched={touched.state}
                            placeholder="State"
                          />
          
                    </FormGroup>
                  </Col>
                  <Col md="3">
                
                    <CardTitle>District</CardTitle>
                    <FormGroup>
                          <Field
                            component={RSelect}
                            name="district"
                            value={values.district}
                            onChange={ev => districtFunc(ev, setFieldValue)}
                            options={districtData}
                            error={errors.district}
                            touched={touched.district}
                            placeholder="District"
                          />
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <CardTitle>Police Station</CardTitle>
                    <FormGroup>
                          <Field
                            component={RSelect}
                            name="policeStation"
                            value={values.policeStation}
                            onChange={ev => policeStationFunc(ev, setFieldValue)}
                            options={policeStationData}
                            error={errors.policeStation}
                            touched={touched.policeStation}
                            placeholder="Police Station"
                          />
                    </FormGroup>
                   </Col>
                


                    </Row>
                  </CardBody>
                </Card>
              </FormGroup>
            </Col>
          </Row> 
         
          </ModalBody>
          <ModalFooter>
          <Button className="btn btn-success" type="submit">Save Occurance</Button>
          </ModalFooter>
          </Form>);
           }}
           </Formik>
     </Modal>
     
  </Fragment>

}
export default AddressModal; 
