import React from 'react';
import {
    Col, Row, FormGroup, Label, Table
} from 'reactstrap';

const ViewDutyDetailing = (props) => {

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
                                    <th scope="row"><Label>Officer </Label></th>
                                    <th scope="row"><Label>Type of Duty</Label></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.GdDetails.dutyDetail.map((d, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{d.officerName}&nbsp;{d.officerPenNo}</td>
                                                <td>{d.dutyType.substring(2)}</td>
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

export default ViewDutyDetailing;