import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
    Col, Row, Button, FormGroup, Label, Input, FormText,
    Container, FormFeedback, Alert, Modal, ModalBody,ModalTitle, ModalHeader, ModalFooter
} from 'reactstrap';
import RSelect from '../RSelect/RSelect';
import RSelectMulti from '../RSelectMulti/RSelectMulti';
const stateStaticOptions = [
    { value: "KL", label: "Kerala" },
    { value: "TN", label: "Tamil Nadu" },
    { value: "KA", label: "Karnataka" },
    { value: "AP", label: "Andra Pradesh" }
  ];
const parentOptions = [
    { value: "User Management", label: "User Management" },
    { value: "Menu Management", label: "Menu Management" },
    { value: "First Information Report", label: "First Information Report" },
    { value: "General Diary", label: "General Diary" }
  ];
const iconOptions = [
    { value: "pe-7s-home", label: "pe-7s-home" },
    { value: "pe-7s-users", label: "pe-7s-users" },
    { value: "pe-7s-edit", label: "pe-7s-edit" },
    { value: "pe-7s-rocket", label: "pe-7s-rocket" }
  ];
let eslno, erole,eprivilege,eofficetype,eisadminalterable,elinktorolegroup,erolegroup;
let vslno, vrole,vprivilege,vofficetype,visadminalterable,vlinktorolegroup,vrolegroup;
let initialValue=[];
let menuHeader;
const ManageRole = (props) =>{
//edit role

    eslno = props.eslno;
    erole = props.erole;
    eprivilege = props.eprivilege;
    eofficetype = props.eofficetype;
    eisadminalterable = props.eisadminalterable;
    elinktorolegroup = props.elinktorolegroup;
    erolegroup = props.erolegroup;
    // console.log("row data parentmenu ="+eparentmenu);
    var rolegroupData=[];
    var privilegeData=[];
    var officetypeData=[];

    privilegeData.push(
        {
            "value": props.eprivilege,
            "label": props.eprivilege
        })
    
    officetypeData.push(
        {
            "value": props.eofficetype,
            "label": props.eofficetype
        })   

    rolegroupData.push(
    {
        "value": props.erolegroup,
        "label": props.erolegroup
    })

//view menu
    vslno = props.vslno;
    vrole = props.vrole;
    vprivilege = props.vprivilege;
    vofficetype = props.vofficetype;
    visadminalterable = props.visadminalterable;
    vlinktorolegroup = props.vlinktorolegroup;
    vrolegroup = props.vrolegroup;

    const handleMenuIconChange = (value, setFieldValue) => {
        console.log("value of menu icon")
        // console.log(districtValue)
        setFieldValue("menuicon", value)
        console.log(value)
      };
      
    const handleMenuIconBlur = (value, setFieldTouched) => {
        console.log("hyyyy district blur")
        setFieldTouched("menuicon", true)
      };
    const handlePrivilegeChange = (value, setFieldValue) => {
        console.log("value of privilege")
        // console.log(districtValue)
        setFieldValue("privilege", value)
        // loadingValue = false;
        console.log(value)
    };

    const handlePrivilegeBlur = (value, setFieldTouched) => {
        console.log("hyyyy privilege blur")
        setFieldTouched("privilege", true)
    };

    const handleOfficeTypeChange = (value, setFieldValue) => {
        console.log("value of officetype")
        // console.log(districtValue)
        setFieldValue("officetype", value)
        // loadingValue = false;
        console.log(value)
    };

    const handleOfficeTypeBlur = (value, setFieldTouched) => {
        console.log("hyyyy officetype blur")
        setFieldTouched("officetype", true)
    };

      const handleRolegroupChange = (value, setFieldValue) => {
      console.log("value of rolegroup")
      // console.log(districtValue)
      setFieldValue("rolegroup", value)
      console.log(value)
      };
      
      const handleRolegroupBlur = (value, setFieldTouched) => {
      console.log("hyyyy rolegroup")
      setFieldTouched("rolegroup", true)
      };
      
     
      console.log("changes menu ="+props.name);
      if(props.name === "addRole"){ 
        // console.log("props value add ="+props.name);
        menuHeader = 'Add Role';
        initialValue={ role: '', privilege: '', officetype: '', isadminalterable: '', linktorolegroup: '', rolegroup: ''}
      }
    else if (props.name === "editRole"){
        // console.log("props value edit ="+props.name);
        menuHeader = 'Edit Role';
        initialValue = { role: erole, privilege:privilegeData, officetype: officetypeData, isadminalterable: eisadminalterable, linktorolegroup: elinktorolegroup, rolegroup: rolegroupData }
    }
    else if (props.name === "viewRole"){
        menuHeader = 'View Role';
        initialValue = { role: vrole, privilege:vprivilege, officetype: vofficetype, isadminalterable: visadminalterable, linktorolegroup: vlinktorolegroup, rolegroup: vrolegroup }
    }
    // console.log("initialValue ="+initialValue);

      const closeBtn = <button className="close" onClick={props.hide}>&times;</button>;
      return(
          <>
          <span className="d-inline-block mb-2 mr-2">
              <Modal isOpen={props.isShowing} toggle={props.hide} backdrop={true} size={props.size} >                            
                <ModalHeader toggle={props.hide} close={closeBtn}>{menuHeader}</ModalHeader>
                      <ModalBody>                
                       <Formik
                          initialValues={initialValue}
                          validationSchema={Yup.object({
                              role: Yup.string()
                                  .max(30, 'Invalid role')
                                  .required('Role is required')
                                  .matches(
                                    /^.[a-zA-Z0-9_]+$/,
                                    {
                                      message: 'Alphanumeric characters or underscores only',
                                      excludeEmptyString: true,
                                    },
                                  ),
                              privilege: Yup.array()
                                //   .min(2, "Pick at least 2 tags")
                                  // .max(100,"Pick at most 3 tags")
                                  .of(
                                      Yup.object().shape({
                                        //   label: Yup.string().required(),
                                        //   value: Yup.string().required()
                                      })
                                  ),
                              officetype: Yup.array()
                                //   .min(2, "Pick at least 2 tags")
                                  // .max(100,"Pick at most 3 tags")
                                  .of(
                                      Yup.object().shape({
                                        //   label: Yup.string().required(),
                                        //   value: Yup.string().required()
                                      })
                                  ),
                              isadminalterable: Yup.string()
                                  .required('is admin alterable is required'),
                              linktorolegroup: Yup.string()
                                  .required('link to role group is required'),   
                              rolegroup: Yup
                                  .string()
                                  .when("linktorolegroup", {
                                      is: "Yes",
                                      then: Yup.string().required('role group is required')
                                  }),
                                                          
                          })}
                          onSubmit={(values, { setSubmitting }) => {
                              console.log(values);
                              values.token = token;
                              setSubmitting(true);
                                                      
                          }}
      >

          {({ errors, touched, isSubmitting, dirty, resetForm, values, setFieldValue, setFieldTouched }) => (
              <Col  >
                  {props.name === "addRole" || props.name === "editRole" ? 
                      <Form>
      
                          <FormGroup row>
                          <Label for="role" sm={4}>Role</Label>
                              <Col sm={8}>
                              <Field
                                      type="text"
                                      name="role"
                                      bsSize="sm"
                                      as={Input}
                                      invalid={errors.role && touched.role} />
                                  <FormFeedback><ErrorMessage name="role" /></FormFeedback>                                 
                              </Col>                  
                          </FormGroup>
      
                          <FormGroup row>
                          <Label for="privilege" sm={4}>Privilege</Label>
                               <Col sm={8}>
                               <Field component={RSelectMulti}
                                      name="privilege"
                                      value={values.privilege}
                                      onChange={ev => handlePrivilegeChange(ev, setFieldValue)}
                                      onBlur={ev => handlePrivilegeBlur(ev, setFieldTouched)}
                                      error={errors.privilege}
                                      touched={touched.privilege}
                                      options={stateStaticOptions}
                                    //   isLoading={loadingValue}
                                />
                                </Col>
                           </FormGroup>

                           <FormGroup row>
                          <Label for="officetype" sm={4}>Officetype</Label>
                               <Col sm={8}>
                               <Field component={RSelectMulti}
                                      name="officetype"
                                      value={values.officetype}
                                      onChange={ev => handleOfficeTypeChange(ev, setFieldValue)}
                                      onBlur={ev => handleOfficeTypeBlur(ev, setFieldTouched)}
                                      error={errors.officetype}
                                      touched={touched.officetype}
                                      options={stateStaticOptions}
                                    //   isLoading={loadingValue}
                                />
                                </Col>
                           </FormGroup>
                           <FormGroup row>
                              <Label for="isadminalterable" sm={4}>Is admin alterable</Label>
                              <Col sm={8}>
                                  <Field 
                                      type="radio"
                                      name="isadminalterable"
                                      value="Yes"
                                      checked={values.isadminalterable === "Yes"}
                                      onChange={() => setFieldValue("isadminalterable", "Yes")}   
                                      invalid={errors.isadminalterable && touched.isadminalterable}        
                                  />&nbsp;Yes &nbsp;&nbsp;
                                  <Field 
                                      type="radio"
                                      name="isadminalterable"
                                      value="No"
                                      checked={values.isadminalterable === "No"}
                                      onChange={() =>  setFieldValue("isadminalterable", "No")}
                                      invalid={errors.isadminalterable && touched.isadminalterable} 
                                  />&nbsp;No &nbsp;&nbsp;
                                  <Field 
                                      type="radio"
                                      name="isadminalterable"
                                      value="Partial"
                                      checked={values.isadminalterable === "Partial"}
                                      onChange={() =>  setFieldValue("isadminalterable", "Partial")}
                                      invalid={errors.isadminalterable && touched.isadminalterable} 
                                  />&nbsp;Partial &nbsp;&nbsp;
                                {!!errors.isadminalterable && touched.isadminalterable && (
                                    <div 
                                    style={{ color: "#DC3545",fontSize:11.264, marginTop: ".4rem" }}
                                    >
                                    {errors.isadminalterable}
                                    </div>
                                )} 
                              </Col>
                          </FormGroup>
                          <FormGroup row>
                              <Label for="linktorolegroup" sm={4}>Link to Rolegroup</Label>
                              <Col sm={8}>
                                  <Field 
                                      type="radio"
                                      name="linktorolegroup"
                                      value="Yes"
                                      checked={values.linktorolegroup === "Yes"}
                                      onChange={() => setFieldValue("linktorolegroup", "Yes")}   
                                      invalid={errors.linktorolegroup && touched.linktorolegroup}        
                                  />&nbsp;Yes &nbsp;&nbsp;
                                  <Field 
                                      type="radio"
                                      name="linktorolegroup"
                                      value="No"
                                      checked={values.linktorolegroup === "No"}
                                      onChange={() =>  setFieldValue("linktorolegroup", "No")}
                                      invalid={errors.linktorolegroup && touched.linktorolegroup} 
                                  />&nbsp;No &nbsp;&nbsp;
                            {!!errors.linktorolegroup && touched.linktorolegroup && (
                                    <div 
                                    style={{ color: "#DC3545",fontSize:11.264, marginTop: ".4rem" }}
                                    >
                                    {errors.linktorolegroup}
                                    </div>
                                )} 
                                  
                              </Col>
                          </FormGroup>
                                {values.linktorolegroup === "Yes" ?
                          <FormGroup row>
                          <Label for="rolegroup" sm={4}>Rolegroup</Label>
                              <Col sm={8}>
                                  <Field component={RSelect}
                                         name="rolegroup"
                                         onChange={ev => handleRolegroupChange(ev, setFieldValue)}
                                         onBlur={ev => handleRolegroupBlur(ev, setFieldTouched)}
                                         value={values.rolegroup}
                                         error={errors.rolegroup}
                                         touched={touched.rolegroup}
                                         options={parentOptions}
                                  />
                              </Col>                  
                          </FormGroup> : values.rolegroup = [] }     
                                
                          
                          <FormGroup check row>
                              <Col sm={{ size: 0, offset: 2 }} align="center">
                                  
                                  <Button color="info" type="submit" disabled={isSubmitting}>Save</Button>
                                  <Button color="danger" type="reset">Reset</Button>
                              </Col>
      
                              
                          </FormGroup>
                          
                      </Form> 
                      :  props.name === "viewRole" ?
                      <Form>
    
                          <FormGroup row>
                          <Label for="role" sm={4}>Role</Label>
                              <Col sm={8}>
                                    <b>{vrole}</b>                      
                              </Col>                  
                          </FormGroup>
      
                          <FormGroup row>
                              <Label for="privilege" sm={4}>Privilege</Label>
                              <Col sm={8}>
                                    <b>{vprivilege}</b> 
                              </Col>
                          </FormGroup>

                          <FormGroup row>
                              <Label for="officetype" sm={4}>Office type</Label>
                              <Col sm={8}>
                                    <b>{vofficetype}</b>  
                              </Col>
                          </FormGroup>

                          <FormGroup row>
                              <Label for="isadminalterable" sm={4}>Is admin alterable</Label>
                              <Col sm={8}>
                                    <b>{visadminalterable}</b> 
                              </Col>
                          </FormGroup>

                          <FormGroup row>
                              <Label for="linktorolegroup" sm={4}>Link to rolegroup</Label>
                              <Col sm={8}>
                                    <b>{vlinktorolegroup}</b>  
                              </Col>
                          </FormGroup>
                                {values.linktorolegroup === "Yes" ?
                          <FormGroup row>
                          <Label for="rolegroup" sm={4}>Rolegroup</Label>
                              <Col sm={8}>
                                    <b>{vrolegroup}</b>  
                              </Col>                  
                          </FormGroup>: null } 
                      </Form>
                   :null   
                  }               
              </Col>
          )}
      </Formik>
                      </ModalBody>
                      <ModalFooter>
      
                      </ModalFooter>
                  </Modal> 
     </span>             
        </>
      )          
}

export default ManageRole;