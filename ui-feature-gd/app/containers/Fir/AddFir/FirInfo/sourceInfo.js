import React, { Fragment, memo } from 'react';
import {
  Row,
  Col,
  CardTitle,
  Input,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label
} from 'reactstrap';
// import TextareaAutosize from 'react-textarea-autosize';
import { Link } from 'react-router-dom';
import RSelect from '../../../../components/RSelect/RSelect';
import { Field } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';

export default function SourceInfo(props) {
  // console.log(props);
  switch(props.sourceInfo)
  {
    case "Cognizance by Police":
      return (<Row>
                <Col md="12">
                  <CardTitle>
                    Officer Details
                  </CardTitle>  
                  <FormGroup>  

                  <Field
                    component={RSelect}
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                    options={props.sourceDataInfo}
                    placeholder="Select Officer"
                    />

                    {/* <Input type="select" name="officer_id" id="officer_id">
                    <option value="0">--Select Officer--</option>
                         {
                            props.sourceDataInfo.map((sourceOfficerData,i)=>(
                            <option value={sourceOfficerData.officerValue} key={i}>
                              {sourceOfficerData.officerId}
                            </option>
                            ))
                         }

                    </Input> */}


                  </FormGroup>  
                </Col>
              </Row>);
    case 'Court':
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
                        name="sourceCourtInfo"
                        value={props.value}
                        onChange={props.onChange}
                        options={props.sourceDataInfo}
                        placeholder="Select Court"
                     />
                      {/* <Input type="select" name="court_id" id="court_id">
                          <option value="0">--Select Court--</option>
                          {
                            props.sourceDataInfo.map((sourceCourtData,i)=>(
                            <option value={sourceCourtData.courtValue} key={i}>
                              {sourceCourtData.courtType}
                            </option>
                            ))
                          }
                      </Input> */}
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
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <FontAwesomeIcon icon={faLock} />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="name of Court"
                            type="text"
                            name="nameOfCourt"
                            value={values.nameOfCourt}
                            onChange={props.CourtName}
                          />
                        </InputGroup>
                    </FormGroup>  
                </Col>
                <Col md="6">
                <FormGroup>
                    <CardTitle>
                    Court Reference No
                      </CardTitle>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <FontAwesomeIcon icon={faLock} />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Court Reference No"
                            type="text"
                            name="court_ref_no"
                            id="court_ref_no"
                          />
                        </InputGroup>
                    </FormGroup>  
                    </Col>
            
             

          </Row>
          </FormGroup>  
          </Fragment>);
      case 'Other':
        return (<Row>
              <Col md="12">
                <FormGroup>
                    
                    <CardTitle>
                      Details
                    </CardTitle> 
                    <InputGroup>
                            <Input type="textarea" name="text" rows="2" id="source_of_complainant_in_detail" placeholder="Source of complainant in detail.."/>
                          </InputGroup>
                        
                    </FormGroup>  
                </Col>
          </Row>);
      default:
        return '';
    
  }
     
}
