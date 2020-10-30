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
import { Act,Section,MajorHead,MinorHead,FirCategory,GraveCrimeType} from '../firicon_json';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import RSelect from '../../../../components/RSelect/RSelect';
import RSelectMulti from '../../../../components/RSelectMulti/RSelectMulti';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';
import http from '../../../../services/http';
import { GET_MASTER_DATA } from '../../../../services/constants';
import {
  toast
} from 'react-toastify';
import ActSectionTable from './ActSectionTable';
export default function ActnSectionInfo() {


const [actsections, setActSections] = useState([]);
const [majorHeadData,setMajorHeadData]=useState([]);
const [majorHeadLoading,setMajorHeadLoading]=useState(false);
const [majorHead,setMajorHead]=useState('');

const [minorHeadData,setMinorHeadData]=useState([]);
const [minorHeadLoading,setMinorHeadLoading]=useState(false);
const [minorHead,setMinorHead]=useState();

const [firCategoryData,setFirCategoryData]=useState(FirCategory);
const [firCategoryChecked,setFirCategoryChecked]=useState([]);
const [firCategoryArray,setFirCategoryArray]=useState([]);
const [firCategoryLoading,setFirCategoryLoading]=useState(false);

const [graveCrimeTypeData,setGraveCrimeTypeData]=useState([]);
const [graveCrimeTypeLoading,setGraveCrimeTypeLoading]=useState(false);

const [organisedCrime,setOrganisedCrime]=useState("N");
const [graveCrime,setGraveCrime]=useState("N");

const [actSectionInfo,setActSectionInfo]=useState([]);
const [draftFir,setDraftFir]=useState([]);
var val={};
let args=[];
////////////////////////////////////

/////Major Head
useEffect(() => {
  async function getMajorHead() {
    setMajorHeadData(MajorHead);
    setMajorHeadLoading(true);
    await http({
      method: 'POST',
      url: GET_MASTER_DATA,
      data: {
        requestName: 'getAll_m_kr_grave_crime_type',
      },
    })
      .then(function (response) {
        
        setMajorHeadData(response.data);
        setMajorHeadLoading(false);
      })
      .catch(error => {
        toast(error, { position: 'top-right', type: 'error' });
        console.log(error);
        setMajorHeadLoading(false);
      });
  }

  getMajorHead();
 

},[actsections]);

/////Minor Head
useEffect(() => {
  async function getMinorHead() {
    console.log(majorHead);
    

    setMinorHeadData(MinorHead);
    setMinorHeadLoading(true);
    await http({
      method: 'POST',
      url: GET_MASTER_DATA,
      data: {
        requestName: 'getForMajorHead_m_minor_head',
        "params": [
          {
            "paramValue": majorHead.key,
          }]
      },
    })
      .then(function (response) {
        
        setMinorHeadData(response.data);
        setMinorHeadLoading(false);
      })
      .catch(error => {
        toast(error, { position: 'top-right', type: 'error' });
        console.log(error);
        setMinorHeadLoading(false);
      });
  }

  if(majorHead!=='')
    {
      getMinorHead();
    }


 

},[majorHead]);

/////fir category
// useEffect(() => {
//   async function getFirCategory() {
//     setFirCategoryData(FirCategory);
//     // setFirCategoryChecked(FirCategory);
//     setFirCategoryLoading(true);
//     await http({
//       method: 'POST',
//       url: GET_MASTER_DATA,
//       data: {
//         requestName: 'getAll_m_fir_type',
//       },
//     })
//       .then(function (response) {
//         setFirCategoryData(response.data);
//         // setFirCategoryChecked(response.data);
//         setFirCategoryLoading(false);
//       })
//       .catch(error => {
//         toast(error, { position: 'top-right', type: 'error' });
//         console.log(error);
//         setFirCategoryLoading(false);
//       });
//   }
 
//   getFirCategory();

// }, []);
/////Grave Crime Type
useEffect(() => {
  async function getGraveCrimeType() {
    setGraveCrimeTypeData(GraveCrimeType);
    setGraveCrimeTypeLoading(true);
    await http({
      method: 'POST',
      url: GET_MASTER_DATA,
      data: {
        requestName: 'getAll_m_kr_grave_crime_type',
      },
    })
      .then(function (response) {
        
        setGraveCrimeTypeData(response.data);
        setGraveCrimeTypeLoading(false);
      })
      .catch(error => {
        toast(error, { position: 'top-right', type: 'error' });
        console.log(error);
        setGraveCrimeTypeLoading(false);
      });
  }
 if(graveCrime==="Y")
 {
  getGraveCrimeType();
 }


},[graveCrime]);

// useEffect(()=>{

// },[])
///////////////////////////////////
const majorHeadFunc=(value, setFieldValue) => {
  setFieldValue('majorHead', value);
  setMajorHead(value);

};

const minorHeadFunc=(value, setFieldValue) => {
  setFieldValue('minorHead', value);
};



// const firCategoryFunc=(value, setFieldValue) => {
  
//   const target = value.currentTarget;
//   if(target.checked)
//     {
//       val = firCategoryData.filter((item) => item.label === target.value);
//       args = [...firCategoryChecked,...val];
//      setFirCategoryChecked(args);
//     }
//     else
//     {
//       val = firCategoryChecked.filter((item) => item.label !== target.value);
//       setFirCategoryChecked(val);
//     } 
//     setFieldValue('firCategory', firCategoryChecked);
// };

const firCategoryChange=(value, setFieldValue) => {
  
  const target = value.currentTarget;
  if(target.checked)
    {
      if(target.value==="Henious")
      {
        setFieldValue('isHenious',"Y")
      }

      if(target.value==="Sensitive")
      {
        setFieldValue('isSensitive',"Y")
      }
      
    }
    else
    {
      if(target.value==="Henious")
      {
        setFieldValue('isHenious',"N")
      }
      if(target.value==="Sensitive")
      {
        setFieldValue('isSensitive',"N")
      }
    }

};

// useEffect(()=>{
//   function setFirCategoryFormik(setFieldValue)
//   {
//     setFieldValue('firCategory', firCategoryChecked);
//   }
//   setFirCategoryFormik(setFieldValue)
// },[firCategoryChecked])

const organisedCrimeFunc=(value, setFieldValue) => {
  setFieldValue('organisedCrime', value.target.value);
  setOrganisedCrime(value.target.value)
  
};

const graveCrimeFunc=(value, setFieldValue) => {
  setFieldValue('graveCrime', value.target.value);
  setGraveCrime(value.target.value)
};

const graveCrimeTypeFunc=(value, setFieldValue) => {
  console.log(value);
  setFieldValue('graveCrimeType', value);
};


let initialValue={
  majorHead:"",
  minorHead:"",
  firCategory:[],
  isHenious:"N",
  isSensitive:"N",
  organisedCrime:"N",
  transnationalCrime:"N",
  graveCrime:"N",
  graveCrimeType:""
 }

const actnsectionInfoValidateSchema=Yup.object().shape({

  graveCrimeType: Yup.string()
    .when("graveCrime", {
          is: "Y",
          then: Yup.string().required("Required"),
    }),

});
const handleSubmit=(values)=>{
  alert(JSON.stringify(values,2,null))
  values.actnSection=actsections;
  delete values.firCategory;
  actSectionInfo.push(values);
  console.log(actSectionInfo);
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
              Act and Section Info
            </div>
          </CardHeader>
            
          <Formik  
           initialValues={initialValue}
           validationSchema={actnsectionInfoValidateSchema}
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
                      <ActSectionTable data={actsections} setActSections={setActSections} />
                            {/* <Col md="6">
                            <FormGroup>
                            <Card className="fir-card">
                            <CardBody>
                              <CardTitle>Act</CardTitle>
                                <FormGroup>
                                  <InputGroup>
                                  <Field
                                    component={RSelect}
                                    name="act"
                                    value={values.act}
                                    onChange={ev => actFunc(ev, setFieldValue)}
                                    options={actData}
                                    placeholder="Select Act"
                                    error={errors.act}
                                    touched={touched.act}
                                    />  
                                  <FormFeedback>
                                    <ErrorMessage name="act" />
                                  </FormFeedback>
                                  </InputGroup>
                                </FormGroup>
                            </CardBody>
                            </Card>
                            </FormGroup>
                            </Col>
                            <Col md="6">
                            <FormGroup>
                              <Card className="fir-card">
                              <CardBody>
                              <CardTitle>Section</CardTitle>
                                <FormGroup>
                                  <InputGroup>
                                  <Field
                                    component={RSelectMulti}
                                    name="section"
                                    value={values.section}
                                    onChange={ev => sectionFunc(ev, setFieldValue)}
                                    options={sectionData}
                                    placeholder="Select Section"
                                    error={errors.section}
                                    touched={touched.section}
                                    />  
                                  <FormFeedback>
                                    <ErrorMessage name="section" />
                                  </FormFeedback>
                                  </InputGroup>
                                </FormGroup>
                              </CardBody>
                              </Card>
                              </FormGroup>
                            </Col>
                             */}
                      </Row>
                      {/* <Row>
                      <Col md="12">
                        <FormGroup>
                          <Card className="fir-card">
                            <CardBody>
                            <CardTitle>Act and Section</CardTitle>
                            <Table striped>
                              <thead>
                                <tr>
                                  <th>Sl No</th>
                                  <th>Act</th>
                                  <th>Section</th>
                                  <th>Edit/Remove</th>
                                </tr>
                              </thead>
                              <tbody>
                             
                              </tbody>
                            </Table>
                            </CardBody>
                          </Card>
                        </FormGroup>
                      </Col>
                      </Row>
                       */}
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
                      <CardHeader className="card-header-tab z-index-2 fir-card">Crime Classification</CardHeader>
                      <CardBody>
                      <Row>
                            <Col md="6">
                            <FormGroup>
                            <Card className="fir-card">
                            <CardBody>
                              <CardTitle>Major Head</CardTitle>
                              <FormGroup>
                                  <InputGroup>
                                  <Field
                                    component={RSelect}
                                    name="majorHead"
                                    value={values.majorHead}
                                    onChange={ev => majorHeadFunc(ev, setFieldValue)}
                                    options={majorHeadData}
                                    placeholder="--Select--"
                                    error={errors.majorHead}
                                    touched={touched.majorHead}
                                    />  
                                  <FormFeedback>
                                    <ErrorMessage name="majorHead" />
                                  </FormFeedback>
                                  </InputGroup>
                                </FormGroup>
                            </CardBody>
                            </Card>
                            </FormGroup>
                            </Col>
                            <Col md="6">
                            <FormGroup>
                              <Card className="fir-card">
                              <CardBody>
                              <CardTitle>Minor Head</CardTitle>
                              <FormGroup>
                                  <InputGroup>
                                  <Field
                                    component={RSelect}
                                    name="minorHead"
                                    value={values.minorHead}
                                    onChange={ev => minorHeadFunc(ev, setFieldValue)}
                                    options={minorHeadData}
                                    placeholder="--Select--"
                                    error={errors.minorHead}
                                    touched={touched.minorHead}
                                    />  
                                  <FormFeedback>
                                    <ErrorMessage name="minorHead" />
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
                      <CardHeader className="card-header-tab z-index-2 fir-card">Crime Classification</CardHeader>
                      <CardBody>
                      <Row>
                        <Col md="4">
                              <FormGroup>
                                <Card className="fir-card">
                                <CardBody>
                                <CardTitle>Fir Category</CardTitle> 
                                {
                                  firCategoryData.length>0?
                                  <Fragment>
                                    {
                                      firCategoryData.map((fircategorydata, index) => {
                                        return (
                                          // console.log(fircategorydata),
                                          <FormGroup check key={index}>
                                             <Label check>
                                             <Field 
                                                  type="checkbox"
                                                  name="firCategory"
                                                  value={fircategorydata.label}
                                                  checked={values.fircategorydata}
                                                  onChange={ev => firCategoryChange(ev,setFieldValue)}      
                                              />&nbsp;{fircategorydata.label} &nbsp;&nbsp;
                                             </Label>
                                          </FormGroup>
                                        );
                                      })
                                    }
                                </Fragment>:""
                                }
                               
                                  {/* {
                                    FirCategory.map((fircategory,i)=>(
                                      <FormGroup check key={i}>
                                      <Label check>
                                      <Input type="checkbox"
                                        name="firCategory" 
                                        value={values.firCategory}
                                        onChange={ev => firCategoryChange(ev, setFieldValue)}
                                        error={errors.firCategory}
                                        touched={touched.firCategory}
                                        />
                                        {fircategory.label}
                                      </Label>
                                    </FormGroup>  
                               
                                    ))
                                  } */}
                           
                              </CardBody>
                              </Card>
                              </FormGroup>
                            </Col>
                        <Col md="4">
                          <FormGroup>
                            <Card className="fir-card">
                              <CardBody>
                                <Row>
                             
                                  <Col md="12">
                                    <FormGroup>
                                    <Card className="fir-card">
                                      <CardBody>
                                    <CardTitle>Organised Crime</CardTitle>
                                     <FormGroup check inline>
                                     <Label check>
                                        <Field 
                                            type="radio"
                                            name="organisedCrime"
                                            value="Y"
                                            checked={values.organisedCrime ==="Y"}
                                            onChange={ev => organisedCrimeFunc(ev,setFieldValue)} 
                                            // onChange={() => setFieldValue("organisedCrime", "true")}          
                                        />&nbsp;Yes &nbsp;&nbsp;
                                      </Label>
                                      <Label check>
                                            <Field 
                                                type="radio"
                                                name="organisedCrime"
                                                value="N"
                                                checked={values.organisedCrime === "N"}
                                                onChange={ev => organisedCrimeFunc(ev,setFieldValue)} 
                                                // onChange={() =>  organisedCrimeFunc("organisedCrime", "false")}
                                            />&nbsp;No &nbsp;&nbsp;
                                      </Label>
                                    </FormGroup>
                                    </CardBody>
                                   </Card>
                                   </FormGroup>
                                  </Col>   
                                 
         
                                </Row>
                                {
                                  organisedCrime==="Y"?
                                  <Row>
                                  <Col md="12">
                                <FormGroup>
                                <Card className="fir-card">
                                <CardBody>
                                <CardTitle>Transnational Crime</CardTitle>
                                 <FormGroup check inline>
                                 <Label check>

                                    <Field 
                                        type="radio"
                                        name="transnationalCrime"
                                        value="Y"
                                        checked={values.transnationalCrime === "Y"}
                                        // onChange={ev => isLink(ev,setFieldValue)} 
                                        onChange={() => setFieldValue("transnationalCrime", "Y")}          
                                    />&nbsp;Yes &nbsp;&nbsp;
                                  </Label>
                                  <Label check>
                                        <Field 
                                            type="radio"
                                            name="transnationalCrime"
                                            value="N"
                                            checked={values.transnationalCrime === "N"}
                                            // onChange={ev => isLink(ev,setFieldValue)} 
                                            onChange={() =>  setFieldValue("transnationalCrime", "N")}
                                        />&nbsp;No &nbsp;&nbsp;
                                  </Label>
                                </FormGroup>
                                </CardBody>
                               </Card>
                               </FormGroup>
                              </Col>   
                                 </Row>:""
                                }
                               
                              
                              
                              </CardBody>
                            </Card>
                          </FormGroup>
                        
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <Card className="fir-card">
                              <CardBody>
                                <Row>
                             
                                  <Col md="12">
                                    <FormGroup>
                                    <Card className="fir-card">
                                      <CardBody>
                                    <CardTitle>Grave Crime</CardTitle>
                                     <FormGroup check inline>
                                     <Label check>
                                        <Field 
                                            type="radio"
                                            name="graveCrime"
                                            value="Y"
                                            checked={values.graveCrime === "Y"}
                                            onChange={ev => graveCrimeFunc(ev,setFieldValue)} 
                                            // onChange={() => setFieldValue("linkFir", "true")}          
                                        />&nbsp;Yes &nbsp;&nbsp;
                                      </Label>
                                      <Label check>
                                            <Field 
                                                type="radio"
                                                name="graveCrime"
                                                value="N"
                                                checked={values.graveCrime === "N"}
                                                onChange={ev => graveCrimeFunc(ev,setFieldValue)} 
                                                // onChange={() =>  setFieldValue("linkFir", "false")}
                                            />&nbsp;No &nbsp;&nbsp;
                                      </Label>
                                    </FormGroup>
                                    </CardBody>
                                   </Card>
                                   </FormGroup>
                                  </Col>   
                                 
         
                                </Row>
                               {
                                 graveCrime==="Y"?
                                 <Row>                
                                 <Col md="12">
                                   <FormGroup>
                                   <Card className="fir-card">
                                   <CardBody>
                                   <CardTitle>Type of Grave Crime</CardTitle>
                                   <FormGroup>
                                   <InputGroup>
                                   <Field
                                     component={RSelect}
                                     name="graveCrimeType"
                                     value={values.graveCrimeType}
                                     onChange={ev => graveCrimeTypeFunc(ev, setFieldValue)}
                                     options={graveCrimeTypeData}
                                     placeholder="--Select--"
                                     error={errors.graveCrimeType}
                                     touched={touched.graveCrimeType}
                                     />  
                                   <FormFeedback>
                                     <ErrorMessage name="graveCrimeType" />
                                   </FormFeedback>
                                   </InputGroup>
                                 </FormGroup>
                                   </CardBody>
                                   </Card>
                                   </FormGroup>
                                 </Col>   
                                 </Row>:""
                               }
                                
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


