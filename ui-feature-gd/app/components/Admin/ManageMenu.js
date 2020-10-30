import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
    Col, Row, Button, FormGroup, Label, Input, FormText,
    Container, FormFeedback, Alert, Modal, ModalBody,ModalTitle, ModalHeader, ModalFooter
} from 'reactstrap';
import RSelect from '../RSelect/RSelect';
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
let eslno, eparentmenu,emenuicon,emenuname,emenutype,emenudisplay,emenuto,emenucomponent;
let vslno, vparentmenu,vmenuicon,vmenuname,vmenutype,vmenudisplay,vmenuto,vmenucomponent;
let initialValue=[];
let menuHeader;
const ManageMenu = (props) =>{
//edit menu
    eslno = props.eslno;
    eparentmenu = props.eparentmenu;
    emenuicon = props.emenuicon;
    emenuname = props.emenuname;
    emenutype = props.emenutype;
    emenudisplay = props.emenudisplay;
    emenuto = props.emenuto;
    emenucomponent = props.emenucomponent;             
    console.log("row data parentmenu ="+eparentmenu);
    var parentData=[];
    var iconData=[];
    parentData.push(
    {
        "value": props.eparentmenu,
        "label": props.eparentmenu
    })

//view menu
    vslno = props.vslno;
    vparentmenu = props.vparentmenu;
    vmenuicon = props.vmenuicon;
    vmenuname = props.vmenuname;
    vmenutype = props.vmenutype;
    vmenudisplay = props.vmenudisplay;
    vmenuto = props.vmenuto;
    vmenucomponent = props.vmenucomponent;
    const alpha_text_only ='Alphabet, numer and underscore only';
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
      
      const handleParentMenuChange = (value, setFieldValue) => {
      console.log("value of parent menu")
      // console.log(districtValue)
      setFieldValue("parentmenu", value)
      console.log(value)
      };
      
      const handleParentMenuBlur = (value, setFieldTouched) => {
      console.log("hyyyy parent menu")
      setFieldTouched("parentmenu", true)
      };
      
      const handlePrivilegeChange = (value, setFieldValue) => {
      console.log("value of privilege")
      setFieldValue("privilege", value)
      console.log(value)
      };
      
      const handlePrivilegeBlur = (value, setFieldTouched) => {
      console.log("hyyyy privilege blur")
      setFieldTouched("privilege", true)
      };  
      console.log("changes menu ="+props.name);
      if(props.name === "addMenu"){ 
        // console.log("props value add ="+props.name);
        menuHeader = 'Add Menu';
        initialValue={ menuicon: '', menuname: '', menutype: '', menudisplay: '', menuto: '', menucomponent: '',parentmenu: '', privilege: '' }
      }
    else if (props.name === "editMenu"){
        // console.log("props value edit ="+props.name);
        menuHeader = 'Edit Menu';
        initialValue = { menuicon: emenuicon, menuname:emenuname, menutype: emenutype, menudisplay: emenudisplay, menuto: emenuto, menucomponent: emenucomponent,parentmenu: parentData, privilege: '' }
    }
    else if (props.name === "viewMenu"){
        menuHeader = 'View Menu';
        initialValue = { menuicon: vmenuicon, menuname:vmenuname, menutype: vmenutype, menudisplay: vmenudisplay, menuto: vmenuto, menucomponent: vmenucomponent,parentmenu: vparentmenu, privilege: '' }
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
                              menuicon: Yup.string(),
                                  // .required('menu icon is required'),
                              menuname: Yup.string()
                                  .max(250, 'Invalid menuname')
                                  .required('menu name is required')
                                  .matches(
                                    /^.[a-zA-Z0-9_]+$/,
                                    {
                                      message: alpha_text_only,
                                      excludeEmptyString: true,
                                    },
                                  ),
                              menutype: Yup.string()
                                  // .max(20, 'Invalid securitycode')
                                  .required('menu type is required'),   
                              parentmenu: Yup
                                  .string()
                                  .when("menutype", {
                                      is: "Child",
                                      then: Yup.string().required('parent menu is required')
                                  }),
                              menudisplay: Yup.string()
                                  // .max(20, 'Invalid username')
                                  .required('menu display is required'),
                              menuto: Yup.string()
                                  .max(250, 'Invalid menu to')
                                  .required('menu to is required')
                                  .matches(
                                    /^.[a-zA-Z0-9_]+$/,
                                    {
                                      message: alpha_text_only,
                                      excludeEmptyString: true,
                                    },
                                  ),
                              menucomponent: Yup.string()
                                  .max(150, 'Invalid menu component')
                                  .required('menu component is required')
                                  .matches(
                                    /^.[a-zA-Z0-9_]+$/,
                                    {
                                      message: alpha_text_only,
                                      excludeEmptyString: true,
                                    },
                                  ),                                        
                              privilege: Yup.string()
                                  .required('privilege is required')
      
                          })}
                          onSubmit={(values, { setSubmitting }) => {
                              console.log(values);
                              // alert(values);
                              values.token = token;
                              setSubmitting(true);
                                                      
                          }}
      >
          {({ errors, touched, isSubmitting, dirty, resetForm, values, setFieldValue, setFieldTouched }) => (
              <Col  >
                  {props.name === "addMenu" || props.name === "editMenu" ? 
                      <Form>
      
                          <FormGroup row>
                          <Label for="menuicon" sm={4}>Menu Icon</Label>
                              <Col sm={8}>
                              <Field
                                      type="text"
                                      name="menuicon"
                                      bsSize="sm"
                                      as={Input}
                                      invalid={errors.menuicon && touched.menuicon} />
                                  <FormFeedback><ErrorMessage name="menuicon" /></FormFeedback>                                 
                              </Col>                  
                          </FormGroup>
      
                          <FormGroup row>
                              <Label for="menuname" sm={4}>menu name</Label>
                              <Col sm={8}>
                                  <Field
                                      type="text"
                                      name="menuname"
                                      bsSize="sm"
                                    //   readOnly = {true}
                                      as={Input}
                                      invalid={errors.menuname && touched.menuname} />
                                  <FormFeedback><ErrorMessage name="menuname" /></FormFeedback>
                              </Col>
                          </FormGroup>
      
                          <FormGroup row>
                              <Label for="menutype" sm={4}>menu type</Label>
                              <Col sm={8}>
                                  <Field 
                                      type="radio"
                                      name="menutype"
                                      value="Parent"
                                      // defaultChecked 
                                      checked={values.menutype === "Parent"}
                                      onChange={() => setFieldValue("menutype", "Parent")}   
                                      invalid={errors.menutype && touched.menutype}        
                                  />&nbsp;Parent &nbsp;&nbsp;
                                  <Field 
                                      type="radio"
                                      name="menutype"
                                      value="Child"
                                      checked={values.menutype === "Child"}
                                      onChange={() =>  setFieldValue("menutype", "Child")}
                                      invalid={errors.menutype && touched.menutype} 
                                  />&nbsp;Child &nbsp;&nbsp;
                            {!!errors.menutype && touched.menutype && (
                                    <div 
                                    style={{ color: "#DC3545",fontSize:11.264, marginTop: ".4rem" }}
                                    >
                                    {errors.menutype}
                                    </div>
                                )} 
                                  
                              </Col>
                          </FormGroup>
                                {values.menutype === "Child" ?
                          <FormGroup row>
                          <Label for="parentmenu" sm={4}>Parent Menu</Label>
                              <Col sm={8}>
                                  <Field component={RSelect}
                                         name="parentmenu"
                                         onChange={ev => handleParentMenuChange(ev, setFieldValue)}
                                         onBlur={ev => handleParentMenuBlur(ev, setFieldTouched)}
                                         value={values.parentmenu}
                                         error={errors.parentmenu}
                                         touched={touched.parentmenu}
                                         options={parentOptions}
                                        //  readOnly = {true}
                                        //  isLoading={loadingDistrictValue}
                                  />
                              </Col>                  
                          </FormGroup> : values.parentmenu = "" }
      
                                <FormGroup row>
                              <Label for="menudisplay" sm={4}>menu display</Label>
                              <Col sm={8}>
                                  <Field 
                                      type="radio"
                                      name="menudisplay"
                                      value="Yes"
                                      // defaultChecked 
                                      checked={values.menudisplay === "Yes"}
                                      onChange={() => setFieldValue("menudisplay", "Yes")}   
                                      invalid={errors.menudisplay && touched.menudisplay}        
                                  />&nbsp;Yes &nbsp;&nbsp;
                                  <Field 
                                      type="radio"
                                      name="menudisplay"
                                      value="No"
                                      checked={values.menudisplay === "No"}
                                      onChange={() =>  setFieldValue("menudisplay", "No")}
                                      invalid={errors.menudisplay && touched.menudisplay} 
                                  />&nbsp;No &nbsp;&nbsp;
                                {!!errors.menudisplay && touched.menudisplay && (
                                    <div 
                                    style={{ color: "#DC3545",fontSize:11.264, marginTop: ".4rem" }}
                                    >
                                    {errors.menudisplay}
                                    </div>
                                )} 
                              </Col>
                          </FormGroup>
                          <FormGroup row>
                              <Label for="menuto" sm={4}>menu to</Label>
                              <Col sm={8}>
                                  <Field
                                      type="text"
                                      name="menuto"
                                      bsSize="sm"
                                      as={Input}
                                      invalid={errors.menuto && touched.menuto} />
                                  <FormFeedback><ErrorMessage name="menuto" /></FormFeedback>
                              </Col>
                          </FormGroup>
      
                          <FormGroup row>
                              <Label for="menucomponent" sm={4}>menu component</Label>
                              <Col sm={8}>
                                  <Field
                                      type="text"
                                      name="menucomponent"
                                      bsSize="sm"
                                      as={Input}
                                      invalid={errors.menucomponent && touched.menucomponent} />
                                  <FormFeedback><ErrorMessage name="menucomponent" /></FormFeedback>
                              </Col>
                          </FormGroup>                   
                         
      
                          <FormGroup row>
                          <Label for="privilege" sm={4}>Privilege</Label>
                              <Col sm={8}>
                                  <Field component={RSelect}
                                         name="privilege"
                                         onChange={ev => handlePrivilegeChange(ev, setFieldValue)}
                                         onBlur={ev => handlePrivilegeBlur(ev, setFieldTouched)}
                                         value={values.privilege}
                                         error={errors.privilege}
                                         touched={touched.privilege}
                                         options={stateStaticOptions}
                                        //  isLoading={loadingDistrictValue}
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
                      :  props.name === "viewMenu" ?
                      <Form>
      
                          <FormGroup row>
                          <Label for="menuicon" sm={4}>Menu Icon</Label>
                              <Col sm={8}>
                                    <b>{vmenuicon}</b>                      
                              </Col>                  
                          </FormGroup>
      
                          <FormGroup row>
                              <Label for="menuname" sm={4}>menu name</Label>
                              <Col sm={8}>
                                    <b>{vmenuname}</b> 
                              </Col>
                          </FormGroup>
      
                          <FormGroup row>
                              <Label for="menutype" sm={4}>menu type</Label>
                              <Col sm={8}>
                                    <b>{vmenutype}</b>  
                              </Col>
                          </FormGroup>
                                {values.menutype === "Child" ?
                          <FormGroup row>
                          <Label for="parentmenu" sm={4}>Parent Menu</Label>
                              <Col sm={8}>
                                    <b>{vparentmenu}</b>  
                              </Col>                  
                          </FormGroup> : null }
      
                                <FormGroup row>
                              <Label for="menudisplay" sm={4}>menu display</Label>
                              <Col sm={8}>
                                    <b>{vmenudisplay}</b>  
                              </Col>
                          </FormGroup>
                          <FormGroup row>
                              <Label for="menuto" sm={4}>menu to</Label>
                              <Col sm={8}>
                                    <b>{vmenuto}</b> 
                              </Col>
                          </FormGroup>
      
                          <FormGroup row>
                              <Label for="menucomponent" sm={4}>menu component</Label>
                              <Col sm={8}>
                                    <b>{vmenucomponent}</b>
                              </Col>
                          </FormGroup>                   
                         
      
                          <FormGroup row>
                          <Label for="privilege" sm={4}>Privilege</Label>
                              <Col sm={8}>
                                    <b>{vmenucomponent}</b>
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

export default ManageMenu;