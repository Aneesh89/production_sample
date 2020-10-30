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
import SourceInfo from "./sourceInfo";
import FirInfoModal from "./firInfoModal";
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
export default function FirInfo() {

/////////////////constants///////////////////////
const { isShowing, toggle } = useModal();
const [typeOfInfoLoading,setTypeOfInfoLoading]=useState(false);
const [typeOfInfoData,setTypeOfInfoData]=useState();
const [sourceOfComplaintLoading,setSourceOfComplaintLoading]=useState(false);
const [sourceOfComplaintData,setSourceOfComplaintData]=useState();
const [source,setSource]=useState("");
const [sourceData,setSourceData]=useState([]);
const [sourceLoading,setSourceLoading]=useState(false);
const [link,setLink]=useState(false);
const [linkRegTypeData,setLinkRegTypeData] = useState();
const [linkRegTypeLoading,setLinkRegTypeLoading] = useState(false);
const [linkRegType,setLinkRegType] = useState('');
const [linkRegTypeContentData,setLinkRegTypeContentData] = useState();
const [linkRegTypeContentLoading,setLinkRegTypeContentLoading] = useState(false);
const [linkRegSelected,setLinkRegSelected] = useState([]);

const [linkData,setLinkData]=useState([]);
const [linkContent,setLinkContent]=useState([]);
const [firInfo,setFirInfo]=useState([]);
const [draftFir,setDraftFir]=useState([]);
///////////////////////////////////////////////////

////////////////master data request////////////////
///// Type of information
  useEffect(() => {
    async function getTypeOfInfo() {
      setTypeOfInfoData(TypeofInfo);
      setTypeOfInfoLoading(true);
      await http({
        method: 'POST',
        url: GET_MASTER_DATA,
        data: {
          requestName: 'getAll_m_information_type',
        },
      })
        .then(function (response) {
          setTypeOfInfoData(response.data);
          setTypeOfInfoLoading(false);
        })
        .catch(error => {
          toast(error, { position: 'top-right', type: 'error' });
          console.log(error);
          setTypeOfInfoLoading(false);
        });
    }
    getTypeOfInfo();
  }, []);
/////Source Of Complaint
useEffect(() => {
  async function getSourceOfComplaint() {
    setSourceOfComplaintData(SourceofComplaint);
    setSourceOfComplaintLoading(true);
    await http({
      method: 'POST',
      url: GET_MASTER_DATA,
      data: {
        requestName: 'getAll_m_information_source',
      },
    })
      .then(function (response) {
        // console.log(response.data)
        setSourceOfComplaintData(response.data);
        setSourceOfComplaintLoading(false);
      })
      .catch(error => {
        toast(error, { position: 'top-right', type: 'error' });
        console.log(error);
        setSourceOfComplaintLoading(false);
      });
  }
  getSourceOfComplaint();
}, []);

/////Selected Source of Complaint Data
useEffect(()=>{
  if(source==="Cognizance by Police")
  {
    setSourceData(SourceOfficerData);
  }
  else if(source==="Court")
  {
    setSourceData(SourceCourtData);
    async function getSourceOfInfo() {
      setSourceLoading(true);
      await http({
        method: 'POST',
        url: GET_MASTER_DATA,
        data: {
          requestName: 'getAll_m_court_type',
        },
      })
        .then(function (response) {
          console.log(response.data)
          setSourceData(response.data);
          setSourceLoading(false);
        })
        .catch(error => {
          toast(error, { position: 'top-right', type: 'error' });
          console.log(error);
          setSourceLoading(false);
        });
    }
    getSourceOfInfo();
  }
},[source]);

/////Fir link Registratio Type Data
useEffect(() => {
  async function getLinkRegType() {
    // console.log("hyyyy");
    setLinkRegTypeData(LinktoRegType);
    setLinkRegTypeLoading(true);
    await http({
      method: 'POST',
      url: GET_MASTER_DATA,
      data: {
        requestName: 'getAll_m_fir_linked_to',
      },
    })
      .then(function (response) {
        // console.log(response.data)
        setLinkRegTypeData(response.data);
        setLinkRegTypeLoading(false);
      })
      .catch(error => {
        toast(error, { position: 'top-right', type: 'error' });
        console.log(error);
        setLinkRegTypeLoading(false);
      });
  }
  if(link==="true")
  {
    getLinkRegType();
  }

}, [link]);

/////Link reg type content data
useEffect(()=>{

  async function getLinkRegTypeContent() {
    // console.log("hyyyy");
    setLinkRegTypeContentData(LinkRegTypeContent);
    // setLinkRegTypeContentLoading(true);
    toggle();
    console.log("toggle");

    // setLinkRegTypeLoading(true);
    // await http({
    //   method: 'POST',
    //   url: GET_MASTER_DATA,
    //   data: {
    //     requestName: 'getAll_m_information_source',
    //   },
    // })
    //   .then(function (response) {
    //     // console.log(response.data)
    //     setLinkRegTypeData(response.data);
    //     setLinkRegTypeLoading(false);
    //   })
    //   .catch(error => {
    //     toast(error, { position: 'top-right', type: 'error' });
    //     console.log(error);
    //     setLinkRegTypeLoading(false);
    //   });
  }
  if(linkRegType!=='')
  {
    getLinkRegTypeContent();
  }
},[linkRegType]);
/////////////////////////////////////////////////////



///////////////set field value///////////////////////

/////type of info
const typeOfInfoFunc=(value, setFieldValue) => {
  setFieldValue('typeOfInfo', value);
};

/////is zero fir
const isZeroFirFunc = (value, setFieldValue) => {
  setFieldValue("isZeroFir", value.target.value)
};

/////source of complaint
const sourceSelectedFunc = (value, setFieldValue) => {
  setFieldValue('sourceOfComplaint', value);
  setSource(value.label);
  // console.log(value)
}; 

/////Source Officer Info
const sourceOfficerFunc=(value, setFieldValue)=>{ 
  setFieldValue('sourceOfficerInfo', value);
}

/////Source Court Info
const sourceCourtTypeFunc=(value, setFieldValue)=>{
  setFieldValue('sourceCourtTypeInfo', value);
}

/////Link Fir
const isLinkFunc = (value, setFieldValue) => {
  setFieldValue("linkFir", value.target.value)
  setLink(value.target.value);
};

/////Link to reg type selected type(eg:murder)
const linktoRegTypeFunc = (value, setFieldValue) => {
  setFieldValue("linkToRegType", value);
  setLinkRegType(value.value);
}; 

/////link to reg type data selected
const linkRegSelectedDataFunc=(value)=>
{
  console.log(value);
  setLinkRegSelected(value);
  setLinkRegType('');
}

/////unlink reg type selected
const unLinkRegData=(e)=>{
  const id = parseInt(e.target.id);
  setLinkData(linkData.filter(item => !item.id.includes(id)));
}


useEffect(()=>{   
  if(linkRegTypeContentData!=null)
  {
    setLinkData(linkRegTypeContentData.filter(d => linkRegSelected.includes(d.id)))
  }

},[linkRegSelected]);
  




const saveFir=()=>{
  console.log("hy");
}

let initialValue={
      briefOfFir:"",
      typeOfInfo:"",
      isZeroFir:"false",
      sourceOfComplaint:"",
      sourceOfficerInfo:"",
      sourceCourtTypeInfo:"",
      nameOfCourt:"",
      courtReferenceNo:"",
      sourceOfComplaintDetails:"",
      linkFir:"false",
      linkToRegType: "",
 }

 const firInfoValidateSchema = Yup.object().shape({
        briefOfFir: Yup.string()
          .required("Required"),
        typeOfInfo: Yup.string()
          .required("Required"),
        linkFir:Yup.string(),
        linkToRegType: Yup.string()
          .when("linkFir", {
                is: "true",
                then: Yup.string().required("Required"),
          }),
        sourceOfComplaint:Yup.string()
          .required("Required"),
        sourceOfficerInfo: Yup.string()
            .when('sourceOfComplaint', {
            is: 'Cognizance by Police',
            then: Yup.string().required("Required"),
         }),
        // sourceCourtTypeInfo:Yup.string()
        //     .when('$sourceOfComplaint', (sourceOfComplaint, firInfoValidateSchema) => (sourceOfComplaint === 'Court' ? firInfoValidateSchema : firInfoValidateSchema.required("Required"))),
        
        // sourceOfficerInfo: Yup.lazy((sourceOfComplaint)=>{
        //   switch (sourceOfComplaint.label) {
        //       case 'Cognizance by Police':
        //         return Yup.string().required("Required")
        //   }
        // }),           
        //  sourceCourtTypeInfo: Yup.string()
        //     .when('sourceOfComplaint', {
        //     is: val=>{return val==="Court"} ,
        //     then: Yup.string().required("Required"),
        //     otherwise:Yup.string().notRequired,   
        //  }),
         
        
      });

const handleSubmit=(values,{setSubmitting})=>{
  // const submitValues=[...values,linkData];
  // setDraftFir(values);
   values.linkData=linkData;
   delete values.linkToRegType;
    firInfo.push(values);
    
    console.log(firInfo);
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
              <Col md="6">
                      <FormGroup>
                        <Card className="fir-card">
                        <CardBody>
                        <CardTitle>Brief of Fir</CardTitle>
                          <FormGroup>
                            <InputGroup>
                            <Field
                              type="textarea" 
                              rows="1" 
                              id="briefOfFir" 
                              name="briefOfFir"
                              placeholder="Brief of Fir.."
                              as={Input}
                              invalid={errors.briefOfFir && touched.briefOfFir}
                            />
                            <FormFeedback>
                              <ErrorMessage name="briefOfFir" />
                            </FormFeedback>
                            </InputGroup>
                          </FormGroup>
                        </CardBody>
                        </Card>
                      </FormGroup>
                </Col>
                <Col md="3">
                <FormGroup>   
                        <Card className="fir-card" style={{height:"100px !important"}}>
                        <CardBody>
                        <CardTitle>Type of information</CardTitle>
                           <Field
                              component={RSelect}
                              name="typeOfInfo"
                              value={values.typeOfInfo}
                              onChange={ev => typeOfInfoFunc(ev, setFieldValue)}
                              options={typeOfInfoData}
                              placeholder="--Select--"
                              error={errors.typeOfInfo}
                              touched={touched.typeOfInfo}
                              />  
                          </CardBody>
                          </Card>
                      </FormGroup> 
                </Col>
                <Col md="3">
                <FormGroup> 
                        <Card className="fir-card">
                        <CardBody>
                        <CardTitle>Is Zero Fir</CardTitle>
                        <FormGroup check inline>
                            <Label check>
                                  <Field 
                                      type="radio"
                                      name="isZeroFir"
                                      value="true"
                                      checked={values.isZeroFir === "true"}
                                      onChange={ev => isZeroFirFunc(ev,setFieldValue)} 
                                      // onChange={() => setFieldValue("linkFir", "true")}          
                                  />&nbsp;Yes &nbsp;&nbsp;
                            </Label>
                            <Label check>
                                  <Field 
                                      type="radio"
                                      name="isZeroFir"
                                      value="false"
                                      checked={values.isZeroFir === "false"}
                                      onChange={ev => isZeroFirFunc(ev,setFieldValue)} 
                                      // onChange={() =>  setFieldValue("linkFir", "false")}
                                  />&nbsp;No &nbsp;&nbsp;
                            </Label>
                          </FormGroup>
                        </CardBody>
                        </Card>
                      </FormGroup> 
                </Col>
                </Row>
                <Row>
                  <Col md="6">
                  <Row>
                    <Col md="12">
                    <FormGroup tag="fieldset">  
                    <Card className="fir-card">
                    <CardBody>
                    <FormGroup>
                    <Card className="fir-card">
                    <CardBody>
                    <Row>
                      <Col md="6">
                           <CardTitle>Link Fir</CardTitle>
                          <FormGroup check inline>
                            <Label check>
                                  <Field 
                                      type="radio"
                                      name="linkFir"
                                      value="true"
                                      checked={values.linkFir === "true"}
                                      onChange={ev => isLinkFunc(ev,setFieldValue)}      
                                  />&nbsp;Yes &nbsp;&nbsp;
                            </Label>
                            <Label check>
                                  <Field 
                                      type="radio"
                                      name="linkFir"
                                      value="false"
                                      checked={values.linkFir === "false"}
                                      onChange={ev => isLinkFunc(ev,setFieldValue)} 
                                  />&nbsp;No &nbsp;&nbsp;
                            </Label>
                          </FormGroup>
                      </Col>  
                      <Col md="6">
                 
                          {
                            link==="true"?
                              <>
                              <CardTitle>Select Registration Type</CardTitle>
                              <FormGroup>
                              <Field
                                component={RSelect}
                                name="linkToRegType"
                                // value={values.linkToRegType}
                                value={null}
                                onChange={ev => linktoRegTypeFunc(ev, setFieldValue)}
                                options={linkRegTypeData}
                                error={errors.linkToRegType}
                                touched={touched.linkToRegType}
                                placeholder="--Select--"
                              />
                              </FormGroup>
                               </>:''                
                          }
                      </Col>
                    </Row>
                    </CardBody>
                    </Card>
                    </FormGroup>

                    {
                    link==="true"? <>
                    <Row>
                    <Col md="12">
                      <FormGroup>
                        <Card className="fir-card">
                          <CardBody>
                          <CardTitle>Registrations linked to FIR</CardTitle>
                          <Table striped>
                            <thead>
                              <tr>
                                <th>Sl No</th>
                                <th>Type of Registration</th>
                                <th>Registration Number</th>
                                <th>Date of Registration</th>
                                <th>UnLink</th>
                              </tr>
                            </thead>
                            <tbody>
                            {
                                   
                              linkData.length>0 ?
                                <Fragment>
                                  {
                                    linkData.map((linkData,i)=>(
                                      <tr key={i}>
                                      <td>{i+1}</td>
                                      <td>{linkData.registrationType}</td>
                                      <td>{linkData.registrationNumber}</td>
                                      <td>{linkData.dateOfRegistration}</td>
                                      <td><Button className="btn-danger" id={linkData.id} name="unlinkBtn" onClick={unLinkRegData}>UnLink</Button></td>
                                      </tr> 
                                      ))
                                  }
                                </Fragment>:
                                <Fragment>
                                <tr><td colSpan="5">No Registrations Linked</td></tr>
                                </Fragment>
                            }
                            </tbody>
                          </Table>
                          </CardBody>
                        </Card>
                      </FormGroup>
                    </Col>
                    </Row></>
                    :''
                    }
                    </CardBody>
                    </Card>
                    </FormGroup>
                    </Col>
                  </Row>
                  </Col>   
                  <Col md="6">
                    <Row>
                      <Col md="12">
                      <FormGroup>
                        <Card className="fir-card">
                        <CardBody>
                        <CardTitle>Source of Complaint</CardTitle>
                        <FormGroup>

                        <Field
                                component={RSelect}
                                name="sourceOfComplaint"
                                // value={values.sourceOfComplaint}
                                onBlur={() => setFieldTouched("sourceOfComplaint", true)}
                                onChange={ev => sourceSelectedFunc(ev, setFieldValue)}
                                options={sourceOfComplaintData}
                                placeholder="--Select--"
                                error={errors.sourceOfComplaint}
                                touched={touched.sourceOfComplaint}
                        />

                        </FormGroup>


                        { 
      (() => {
      switch (source) {
             case "Cognizance by Police":
                     return (
                     <Fragment>
                        <Row>
                          <Col md="12">
                            <CardTitle>
                              Officer Details
                            </CardTitle>  
                            <FormGroup>  
                            <Field
                                component={RSelect}
                                name="sourceOfficerInfo"
                                value={values.sourceOfficerInfo}
                                onChange={ev => sourceOfficerFunc(ev, setFieldValue)}
                                options={sourceData}
                                placeholder="--Select--"
                                error={errors.sourceOfficerInfo}
                                touched={touched.sourceOfficerInfo}
                              />
                            </FormGroup>  
                          </Col>
                        </Row>
                     </Fragment>
                     
                     )
             case "Court":
                     return (
                      <Fragment>
                      <FormGroup>
                      <Row>
                         <Col md="12">
                            <FormGroup>
                               <CardTitle>
                               Type of Court
                              </CardTitle> 
                              <Field
                                component={RSelect}
                                name="sourceCourtTypeInfo"
                                value={values.sourceCourtTypeInfo}
                                onChange={ev => sourceCourtTypeFunc(ev, setFieldValue)}
                                options={sourceData}
                                placeholder="--Select--"
                                error={errors.sourceCourtTypeInfo}
                                touched={touched.sourceCourtTypeInfo}
                             />

                            </FormGroup>
                        </Col>
                        </Row>
                        <Row>
                        <Col md="6">
                        <FormGroup>
                            <CardTitle>
                            Name of Court
                              </CardTitle>
                                <InputGroup>
                                <Field
                                  type="text" 
                                  name="nameOfCourt"
                                  placeholder="Name of Court"
                                  as={Input}
                                  invalid={errors.nameOfCourt && touched.nameOfCourt}
                                />
                                <FormFeedback>
                                  <ErrorMessage name="nameOfCourt" />
                                </FormFeedback>
                                </InputGroup>
                            </FormGroup>  
                        </Col>
                        <Col md="6">
                        <FormGroup>
                            <CardTitle>
                            Court Reference No
                              </CardTitle>
                              <InputGroup>
                                <Field
                                  type="text" 
                                  name="courtReferenceNo"
                                  placeholder="Court Reference No"
                                  as={Input}
                                  invalid={errors.courtReferenceNo && touched.courtReferenceNo}
                                />
                                <FormFeedback>
                                  <ErrorMessage name="courtReferenceNo" />
                                </FormFeedback>
                                </InputGroup>
                            </FormGroup>  
                            </Col>
                  </Row>
                  </FormGroup>  
                  </Fragment>
                     
                     )
             default:
                     return (
                    <Fragment>
                    <Row>
                    <Col md="12">
                      <FormGroup>      
                        <CardTitle>
                          Details
                        </CardTitle> 
                            <InputGroup>
                            <Field
                              type="textarea" 
                              rows="1"
                              name="sourceOfComplaintDetails"
                              placeholder="Details"
                              as={Input}
                              invalid={errors.sourceOfComplaintDetails && touched.sourceOfComplaintDetails}
                            />
                            <FormFeedback>
                              <ErrorMessage name="sourceOfComplaintDetails" />
                            </FormFeedback>
                            </InputGroup>
                      </FormGroup>  
                    </Col>
                    </Row>
                    </Fragment>
                     )

      }
      })()
      }


                          {/* <SourceInfo 
                            sourceInfo={source}
                            sourceDataInfo={sourceData}
                            value={values.sourceInfoValue}
                            onChange={ev => sourceDataFunc(ev, setFieldValue)}
                            CourtName={ev=> sourceCourtDataFunc(ev, setFieldValue)}
                          /> */}
                        </CardBody>
                        </Card>
                      </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <FirInfoModal
                  isShowing={isShowing}
                  hide={toggle}
                  name="Link Fir to Registration"
                  size="xl"
                  linkRegTypeContentData={linkRegTypeContentData}
                  linkRegSelectedData={linkRegSelectedDataFunc}
                />        
             
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
