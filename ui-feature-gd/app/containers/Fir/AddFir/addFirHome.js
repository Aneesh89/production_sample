import React, { Fragment, memo } from 'react';
import {
  Row,
  Col,
  Button,
  CardHeader,
  Container,
  Card,
  CardBody,
  Progress,
  ListGroup,
  ListGroupItem,
  CardFooter,
  CustomInput,
  Input,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  UncontrolledButtonDropdown,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import FirIcon from './firIcon';
import { FirIconsJson } from './firicon_json';
export default function AddFirHome() {
  return (
    
    <Fragment>
      <Container fluid>
        <Card className="mb-3">
          <CardHeader className="card-header-tab z-index-6">
            <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
              <i className="header-icon lnr-charts icon-gradient bg-happy-green">
                {' '}
              </i>
              Add Fir
            </div>
            <div className="btn-actions-pane-right text-capitalize">
                <Link to="/AddFIR">
               <button className="btn-wide mr-md-2 btn btn-info btn-md font-size-md border-0 btn-transition">Add New Fir</button>
               </Link>
            </div>
          </CardHeader>
          <Row className="no-gutters">
            

            
          </Row>
        </Card>
      </Container>
    </Fragment>
  );
}
