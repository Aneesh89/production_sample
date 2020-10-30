import React, { Fragment, memo,useState,useEffect} from 'react';
import cellEditFactory from 'react-bootstrap-table2-editor';
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
import {State,District,PoliceStation,DirectionFromPS} from '../firicon_json';
import {
  toast
} from 'react-toastify';
const OccuranceInfoModal=(props)=>{
  const [occuranceId,setOccuranceId]=useState();
  const [timeOfOccurance,setTimeOfOccurance]=useState("K");
  const [outsideJurisdiction,setOutsideJurisdiction]=useState("false");
  const [forestArea,setForestArea]=useState("false");
  const [directionData,setDirectionData]=useState([]);
  const [directionLoading,setDirectionLoading]=useState(false);
  const [stateData,setStateData]=useState([]);
  const [stateLoading,setStateLoading]=useState(false);
  const [stateInfo,setStateInfo]=useState();
  const [districtData,setDistrictData]=useState([]);
  const [districtLoading,setDistrictLoading]=useState(false);
  const [districtInfo,setDistrictInfo]=useState();
  const [policeStationData,setPoliceStationData]=useState([]);
  const [policeStationLoading,setPoliceStationLoading]=useState(false);

////////////////master data request////////////////
//// List Direction from PS
useEffect(() => {
  async function getDirection() {
    setDirectionData(DirectionFromPS);
    setDirectionLoading(true);
    await http({
      method: 'POST',
      url: GET_MASTER_DATA,
      data: {
        requestName: 'getAll_m_directions',
      },
    })
      .then(function (response) {
        setDirectionData(response.data);
        setDirectionLoading(false);
      })
      .catch(error => {
        toast(error, { position: 'top-right', type: 'error' });
        console.log(error);
        setDirectionLoading(false);
      });
  }
  getDirection();
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

///// List District
// useEffect(() => {
//   if(stateInfo!=='')
//   {
//     console.log("inside info")
//     async function getDistrict() {
//       setDistrictData(District);
//       setDistrictLoading(true);
//       console.log(stateInfo["key"]);
//       await http({
//         method: 'POST',
//         url: GET_MASTER_DATA,
//         data: {
//           requestName: 'getForState_m_district',
//           "params": [
//             {
//               "paramValue": stateInfo["key"]
//             }]
//         },
//       })
//         .then(function (response) {
//           setDistrictData(response.data);
//           setDistrictLoading(false);
//         })
//         .catch(error => {
//           toast(error, { position: 'top-right', type: 'error' });
//           console.log(error);
//           setDistrictLoading(false);
//         });
//     }
//   getDistrict();
//   }

// }, [stateInfo]);
///// List Police Station
// useEffect(() => {
  // async function getPoliceStation() {
  //   setPoliceStationData(PoliceStation);
  //   setPoliceStationLoading(true);
  //   await http({
  //     method: 'POST',
  //     url: GET_MASTER_DATA,
  //     data: {
  //       requestName: 'getForDistrictCode_m_police_station',
  //     },
  //   })
  //     .then(function (response) {
  //       setPoliceStationData(response.data);
  //       setPoliceStationLoading(false);
  //     })
  //     .catch(error => {
  //       toast(error, { position: 'top-right', type: 'error' });
  //       console.log(error);
  //       setPoliceStationLoading(false);
  //     });
  // }
  // getPoliceStation();
// }, [districtInfo]);

////////////////////////////////////////////////
useEffect(()=>{
  setOccuranceId(props.occuranceCount);
},[props.occuranceCount])

  const directionFromPSFunc=(value, setFieldValue)=>{
    setFieldValue('directionFromPS', value);
  }
  const stateFunc=(value, setFieldValue)=>{
    setFieldValue('state', value);
    setStateInfo(value);
    async function getDistrict() {
      setDistrictData(District);
      setDistrictLoading(true);
      console.log(value);
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
          console.log(response);
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
  // console.log(districtData);
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

  const timeOfOccuranceFunc=(value, setFieldValue) => {
    // console.log(value.target.value);
    setFieldValue('isTimeOfOccurance', value.target.value);
    setTimeOfOccurance(value.target.value);
  };
  const outsideJurisdictionFunc=(value, setFieldValue) => {
    // console.log(value.target.value);
    setFieldValue('isOutsideJurisdiction', value.target.value);
    setOutsideJurisdiction(value.target.value);
  };
  const forestAreaFunc=(value, setFieldValue) => {
    console.log(value.target.value);
    setFieldValue('isForestArea', value.target.value);
    setForestArea(value.target.value);
  };
  // console.log(timeOfOccurance);
  let initialValue={
    occuranceId:occuranceId,
    isTimeOfOccurance:"K",
    occuranceDateFrom:"",
    occuranceDateTo:"",
    latitude:"",
    longitude:"",
    houseName:"",
    houseNumber:"",
    streetName:"",
    locality:"",
    villageTownCity:"",
    pincode:"",
    isOutsideJurisdiction:"false",
    state:"",
    district:"",
    policeStation:"",
    directionFromPS:"",
    distanceFromPS:"",
    beatNumber:"",
    isForestArea:"false",
    nameOfForest:"",
    rangeBlock:""
   }
  const occuranceDetailValidateSchema=Yup.object().shape({
    occuranceDateFrom: Yup.string()
    .when("isTimeOfOccurance", {
          is: "K",
          then: Yup.string().required("Required"),
    }),
    occuranceDateTo: Yup.string()
    .when("isTimeOfOccurance", {
          is: "K",
          then: Yup.string().required("Required"),
    }),
    state: Yup.string()
    .when("isOutsideJurisdiction", {
          is: "K",
          then: Yup.string().required("Required"),
    }),
    district: Yup.string()
    .when("isOutsideJurisdiction", {
          is: "K",
          then: Yup.string().required("Required"),
    }),
    policeStation: Yup.string()
    .when("isOutsideJurisdiction", {
          is: "K",
          then: Yup.string().required("Required"),
    }),
    directionFromPS: Yup.string()
          .required("Required"),
    distanceFromPS: Yup.string()
          .required("Required"),
    nameOfForest: Yup.string()
    .when("isForestArea", {
          is: "true",
          then: Yup.string().required("Required"),
    }),


  });
  const handleSubmit = (values) => {
  
   props.occuranceData(values);
   alert(JSON.stringify(values, null, 2));
   props.hide();
  }

 
  const closeBtn = <button className="close" onClick={props.hide}>&times;</button>;
  return <Fragment>

    
     <Modal isOpen={props.isShowing} toggle={props.hide} backdrop={true} size={props.size} >
     <ModalHeader toggle={props.hide} close={closeBtn}>{props.name}</ModalHeader>
     <Formik  
           initialValues={initialValue}
           validationSchema={occuranceDetailValidateSchema}
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
                  <CardBody>
                    <Row>
                      <Col md="4">
                       
                        <CardTitle>Time Of Occurance</CardTitle>
                        <FormGroup>
                            <Label>
                                  <Field 
                                      type="radio"
                                      name="isTimeOfOccurance"
                                      value="K"
                                      checked={values.isTimeOfOccurance === "K"}
                                      onChange={ev => timeOfOccuranceFunc(ev, setFieldValue)}
                                      // onChange={() => setFieldValue("isTimeOfOccurance", "known")}          
                                  />&nbsp;Known &nbsp;&nbsp;
                            </Label>
                     
                            <Label>
                                  <Field 
                                      type="radio"
                                      name="isTimeOfOccurance"
                                      value="U"
                                      checked={values.isTimeOfOccurance === "U"}
                                      onChange={ev => timeOfOccuranceFunc(ev, setFieldValue)}
                                      // onChange={() =>  setFieldValue("isTimeOfOccurance", "unknown")}
                                  />&nbsp;UnKnown &nbsp;&nbsp;
                            </Label>
                          </FormGroup>   
                       
                      </Col>

                      {
                        timeOfOccurance==="K"?<Fragment>
                                  <Col md="4">
                      
                      <CardTitle>Date From</CardTitle>
                      <FormGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <FontAwesomeIcon icon={faLock} />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field  
                                placeholder="Date From"
                                type="text"
                                name="occuranceDateFrom"
                                as={Input}
                                invalid={errors.occuranceDateFrom && touched.occuranceDateFrom} />
                              <FormFeedback><ErrorMessage name="occuranceDateFrom" /></FormFeedback>
                    </InputGroup>
                        </FormGroup>   
                    
                    </Col>
                    <Col md="4">
                  
                      <CardTitle>Date To</CardTitle>
                      <FormGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <FontAwesomeIcon icon={faLock} />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field  
                                placeholder="Date To"
                                type="text"
                                name="occuranceDateTo"
                                as={Input}
                                invalid={errors.occuranceDateTo && touched.occuranceDateTo} />
                              <FormFeedback><ErrorMessage name="occuranceDateTo" /></FormFeedback>
                    </InputGroup>
                        </FormGroup>   
                    
                    </Col>
                 

                        </Fragment>:""

                      }
                
                   
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
                   <CardHeader className="card-header-tab z-index-6 fir-card">GeoLocation</CardHeader>
                  <CardBody>
                    <Row>
                      <Col md="6">
                      
                        <CardTitle>Latitude</CardTitle>
                        <FormGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <FontAwesomeIcon icon={faLock} />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Field  
                                  placeholder="Latitude"
                                  type="text"
                                  name="latitude"
                                  as={Input}
                                  invalid={errors.latitude && touched.latitude} />
                                <FormFeedback><ErrorMessage name="latitude" /></FormFeedback>
                      </InputGroup>
                          </FormGroup>   
                      
                      </Col>
                      <Col md="6">
                    
                        <CardTitle>Longitude</CardTitle>
                        <FormGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <FontAwesomeIcon icon={faLock} />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Field  
                                  placeholder="Longitude"
                                  type="text"
                                  name="longitude"
                                  as={Input}
                                  invalid={errors.longitude && touched.longitude} />
                                <FormFeedback><ErrorMessage name="longitude" /></FormFeedback>
                      </InputGroup>
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
                   <CardHeader className="card-header-tab z-index-2 fir-card">Place of Occurance</CardHeader>
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
                    
                        <CardTitle>Locality</CardTitle>
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
                   <CardHeader className="card-header-tab z-index-2 fir-card">Outside Limit Details</CardHeader>
                  <CardBody>
                    <Row>
                      <Col md="3">
                      
                        <CardTitle>Is Place of Occurance outside Jurisdiction</CardTitle>
                        <FormGroup check inline>
                            <Label check>
                                  <Field 
                                      type="radio"
                                      name="isOutsideJurisdiction"
                                      value="true"
                                      checked={values.isOutsideJurisdiction === "true"}
                                      onChange={ev => outsideJurisdictionFunc(ev,setFieldValue)} 
                                      // onChange={() => setFieldValue("linkFir", "true")}          
                                  />&nbsp;Yes &nbsp;&nbsp;
                            </Label>
                            <Label check>
                                  <Field 
                                      type="radio"
                                      name="isOutsideJurisdiction"
                                      value="false"
                                      checked={values.isOutsideJurisdiction === "false"}
                                      onChange={ev => outsideJurisdictionFunc(ev,setFieldValue)} 
                                      // onChange={() =>  setFieldValue("linkFir", "false")}
                                  />&nbsp;No &nbsp;&nbsp;
                            </Label>
                          </FormGroup> 
                      
                      </Col>

                      {
                        outsideJurisdiction==="true"?<Fragment>
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
                

                        </Fragment>:""
                      }

                     
                    
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
                   <CardHeader className="card-header-tab z-index-2 fir-card">Occurance Police Station Details</CardHeader>
                  <CardBody>
                    <Row>
                      <Col md="4">
                    
                        <CardTitle>Direction from Registering PS</CardTitle>
                        <FormGroup>
                              <Field
                                component={RSelect}
                                name="directionFromPS"
                                value={values.directionFromPS}
                                onChange={ev => directionFromPSFunc(ev, setFieldValue)}
                                options={DirectionFromPS}
                                error={errors.directionFromPS}
                                touched={touched.directionFromPS}
                                placeholder="Select Direction From PS"
                              />
              
                        </FormGroup>
                      </Col>
                      <Col md="4">
                    
                        <CardTitle>Distance from PS</CardTitle>
                        <FormGroup>                  
                      <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <FontAwesomeIcon icon={faLock} />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Field  
                                  placeholder="Distance from PS"
                                  type="text"
                                  name="distanceFromPS"
                                  as={Input}
                                  invalid={errors.distanceFromPS && touched.distanceFromPS} />
                        <FormFeedback><ErrorMessage name="distanceFromPS" /></FormFeedback>
                      </InputGroup>
                  </FormGroup>  
                      </Col>
                      <Col md="4">
                    
                        <CardTitle>Beat No</CardTitle>
                        <FormGroup>                  
                      <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <FontAwesomeIcon icon={faLock} />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Field  
                                  placeholder="Beat Number"
                                  type="text"
                                  name="beatNumber"
                                  as={Input}
                                  invalid={errors.beatNumber && touched.beatNumber} />
                        <FormFeedback><ErrorMessage name="beatNumber" /></FormFeedback>
                      </InputGroup>
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
                   <CardHeader className="card-header-tab z-index-2 fir-card">Forest Area</CardHeader>
                  <CardBody>
                    <Row>
                      <Col md="4">
                    
                        <CardTitle>Is the Area of crime a forest place?</CardTitle>
                        <FormGroup check inline>
                            <Label check>
                                  <Field 
                                      type="radio"
                                      name="isForestArea"
                                      value="true"
                                      checked={values.isForestArea === "true"}
                                      onChange={ev => forestAreaFunc(ev,setFieldValue)} 
                                      // onChange={() => setFieldValue("linkFir", "true")}          
                                  />&nbsp;Yes &nbsp;&nbsp;
                            </Label>
                            <Label check>
                                  <Field 
                                      type="radio"
                                      name="isForestArea"
                                      value="false"
                                      checked={values.isForestArea === "false"}
                                      onChange={ev => forestAreaFunc(ev,setFieldValue)} 
                                      // onChange={() =>  setFieldValue("linkFir", "false")}
                                  />&nbsp;No &nbsp;&nbsp;
                            </Label>
                          </FormGroup>
                      </Col>
                      {
                        forestArea==="true"?<Fragment>
                           <Col md="4">
                    
                    <CardTitle>Name of Forest Division/National Park/Tiger Reserve/Wildlife Sanctuary</CardTitle>
                    <FormGroup>                  
                  <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <FontAwesomeIcon icon={faLock} />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Field  
                              placeholder="Name of Forest"
                              type="text"
                              name="nameOfForest"
                              as={Input}
                              invalid={errors.nameOfForest && touched.nameOfForest} />
                            <FormFeedback><ErrorMessage name="nameOfForest" /></FormFeedback>
                  </InputGroup>
              </FormGroup>  
                  </Col>
                  <Col md="4">
                
                    <CardTitle>Range /<br/>Block</CardTitle>
                    <FormGroup>                  
                  <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <FontAwesomeIcon icon={faLock} />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Field  
                              placeholder="Range"
                              type="text"
                              name="rangeBlock"
                              as={Input}
                              invalid={errors.rangeBlock && touched.rangeBlock} />
                            <FormFeedback><ErrorMessage name="rangeBlock" /></FormFeedback>
                  </InputGroup>
              </FormGroup>  
                  </Col>
               
                        </Fragment>:""
                      }
                     
                   
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
export default OccuranceInfoModal; 
