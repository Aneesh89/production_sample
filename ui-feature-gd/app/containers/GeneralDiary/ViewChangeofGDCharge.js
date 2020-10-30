import React from 'react';
import {
    Col, Row, FormGroup, Label, Table
} from 'reactstrap';

const ViewChangeofGDCharge = (props) => {

    return (
        <>
            <Col sm={12}>
                <Row>
                    <Col sm={6} style={{ background: "white", color: "black", borderLeft: '1px', borderRight: '1px solid grey' }} >
                        <FormGroup row>
                            <Col sm={12}>
                                <b>{props.vSubject}</b>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col sm={12}>
                                {props.vBrief}
                            </Col>
                        </FormGroup>
                    </Col>

                    <Col sm={6} style={{ background: "white", color: "black", borderRight: '1px ' }} >

                        <Table striped>
                            <tbody>
                                <tr>
                                    <th scope="row"><Label for="incommingofficer" >Incomming Officer </Label></th>
                                    <td>{props.vIncommingOfficerPenNo}&nbsp;{props.vIncommingOfficer}</td>
                                </tr>
                                <tr>
                                    <th scope="row"><Label for="outgoingofficer">Outgoing Officer </Label></th>
                                    <td>{props.vOutgoingOfficerPenNo}&nbsp;{props.vOutgoingOfficer}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Col>
        </>
    )
}

export default ViewChangeofGDCharge;