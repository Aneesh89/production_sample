import React from 'react';
import {
    Col, Row, FormGroup, Label, Table
} from 'reactstrap';

const ViewChangeofGuard = (props) => {

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
                            <thead>
                                <tr>
                                    <th scope="row"><Label for="incomming
                                        guard" >Incomming Guard </Label></th>
                                    <th scope="row"><Label for="outgoingguard">Outgoing Guard </Label></th>
                                    <th scope="row"><Label for="fromdatetime" >From Date Time </Label></th>
                                    <th scope="row"><Label for="todatetime">To Date Time </Label></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.GdDetails.changeGuard.map((c, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{c.incommingGuard}&nbsp;({c.incommingGuardPenNo})</td>
                                                <td>{c.outgoingGuard}&nbsp;({c.outgoingGuardPenNo})</td>
                                                <td>{c.fromDateTime}</td>
                                                <td>{c.toDateTime}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Col>
        </>
    )
}

export default ViewChangeofGuard;