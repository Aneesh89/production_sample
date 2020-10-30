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

const AliasModal=(props)=>{
const [aliasName,setAliasName]=useState()
  const aliasNameChange=(value)=>{
    // console.log(value.target.value);
    setAliasName(value.target.value);
  }
  const aliasBtn=()=>{
    props.aliasData(aliasName);
    props.hide();
  }

 
  const closeBtn = <button className="close" onClick={props.hide}>&times;</button>;
  return <Fragment>
     <Modal isOpen={props.isShowing} toggle={props.hide} backdrop={true} size={props.size} >
     <ModalHeader toggle={props.hide} close={closeBtn}>{props.name}</ModalHeader>
       <Row>
         <Col md="12">
         <FormGroup>   
           <Card>
            <CardBody>
              <Row>
                <Col md="12">
                <CardTitle>Alias Name</CardTitle>
                <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <FontAwesomeIcon icon={faLock} />
                    </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Alias Name"
                      type="text"
                      name="aliasName"
                      onChange={ev => aliasNameChange(ev) }
                    />
                  </InputGroup> 
                </Col>
              </Row>
            </CardBody>
          </Card>               
           
          </FormGroup> 
         </Col>
       </Row>
      <ModalFooter>
      <Button className="btn btn-success" onClick={aliasBtn}>Save</Button>
      </ModalFooter>
     </Modal>
  </Fragment>

}
export default AliasModal; 
