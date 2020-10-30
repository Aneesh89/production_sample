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
let eslno, eroles,eprivilege,eofficetype,erolegroup;
let vslno, vroles,vprivilege,vofficetype,vrolegroup;
let initialValue=[];
let menuHeader;
const ManageRolegroup = (props) =>{
//edit role

    eslno = props.eslno;
    erolegroup = props.erolegroup;
    eprivilege = props.eprivilege;
    eofficetype = props.eofficetype;  
    eroles = props.eroles;
 
    // console.log("row data parentmenu ="+eparentmenu);
    var roleData=[];
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

    roleData.push(
    {
        "value": props.eroles,
        "label": props.eroles
    })

//view menu
    vslno = props.vslno;
    vrolegroup = props.vrolegroup;
    vprivilege = props.vprivilege;
    vofficetype = props.vofficetype;
    vroles = props.vroles;

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
        setFieldTouched("privilege", "true")
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
        setFieldTouched("officetype", "true")
    };

      const handleRolesChange = (value, setFieldValue) => {
      console.log("value of roles")
      // console.log(districtValue)
      setFieldValue("roles", value)
      console.log(value)
      };
      
      const handleRolesBlur = (value, setFieldTouched) => {
      console.log("hyyyy roles")
      setFieldTouched("roles", "true")
      };
      
     
      console.log("changes menu ="+props.name);
      if(props.name === "addRolegroup"){ 
        // console.log("props value add ="+props.name);
        menuHeader = 'Add Rolegroup';
        initialValue={ rolegroup: '', privilege: '', officetype: '', roles: ''}
      }
    else if (props.name === "editRolegroup"){
        // console.log("props value edit ="+props.name);
        menuHeader = 'Edit Rolegroup';
        initialValue = { rolegroup: erolegroup, privilege:privilegeData, officetype: officetypeData, roles: roleData}
    }
    else if (props.name === "viewRolegroup"){
        menuHeader = 'View Rolegroup';
        initialValue = { rolegroup: vrolegroup, privilege:vprivilege, officetype: vofficetype, roles: vroles}
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
                              rolegroup: Yup.string()
                                  .max(50, 'Invalid rolegroup')
                                  .required('Rolegroup is required'),
                              privilege: Yup.array()
                                //   .min(2, "Pick at least 2 tags")
                                  .of(
                                      Yup.object().shape({
                                        //   label: Yup.string().required(),
                                        //   value: Yup.string().required()
                                      })
                                  ),
                              officetype: Yup.array()
                                //   .min(2, "Pick at least 2 tags")
                                  .of(
                                      Yup.object().shape({
                                        //   label: Yup.string().required(),
                                        //   value: Yup.string().required()
                                      })
                                  ),
                              roles: Yup.array()
                                //   .min(2, "Pick at least 2 tags")
                                  // .max(100,"Pick at most 3 tags")
                                  .required('Roles is required')
                                  .of(
                                      Yup.object().shape({
                                          label: Yup.string().required(),
                                          value: Yup.string().required()
                                      })
                                  ),
                                                          
                          })}
                          onSubmit={(values, { setSubmitting }) => {
                              console.log(values);
                              values.token = token;
                              setSubmitting(true);
                                                      
                          }}
      >

          {({ errors, touched, isSubmitting, dirty, resetForm, values, setFieldValue, setFieldTouched }) => (
              <Col  >
                  {props.name === "addRolegroup" || props.name === "editRolegroup" ? 
                      <Form>
      
                          <FormGroup row>
                          <Label for="role" sm={4}>Rolegroup</Label>
                              <Col sm={8}>
                              <Field
                                      type="text"
                                      name="rolegroup"
                                      bsSize="sm"
                                      as={Input}
                                      invalid={errors.rolegroup && touched.rolegroup} />
                                  <FormFeedback><ErrorMessage name="rolegroup" /></FormFeedback>                                 
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
                           <Label for="roles" sm={4}>Roles</Label>
                               <Col sm={8}>
                               <Field component={RSelectMulti}
                                      name="roles"
                                      value={values.roles}
                                      onChange={ev => handleRolesChange(ev, setFieldValue)}
                                      onBlur={ev => handleRolesBlur(ev, setFieldTouched)}
                                      error={errors.roles}
                                      touched={touched.roles}
                                      options={stateStaticOptions}
                                    //   isLoading={loadingValue}
                                />
                                </Col>
                           </FormGroup>
                           
                                
                          
                          <FormGroup check row>
                              <Col sm={{ size: 0, offset: 2 }} align="center">
                                  
                                  <Button color="info" type="submit" disabled={isSubmitting}>Save</Button>
                                  <Button color="danger" type="reset" >Reset</Button>
                              </Col>
      
                              
                          </FormGroup>
                          
                      </Form> 
                      :  props.name === "viewRolegroup" ?
                      <Form>
    
                          <FormGroup row>
                          <Label for="rolegroup" sm={4}>Rolegroup</Label>
                              <Col sm={8}>
                                    <b>{vrolegroup}</b>                      
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
                          <Label for="roles" sm={4}>Roles</Label>
                              <Col sm={8}>
                                    <b>{vroles}</b>  
                              </Col>                  
                          </FormGroup> 
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

export default ManageRolegroup;