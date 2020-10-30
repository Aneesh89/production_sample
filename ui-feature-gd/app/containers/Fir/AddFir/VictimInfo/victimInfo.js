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
import useModal from '../../../../components/UseModal/useModal';
import {Gender,MaritalStatus,Category,DatePicker} from '../firicon_json';
import http from '../../../../services/http';
import { GET_MASTER_DATA } from '../../../../services/constants';
import {
  toast
} from 'react-toastify';
import AliasModal from './aliasModal';
import AddressModal from './addressModal';
import IdentityModal from './identityModal';
import MyDatepicker from './NewDatePicker';
export default function VictimInfo() {
const { isShowing, toggle } = useModal();
const { isShowingAddress, toggleAddress } = useModal();
const { isShowingIdentity, toggleIdentity } = useModal();
const [victim,setVictim]=useState('K');
const [victimComplainant,setVictimComplainant]=useState('N');

const [genderData,setGenderData]=useState([])
const [genderLoading,setGenderLoading]=useState(false);
const [maritalStatusData,setMaritalStatusData]=useState([])
const [maritalStatusLoading,setMaritalStatusLoading]=useState(false);
const [categoryData,setCategoryData]=useState([])
const [categoryLoading,setCategoryLoading]=useState(false);
const [occupationData,setOccupationData]=useState([])
const [occupationLoading,setOccupationLoading]=useState(false);
const [relationTypeData,setRelationTypeData]=useState([])
const [relationTypeLoading,setRelationTypeLoading]=useState(false);
const [aliasName,setAliasName]=useState([]);
const [address,setAddress]=useState([]);
const [editAddress,setEditAddress]=useState(0);
const [editAddressData,setEditAddressData]=useState([]);
const [dateOfBirth, setDateOfBirth] = useState();
const [hasWornOrnaments,setHasWornOrnaments]=useState('N');
const [identitificationMarkData,setIdentificationMarkData]=useState([]);
const [identitificationMarkLoading,setIdentificationMarkLoading]=useState(false);
const [identity,setIdentity]=useState([]);
var addressLength=address.length;

//////////////pending
//age group>permanant address>
/////////////////////////////////////////
///// Gender
useEffect(() => {
  async function getGender() {
    setGenderData(Gender);
    setGenderLoading(true);
    await http({
      method: 'POST',
      url: GET_MASTER_DATA,
      data: {
        requestName: 'getAll_m_gender',
      },
    })
      .then(function (response) {
        setGenderData(response.data);
        setGenderLoading(false);
      })
      .catch(error => {
        toast(error, { position: 'top-right', type: 'error' });
        console.log(error);
        setGenderLoading(false);
      });
  }
  getGender();
}, []);

///// Marital Status
useEffect(() => {
  async function getMaritalStatus() {
    setMaritalStatusData(MaritalStatus);
    setMaritalStatusLoading(true);
    await http({
      method: 'POST',
      url: GET_MASTER_DATA,
      data: {
        requestName: 'getAll_m_marital_status',
      },
    })
      .then(function (response) {
        setMaritalStatusData(response.data);
        setMaritalStatusLoading(false);
      })
      .catch(error => {
        toast(error, { position: 'top-right', type: 'error' });
        console.log(error);
        setMaritalStatusLoading(false);
      });
  }
  getMaritalStatus();
}, []);

///// Category
useEffect(() => {
  async function getCategory() {
    setCategoryData(Category);
    setCategoryLoading(true);
    await http({
      method: 'POST',
      url: GET_MASTER_DATA,
      data: {
        requestName: 'getAll_m_category',
      },
    })
      .then(function (response) {
        setCategoryData(response.data);
        setCategoryLoading(false);
      })
      .catch(error => {
        toast(error, { position: 'top-right', type: 'error' });
        console.log(error);
        setCategoryLoading(false);
      });
  }
  getCategory();
}, []);

///// Occupation
useEffect(() => {
  async function getOccupation() {
    setOccupationData(Category);
    setOccupationLoading(true);
    await http({
      method: 'POST',
      url: GET_MASTER_DATA,
      data: {
        requestName: 'getAll_m_category',
      },
    })
      .then(function (response) {
        setOccupationData(response.data);
        setOccupationLoading(false);
      })
      .catch(error => {
        toast(error, { position: 'top-right', type: 'error' });
        console.log(error);
        setOccupationLoading(false);
      });
  }
  getOccupation();
}, []);

///// Relation TYpe
useEffect(() => {
  async function getRelationType() {
    setRelationTypeData(Category);
    setRelationTypeLoading(true);
    await http({
      method: 'POST',
      url: GET_MASTER_DATA,
      data: {
        requestName: 'getAll_m_relation_type',
      },
    })
      .then(function (response) {
        setRelationTypeData(response.data);
        setRelationTypeLoading(false);
      })
      .catch(error => {
        toast(error, { position: 'top-right', type: 'error' });
        console.log(error);
        setRelationTypeLoading(false);
      });
  }
  getRelationType();
}, []);

///// Identification Mark
useEffect(() => {
  async function getIdentificationMark() {
    setIdentitificationMarkData(Category);
    setIdentificationMarkLoading(true);
    await http({
      method: 'POST',
      url: GET_MASTER_DATA,
      data: {
        requestName: 'getAll_m_relation_type',
      },
    })
      .then(function (response) {
        setIdentitificationMarkData(response.data);
        setIdentificationMarkLoading(false);
      })
      .catch(error => {
        toast(error, { position: 'top-right', type: 'error' });
        console.log(error);
        setIdentificationMarkLoading(false);
      });
  }
  getIdentificationMark();
}, []);


const victimFunc=(value,setFieldValue)=>{
  console.log(value.target.value);
  setVictim(value.target.value);
  setFieldValue('victim',value.target.value);
}

const isVictimComplainantFunc=(value,setFieldValue)=>{
  console.log(value.target.value);
  setVictimComplainant(value.target.value);
  setFieldValue('isVictimComplainant',value.target.value);
}

const genderFunc=(value,setFieldValue)=>{
  setFieldValue('gender',value);
};

const maritalStatusFunc=(value,setFieldValue)=>{
  setFieldValue('maritalStatus',value);
};

const categoryFunc=(value,setFieldValue)=>{
  setFieldValue('category',value);
};

const relationTypeFunc=(value,setFieldValue)=>{
  setFieldValue('relationType',value);
};

const dateOfBirthFunc=(value,setFieldValue)=>{
  setFieldValue('dateOfBirth',value);
  setDateOfBirth(value);
};

const occupationFunc=(value,setFieldValue)=>{
  setFieldValue('occupation',value);
};

const aliasModal=()=>{
  toggle();
}

const addressModal=()=>{
  toggleAddress();
}

const identityModal=()=>{
  toggleIdentity();
}

const aliasDataFunc=(value)=>{
  // setAliasName(value);
  aliasName.push({value});

}

const deleteAliasFunc=(aliasname)=>{
  // console.log(aliasname);
  var alias=aliasName.filter(aliasValue=>aliasValue.value!==aliasname.value);
  setAliasName(alias);
}

const addressDataFunc=(value)=>{
  address.push(value);
}

const deleteAddressFunc=(addressId)=>{
   var addressContent=address.filter(addressValue=>addressValue.addressId!==addressId);
   setAddress(addressContent);
}

const editAddressFunc=(addressId)=>{
  setEditAddress(1);
  
  // console.log(addressId);

  var addressContent=address.filter(addressValue=>addressValue.addressId===addressId);
 
  setEditAddressData(...addressContent);
  // console.log(editAddressData);
  toggleAddress();
  
}

const hasWornOrnamentsFunc=(value,setFieldValue)=>{
  setFieldValue('hasWornOrnaments',value.target.value);
  setHasWornOrnaments(value.target.value);
};
const identityDataFunc=(value)=>{
  console.log(value);
  identity.push(value);
}

const deleteIdentityFunc=(idNumber)=>{
  var identityContent=identity.filter(identityValue=>identityValue.idNumber!==idNumber);
  setIdentity(identityContent);
}
// console.log(address);

let initialValue={
  victim:victim,
  isVictimComplainant:victimComplainant,
  firstName:"",
  middleName:"",
  lastName:"",
  gender:"",
  maritalStatus:"",
  category:"",
  mobile:"",
  landline:"",
  email:"",
  relationType:"",
  relativeName:"",
  relationAliasName:"",
  dateOfBirth:"",
  age:"",
  yearOfBirth:"",
  ageRangeFrom:"",
  ageRangeTo:"",
  victimType:"Adult",
  isMedicalReq:"N",
  occupation:"",
  placeOfMissing:"",
  briefOfIncident:"",
  isMentallySound:"N",
  hasWornOrnaments:hasWornOrnaments,
  wornOrnamentDetails:"",
  countryOfNationality:"",
 }

const complainantInfoValidateSchema=Yup.object().shape({
  firstName:Yup.string().required("Required"),
  gender:Yup.string().required("Required"),
  dateOfBirth:Yup.date().required("Required").nullable(),

});
const handleSubmit=(values,{setSubmitting})=>{
  values.address=address; 
  values.alias=aliasName;
  values.identity=identity; 
  setSubmitting(true);
  alert(JSON.stringify(values,2,null))
  console.log(values);
}

  return (
    
    <Fragment>
      <Container fluid>
        <Card className="mb-12" >
          <CardHeader className="card-header-tab z-index-2 fir-card">
            <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
              <i className="header-icon lnr-charts icon-gradient bg-happy-green">
                {' '}
              </i>
              Victim Info
            </div>
          </CardHeader>
            
          <Formik  
           initialValues={initialValue}
           validationSchema={complainantInfoValidateSchema}
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
                            <Col md="6">
                            <FormGroup>
                            <Card className="fir-card">
                            <CardBody>
                              <CardTitle>Victim Type</CardTitle>
                              <FormGroup check inline>
                              <Label check>
                                    <Field 
                                        type="radio"
                                        name="victim"
                                        value="K"
                                        checked={values.victim === "K"}
                                        onChange={ev => victimFunc(ev,setFieldValue)} 
                                        // onChange={() => setFieldValue("linkFir", "true")}          
                                    />&nbsp;Known &nbsp;&nbsp;
                              </Label>
                              <Label check>
                                    <Field 
                                        type="radio"
                                        name="victim"
                                        value="U"
                                        checked={values.victim === "U"}
                                        onChange={ev => victimFunc(ev,setFieldValue)} 
                                        // onChange={() =>  setFieldValue("linkFir", "false")}
                                    />&nbsp;UnKnown &nbsp;&nbsp;
                              </Label>
                          </FormGroup>
                            </CardBody>
                            </Card>
                            </FormGroup>
                            </Col>
                            {
                            victim==='K'?<Fragment>
                              <Col md="6">
                              <FormGroup>
                              <Card className="fir-card">
                              <CardBody>
                                <CardTitle>Is Victim Same as Complainant</CardTitle>
                                <FormGroup check inline>
                                <Label check>
                                      <Field 
                                          type="radio"
                                          name="isVictimComplainant"
                                          value="Y"
                                          checked={values.isVictimComplainant === "Y"}
                                          onChange={ev => isVictimComplainantFunc(ev,setFieldValue)} 
                                          // onChange={() => setFieldValue("linkFir", "true")}          
                                      />&nbsp;Yes &nbsp;&nbsp;
                                </Label>
                                <Label check>
                                      <Field 
                                          type="radio"
                                          name="isVictimComplainant"
                                          value="N"
                                          checked={values.isVictimComplainant === "N"}
                                          onChange={ev => isVictimComplainantFunc(ev,setFieldValue)} 
                                          // onChange={() =>  setFieldValue("linkFir", "false")}
                                      />&nbsp;No &nbsp;&nbsp;
                                </Label>
                            </FormGroup>
                              </CardBody>
                              </Card>
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
                  </Col>   
                 </Row>

            {
              victim==='K'?<Fragment>

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
                            <CardBody>
                              <CardTitle>First Name</CardTitle>
                              <FormGroup>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <FontAwesomeIcon icon={faLock} />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Field
                                    type="text" 
                                    name="firstName"
                                    placeholder="First Name"
                                    as={Input}
                                    invalid={errors.firstName && touched.firstName}
                                  />
                                  <FormFeedback>
                                    <ErrorMessage name="firstName" />
                                  </FormFeedback>
                                  </InputGroup>
                                </FormGroup>
                            </CardBody>
                            </Card>
                            </FormGroup>
                            </Col>
                            <Col md="4">
                            <FormGroup>
                            <Card className="fir-card">
                            <CardBody>
                              <CardTitle>Middle Name</CardTitle>
                              <FormGroup>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <FontAwesomeIcon icon={faLock} />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Field
                                    type="text" 
                                    name="middleName"
                                    placeholder="Middle Name"
                                    as={Input}
                                    invalid={errors.middleName && touched.middleName}
                                  />
                                  <FormFeedback>
                                    <ErrorMessage name="middleName" />
                                  </FormFeedback>
                                  </InputGroup>
                                </FormGroup>
                            </CardBody>
                            </Card>
                            </FormGroup>
                            </Col>
                            <Col md="4">
                            <FormGroup>
                            <Card className="fir-card">
                            <CardBody>
                              <CardTitle>Last Name</CardTitle>
                              <FormGroup>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <FontAwesomeIcon icon={faLock} />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Field
                                    type="text" 
                                    name="lastName"
                                    placeholder="Last Name"
                                    as={Input}
                                    invalid={errors.lastName && touched.lastName}
                                  />
                                  <FormFeedback>
                                    <ErrorMessage name="lastName" />
                                  </FormFeedback>
                                  </InputGroup>
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
                 <Row>
                  <Col md="12">
                    <Row>
                      <Col md="12">  
                      <FormGroup>
                      <Card className="fir-card">
                      <CardBody>
                      <Row>
                      <Col md="12">
                        <Row>
                          <Col md="12">  
                          <FormGroup>
                          <Card className="fir-card">
                          <CardHeader className="card-header-tab z-index-2 fir-card">
                          Alias Name
                          <div className="btn-actions-pane-right text-capitalize">
                          <Button 
                            type="button"
                            className="btn-wide mr-md-2 btn btn-info btn-md font-size-md border-0 btn-transition"
                            onClick={aliasModal}
                          >
                          Add Alias
                          </Button>
                          </div>
                          
                          </CardHeader>
                          <CardBody>
                          <Row>
                                <Col md="12">
                                <FormGroup>
                                <Card className="fir-card">
                                <CardBody>
                        
                                  <FormGroup>
                                  <Table striped>
                                  <thead>
                                    <tr>
                                      <th>Sl No</th>
                                      <th>Alias Name</th>
                                      <th>Remove</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {
                                      aliasName.length>0? <Fragment>
                                        {
                                          aliasName.map((aliasname,i)=>{
                                            return (
                                              <tr key={i}>
                                              <td>{i+1}</td>
                                              <td>{aliasname.value}</td>
                                              <td onClick={()=>deleteAliasFunc(aliasname)}>delete</td>
                                            </tr>
                                            );
                                       
                                          })
                                        }
                                      </Fragment>:
                                      <Fragment><tr><td colSpan="3">No Occurance Found</td></tr></Fragment>
                                    }      
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
                      <CardBody>
                      <Row>
                            <Col md="4">
                            <FormGroup>
                            <Card className="fir-card">
                            <CardBody>
                              <CardTitle>Gender</CardTitle>
                              <Field
                                component={RSelect}
                                name="gender"
                                value={values.gender}
                                onChange={ev => genderFunc(ev, setFieldValue)}
                                options={genderData}
                                placeholder="--Select--"
                                error={errors.gender}
                                touched={touched.gender}
                              />  
                            </CardBody>
                            </Card>
                            </FormGroup>
                            </Col>
                            <Col md="4">
                            <FormGroup>
                            <Card className="fir-card">
                            <CardBody>
                              <CardTitle>Marital Status</CardTitle>
                              <Field
                                component={RSelect}
                                name="maritalStatus"
                                value={values.maritalStatus}
                                onChange={ev => maritalStatusFunc(ev, setFieldValue)}
                                options={maritalStatusData}
                                placeholder="--Select--"
                                error={errors.maritalStatus}
                                touched={touched.maritalStatus}
                              />  
                            </CardBody>
                            </Card>
                            </FormGroup>
                            </Col>
                            <Col md="4">
                            <FormGroup>
                            <Card className="fir-card">
                            <CardBody>
                              <CardTitle>Category</CardTitle>
                              <Field
                                component={RSelect}
                                name="category"
                                value={values.category}
                                onChange={ev => categoryFunc(ev, setFieldValue)}
                                options={categoryData}
                                placeholder="--Select--"
                                error={errors.category}
                                touched={touched.category}
                              />  
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
                      <CardBody>
                      <Row>
                            <Col md="4">
                            <FormGroup>
                            <Card className="fir-card">
                            <CardBody>
                              <CardTitle>Mobile</CardTitle>
                              <FormGroup>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <FontAwesomeIcon icon={faLock} />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Field
                                    type="text" 
                                    name="mobile"
                                    placeholder="Mobile"
                                    as={Input}
                                    invalid={errors.mobile && touched.mobile}
                                  />
                                  <FormFeedback>
                                    <ErrorMessage name="mobile" />
                                  </FormFeedback>
                                  </InputGroup>
                                </FormGroup>
                            </CardBody>
                            </Card>
                            </FormGroup>
                            </Col>
                            <Col md="4">
                            <FormGroup>
                            <Card className="fir-card">
                            <CardBody>
                              <CardTitle>LandLine</CardTitle>
                              <FormGroup>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <FontAwesomeIcon icon={faLock} />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Field
                                    type="text" 
                                    name="landline"
                                    placeholder="Landline"
                                    as={Input}
                                    invalid={errors.landline && touched.landline}
                                  />
                                  <FormFeedback>
                                    <ErrorMessage name="landline" />
                                  </FormFeedback>
                                  </InputGroup>
                                </FormGroup>
                            </CardBody>
                            </Card>
                            </FormGroup>
                            </Col>
                            <Col md="4">
                            <FormGroup>
                            <Card className="fir-card">
                            <CardBody>
                              <CardTitle>Email</CardTitle>
                              <FormGroup>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <FontAwesomeIcon icon={faLock} />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Field
                                    type="text" 
                                    name="email"
                                    placeholder="Email"
                                    as={Input}
                                    invalid={errors.email && touched.email}
                                  />
                                  <FormFeedback>
                                    <ErrorMessage name="email" />
                                  </FormFeedback>
                                  </InputGroup>
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
                 <Row>
                  <Col md="12">
                    <Row>
                      <Col md="12">  
                      <FormGroup>
                      <Card className="fir-card">
                      <CardBody>
                      <Row>
                      <Col md="12">
                        <Row>
                          <Col md="12">  
                          <FormGroup>
                          <Card className="fir-card">
                          <CardHeader className="card-header-tab z-index-2 fir-card">
                          Relative Information
                          </CardHeader>
                          <CardBody>
                          <Row>
                            <Col md="4">
                            <FormGroup>
                            <Card className="fir-card">
                            <CardBody>
                              <CardTitle>Relation Type</CardTitle>
                              <Field
                                component={RSelect}
                                name="relationType"
                                value={values.relationType}
                                onChange={ev => relationTypeFunc(ev, setFieldValue)}
                                options={relationTypeData}
                                placeholder="--Select--"
                                error={errors.relationType}
                                touched={touched.relationType}
                              />  
                            </CardBody>
                            </Card>
                            </FormGroup>
                            </Col>
                            <Col md="4">
                            <FormGroup>
                            <Card className="fir-card">
                            <CardBody>
                              <CardTitle>Relative Name</CardTitle>
                              <FormGroup>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <FontAwesomeIcon icon={faLock} />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Field
                                    type="text" 
                                    name="relativeName"
                                    placeholder="Relation Name"
                                    as={Input}
                                    invalid={errors.relativeName && touched.relativeName}
                                  />
                                  <FormFeedback>
                                    <ErrorMessage name="relativeName" />
                                  </FormFeedback>
                                  </InputGroup>
                                </FormGroup>

                            </CardBody>
                            </Card>
                            </FormGroup>
                            </Col>
                            <Col md="4">
                            <FormGroup>
                            <Card className="fir-card">
                            <CardBody>
                              <CardTitle>Relative Alias Name</CardTitle>
                              <FormGroup>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <FontAwesomeIcon icon={faLock} />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Field
                                    type="text" 
                                    name="relativeAliasName"
                                    placeholder="Relation Alias Name"
                                    as={Input}
                                    invalid={errors.relativeAliasName && touched.relativeAliasName}
                                  />
                                  <FormFeedback>
                                    <ErrorMessage name="relativeAliasName" />
                                  </FormFeedback>
                                  </InputGroup>
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
                      <CardBody>
                      <Row>
                      <Col md="12">
                        <Row>
                          <Col md="12">  
                          <FormGroup>
                          <Card className="fir-card">
                          <CardHeader className="card-header-tab z-index-2 fir-card">
                          Age Panel(Any one field is mandatory)
                          </CardHeader>
                          <CardBody>
                          <Row>
                            <Col md="3">
                            <FormGroup>
                            <Card className="fir-card">
                            <CardBody>
                              <CardTitle>Date of Birth</CardTitle>
                              <MyDatepicker 
                                name="dateOfBirth"
                                startDate={dateOfBirth}
                                onChangeValue={(ev)=>dateOfBirthFunc(ev,setFieldValue)} 
                                datePicker={DatePicker}
                                placeholder="--select--"
                                />
                            {errors.dateOfBirth && touched.dateOfBirth ? <div
                                style={{ color: "#DC3545", fontSize: 11.264, marginTop: ".4rem" }}
                              >
                              {errors.dateOfBirth}
                             </div> : null}
                            </CardBody>
                            </Card>
                            </FormGroup>
                            </Col>
                            <Col md="3">
                            <FormGroup>
                            <Card className="fir-card">
                            <CardBody>
                              <CardTitle>Age(Year/Month)</CardTitle>
                              <FormGroup>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <FontAwesomeIcon icon={faLock} />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Field
                                    type="text" 
                                    name="age"
                                    placeholder="Age"
                                    as={Input}
                                    invalid={errors.age && touched.age}
                                  />
                                  <FormFeedback>
                                    <ErrorMessage name="age" />
                                  </FormFeedback>
                                  </InputGroup>
                                </FormGroup>
                            </CardBody>
                            </Card>
                            </FormGroup>
                            </Col>
                            <Col md="3">
                            <FormGroup>
                            <Card className="fir-card">
                            <CardBody>
                              <CardTitle>Year of Birth</CardTitle>
                              <FormGroup>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <FontAwesomeIcon icon={faLock} />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Field
                                    type="text" 
                                    name="yearOfBirth"
                                    placeholder="Year of Birth"
                                    as={Input}
                                    invalid={errors.yearOfBirth && touched.yearOfBirth}
                                  />
                                  <FormFeedback>
                                    <ErrorMessage name="yearOfBirth" />
                                  </FormFeedback>
                                  </InputGroup>
                                </FormGroup>
                            </CardBody>
                            </Card>
                            </FormGroup>
                            </Col>
                            <Col md="3">
                            <FormGroup>
                            <Card className="fir-card">
                            <CardBody>
                            <CardTitle>Age Range From - To</CardTitle>
                            <Row>
                              <Col md="6">
                              <FormGroup>
                                  <InputGroup>
                                  <Field
                                    type="text" 
                                    name="ageRangeFrom"
                                    placeholder="Range From"
                                    as={Input}
                                    invalid={errors.ageRangeFrom && touched.ageRangeFrom}
                                  />
                                  <FormFeedback>
                                    <ErrorMessage name="ageRangeFrom" />
                                  </FormFeedback>
                                  </InputGroup>
                                </FormGroup>
                              </Col>
                              <Col md="6">
                              <FormGroup>
                                  <InputGroup>
                                  <Field
                                    type="text" 
                                    name="ageRangeTo"
                                    placeholder="Range To"
                                    as={Input}
                                    invalid={errors.ageRangeTo && touched.ageRangeTo}
                                  />
                                  <FormFeedback>
                                    <ErrorMessage name="ageRangeTo" />
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
                      <CardBody>
                      <Row>
                            <Col md="6">
                            <FormGroup>
                            <Card className="fir-card">
                            <CardBody>
                              <CardTitle>Victim Type</CardTitle>
                              <FormGroup check inline>
                              <Label check>
                                    <Field 
                                        type="radio"
                                        name="victimType"
                                        value="Child"
                                        checked={values.victimType === "Child"}
                                        // onChange={ev => victimTypeFunc(ev,setFieldValue)} 
                                        onChange={() => setFieldValue("victimType", "Child")}          
                                    />&nbsp;Child &nbsp;&nbsp;
                              </Label>
                              <Label check>
                                    <Field 
                                        type="radio"
                                        name="victimType"
                                        value="Adult"
                                        checked={values.victimType === "Adult"}
                                        // onChange={ev => victimTypeFunc(ev,setFieldValue)} 
                                        onChange={() =>  setFieldValue("victimType", "Adult")}
                                    />&nbsp;Adult &nbsp;&nbsp;
                              </Label>
                          </FormGroup>
                            </CardBody>
                            </Card>
                            </FormGroup>
                            </Col>
                 
                              <Col md="6">
                              <FormGroup>
                              <Card className="fir-card">
                              <CardBody>
                                <CardTitle>Whether Medical Examination is required to determine the Age</CardTitle>
                                <FormGroup check inline>
                                <Label check>
                                      <Field 
                                          type="radio"
                                          name="isMedicalReq"
                                          value="Y"
                                          checked={values.isMedicalReq === "Y"}
                                          // onChange={ev => isVictimComplainantFunc(ev,setFieldValue)} 
                                          onChange={() => setFieldValue("isMedicalReq", "Y")}          
                                      />&nbsp;Yes &nbsp;&nbsp;
                                </Label>
                                <Label check>
                                      <Field 
                                          type="radio"
                                          name="isMedicalReq"
                                          value="N"
                                          checked={values.isMedicalReq === "N"}
                                          // onChange={ev => isVictimComplainantFunc(ev,setFieldValue)} 
                                          onChange={() =>  setFieldValue("isMedicalReq", "N")}
                                      />&nbsp;No &nbsp;&nbsp;
                                </Label>
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
                 <Row>
                  <Col md="12">
                    <Row>
                      <Col md="12">  
                      <FormGroup>
                      <Card className="fir-card">
                      <CardBody>
                      <Row>
                      <Col md="12">
                        <Row>
                          <Col md="12">  
                          <FormGroup>
                          <Card className="fir-card">
                          <CardHeader className="card-header-tab z-index-2 fir-card">
                          Address
                        
                          <div className="btn-actions-pane-right text-capitalize">
              
                        
                          <Button 
                            type="button"
                            className="btn-wide mr-md-2 btn btn-info btn-md font-size-md border-0 btn-transition"
                            onClick={addressModal}
                          >
                          Add address
                          </Button>
                          </div>
                          
                          </CardHeader>
                          <CardBody>
                          <Row>
                                <Col md="12">
                                <FormGroup>
                                <Card className="fir-card">
                                <CardBody>
                                  <CardTitle>Address</CardTitle>
                                  <FormGroup>
                                  <Table striped>
                                  <thead>
                                    <tr>
                                      <th>Sl No</th>
                                      <th>Address No</th>
                                      <th>Address Type</th>
                                      <th>Edit</th>
                                      <th>Delete</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                  {
                                      addressLength>0? <Fragment>
                                        {
                                          address.map((addressdata,i)=>{
                                            
                                            return (
                                              <tr key={i}>
                                              <td>{i+1}</td>
                                              <td>Address {i+1}</td>
                                              <td>
                                                {addressdata.isPermanantAddress==="Y"?"Permanant":"Present"}
                                              </td>
                                              <td onClick={()=>editAddressFunc(addressdata.addressId)}>edit</td>
                                              <td onClick={()=>deleteAddressFunc(addressdata.addressId)}>delete</td>
                                            </tr>
                                            );
                                       
                                          })
                                        }
                                      </Fragment>:
                                      <Fragment><tr><td colSpan="5">No Occurance Found</td></tr></Fragment>
                                    }      


                                
                                      
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
                      <CardBody>
                      <Row>
                      <Col md="12">
                        <Row>
                          <Col md="12">  
                          <FormGroup>
                          <Card className="fir-card">
                          <CardHeader className="card-header-tab z-index-2 fir-card">
                          Other Information
                          </CardHeader>
                          <CardBody>
                          <Row>
                            <Col md="6">
                            <FormGroup>
                            <Card className="fir-card">
                            <CardBody>
                              <CardTitle>Occupation</CardTitle>
                              <Field
                                component={RSelect}
                                name="occupation"
                                value={values.maritalStatus}
                                onChange={ev => occupationFunc(ev, setFieldValue)}
                                options={occupationData}
                                placeholder="--Select--"
                                error={errors.occupation}
                                touched={touched.occupation}
                              />  
                            </CardBody>
                            </Card>
                            </FormGroup>
                            </Col>
                            <Col md="6">
                            <FormGroup>
                            <Card className="fir-card">
                            <CardBody>
                              <CardTitle>Country of Nationality</CardTitle>
                              <FormGroup>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <FontAwesomeIcon icon={faLock} />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Field
                                    type="text" 
                                    name="countryOfNationality"
                                    placeholder="Country of Nationality"
                                    as={Input}
                                    invalid={errors.countryOfNationality && touched.countryOfNationality}
                                  />
                                  <FormFeedback>
                                    <ErrorMessage name="countryOfNationality" />
                                  </FormFeedback>
                                  </InputGroup>
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
                        <CardHeader className="card-header-tab z-index-2 fir-card">
                            Missing Person
                        </CardHeader>
                        <CardBody>
                          {/* missing perrson first row */}
                         <Row>
                         <Col md="12">
                          <Row>
                            <Col md="12">  
                            <FormGroup>
                            <Card className="fir-card">
                            <CardBody>
                            <Row>
                              <Col md="3">
                                <Card className="fir-card">
                                  <CardBody>
                                  <CardTitle>Place of Missing</CardTitle>
                                    <FormGroup>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText>
                                        <FontAwesomeIcon icon={faLock} />
                                      </InputGroupText>
                                    </InputGroupAddon>
                                    <Field  
                                            placeholder="Place of Missing"
                                            type="text"
                                            name="placeOfMissing"
                                            as={Input}
                                            invalid={errors.placeOfMissing && touched.placeOfMissing} />
                                          <FormFeedback><ErrorMessage name="placeOfMissing" /></FormFeedback>
                                </InputGroup>
                                    </FormGroup>   
                              
                                  </CardBody>
                                </Card>
                              
                              </Col>
                              <Col md="3">
                                <Card className="fir-card">
                                  <CardBody>
                                  <CardTitle>Brief of Incident</CardTitle>
                                <FormGroup>
                                  <InputGroup>
                                  <Field
                                    type="textarea" 
                                    rows="2" 
                                    id="briefOfIncident" 
                                    name="briefOfIncident"
                                    placeholder="Brief of Incident.."
                                    as={Input}
                                    invalid={errors.briefOfIncident && touched.briefOfIncident}
                                  />
                                  <FormFeedback>
                                    <ErrorMessage name="briefOfIncident" />
                                  </FormFeedback>
                                  </InputGroup>
                                </FormGroup>
                            
                                  </CardBody>
                                </Card>
                              
                              </Col>
                              <Col md="3">
                                <Card className="fir-card">
                                  <CardBody>
                                  <CardTitle>Is Mentally Sound</CardTitle>
                                <FormGroup check inline>
                                <Label check>
                                      <Field 
                                          type="radio"
                                          name="isMentallySound"
                                          value="Y"
                                          checked={values.isMentallySound === "Y"}
                                          onChange={() => setFieldValue("isMentallySound", "Y")}          
                                      />&nbsp;Yes &nbsp;&nbsp;
                                </Label>
                                <Label check>
                                      <Field 
                                          type="radio"
                                          name="isMentallySound"
                                          value="N"
                                          checked={values.isMentallySound === "N"}
                                          onChange={() =>  setFieldValue("isMentallySound", "N")}
                                      />&nbsp;No &nbsp;&nbsp;
                                </Label>
                            </FormGroup>
                              
                                  </CardBody>
                                </Card>
                              
                              </Col>
                              <Col md="3">
                                <Row>
                                  <Card className="fir-card">
                                  <CardBody>
                                    <Col md="12">
                                    <CardTitle>Any Ornaments/adorn/other article found?</CardTitle>
                                          <FormGroup check inline>
                                          <Label check>
                                                <Field 
                                                    type="radio"
                                                    name="hasWornOrnaments"
                                                    value="Y"
                                                    checked={values.hasWornOrnaments === "Y"}
                                                    onChange={ev => hasWornOrnamentsFunc(ev,setFieldValue)} 
                                                    // onChange={() => setFieldValue("isMentallySound", "Y")}          
                                                />&nbsp;Yes &nbsp;&nbsp;
                                          </Label>
                                          <Label check>
                                                <Field 
                                                    type="radio"
                                                    name="hasWornOrnaments"
                                                    value="N"
                                                    checked={values.hasWornOrnaments === "N"}
                                                    onChange={ev => hasWornOrnamentsFunc(ev,setFieldValue)} 
                                                />&nbsp;No &nbsp;&nbsp;
                                          </Label>
                                      </FormGroup>                  
                                    </Col>
                                    {
                                      hasWornOrnaments==="Y"?<Fragment>
                                        <Col md="12">
                                            <FormGroup>
                                                <InputGroup>
                                                <Field
                                                  type="textarea" 
                                                  rows="2" 
                                                  id="wornOrnamentDetails" 
                                                  name="wornOrnamentDetails"
                                                  placeholder="Worn Ornament Details.."
                                                  as={Input}
                                                  invalid={errors.wornOrnamentDetails && touched.wornOrnamentDetails}
                                                />
                                                <FormFeedback>
                                                  <ErrorMessage name="wornOrnamentDetails" />
                                                </FormFeedback>
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                      </Fragment>:""

                                    }
                                  
                                  </CardBody>
                                  </Card>
                                </Row>
                                
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
                          <FormGroup>
                           <Card className="fir-card">
                             <CardHeader className="card-header-tab z-index-2 fir-card">
                             Identification marks
                             </CardHeader>
                             <CardBody>
                              <Row>
                                <Col md="5">
                                <FormGroup>
     
                                  <CardTitle>Identification Mark</CardTitle>
                                  <Field
                                    component={RSelect}
                                    name="gender"
                                    value={values.gender}
                                    onChange={ev => genderFunc(ev, setFieldValue)}
                                    options={genderData}
                                    placeholder="--Select--"
                                    error={errors.gender}
                                    touched={touched.gender}
                                  />  
                              
                                </FormGroup>
                                </Col>
                                <Col md="5">
                                <FormGroup>
                              
                                  <CardTitle>Body Part</CardTitle>
                                  <Field
                                    component={RSelect}
                                    name="maritalStatus"
                                    value={values.maritalStatus}
                                    onChange={ev => maritalStatusFunc(ev, setFieldValue)}
                                    options={maritalStatusData}
                                    placeholder="--Select--"
                                    error={errors.maritalStatus}
                                    touched={touched.maritalStatus}
                                  />  
                               
                                </FormGroup>
                                </Col>
                                <Col md="2">
                                <FormGroup>
                                <div className="btn-actions-pane-right text-capitalize" style={{paddingTop:"35px"}}>
                                  <Button 
                                    type="button"
                                    className="btn-wide mr-md-2 btn btn-info btn-md font-size-md border-0 btn-transition"
                                    onClick={aliasModal}
                                  >
                                  Add Identification Marks
                                  </Button>
                                  </div>
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
                      <CardBody>
                      <Row>
                      <Col md="12">
                        <Row>
                          <Col md="12">  
                          <FormGroup>
                          <Card className="fir-card">
                          <CardHeader className="card-header-tab z-index-2 fir-card">
                          Identity Card
                          <div className="btn-actions-pane-right text-capitalize">
                          <Button 
                            type="button"
                            className="btn-wide mr-md-2 btn btn-info btn-md font-size-md border-0 btn-transition"
                            onClick={identityModal}
                          >
                          Add Identity Card
                          </Button>
                          </div>
                          
                          </CardHeader>
                          <CardBody>
                          <Row>
                                <Col md="12">
                                <FormGroup>
                                <Card className="fir-card">
                                <CardBody>
                                  <CardTitle>List of Identity Card</CardTitle>
                                  <FormGroup>
                                  <Table striped>
                                  <thead>
                                    <tr>
                                      <th>Sl No</th>
                                      <th>ID Type</th>
                                      <th>ID Number</th>
                                      <th>Delete</th>
                                    </tr>

                                  </thead>
                                  <tbody>
                                  {
                                      identity.length>0? <Fragment>
                                        {
                                          identity.map((identitydata,i)=>{
                                            return (
                                              <tr key={i}>
                                              <td>{i+1}</td>
                                              <td>{identitydata.idType.label}</td>
                                              <td>{identitydata.idNumber}</td>
                                              <td onClick={()=>deleteIdentityFunc(identitydata.idNumber)}>delete</td>
                                            </tr>
                                            );
                                       
                                          })
                                        }
                                      </Fragment>:
                                      <Fragment><tr><td colSpan="5">No Identity Details Found</td></tr></Fragment>
                                    }      
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
                         
                      </CardBody>
                      </Card>
                      </FormGroup>            
                      </Col>
                    </Row>
                  </Col>   
                 </Row>


                 <AliasModal
                          isShowing={isShowing}
                          hide={toggle}
                          name="Alias Name"
                          size="xs"
                          aliasData={aliasDataFunc}
                        /> 
                 <AddressModal
                        isShowing={isShowingAddress}
                        hide={toggleAddress}
                        name="Address"
                        size="xl"
                        editAddress={editAddress}
                        editAddressData={editAddressData}        
                        addressData={addressDataFunc}
                        addressCount={address.length+1}
                      /> 
                 <IdentityModal
                          isShowing={isShowingIdentity}
                          hide={toggleIdentity}
                          name="Idenyity Details"
                          size="xl"     
                          identityData={identityDataFunc}
                        /> 
                 </Fragment>:""
            }

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


