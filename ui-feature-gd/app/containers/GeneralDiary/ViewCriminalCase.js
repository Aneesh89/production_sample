import React from 'react';
import {
    Col, Row, FormGroup, Label, Table
} from 'reactstrap';

const ViewCriminalCase = (props) => {

    return (
        <>
            <Col sm={12}>
                <Row>
                    <Col sm={6} style={{ background: "white", color: "black", borderLeft: '1px', borderRight: '1px solid grey' }} >
                        <FormGroup row>
                            <Col sm={6}>
                                <b>{props.vSubject}</b>
                            </Col>

                            <Col sm={6}>
                                <b>{props.vCaseType}</b>
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
                                    <th scope="row"><Label for="acts" >Acts </Label></th>
                                    <th scope="row"><Label for="sections">Sections </Label></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.GdDetails.criminalCase.listActSection.map((c, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{c.acts}</td>
                                                <td>{c.sections}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                        {/* {props.GdDetails.criminalCase.listActSection.map((actsection) =>

                          <FormGroup row>
                            <Col sm={6}>
                              <b>{actsection.act}</b>
                            </Col>
                            <Col sm={6}>
                              <b>{actsection.section}</b>
                            </Col>
                          </FormGroup>

                        )} */}
                    </Col>
                </Row>
            </Col>
        </>
    )
}

export default ViewCriminalCase;