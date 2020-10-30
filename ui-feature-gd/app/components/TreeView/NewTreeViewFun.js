import React, {Component, Fragment,useState} from 'react';
import SortableTree from 'react-sortable-tree';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


import treeData from './SampleData';

import {
    Row, Col,
    Card, CardBody,
    CardTitle
} from 'reactstrap';


function TreeView(){

    let [treeData1,setTreedata] = useState([treeData]);
    console.log(treeData1);
        return (
            <Fragment>
                
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <Row>
                        <Col lg="12">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle>
                                        Basic
                                    </CardTitle>
                                    <div style={{height: '100vh'}}>
                                        <SortableTree
                                            treeData={treeData}
                                            onChange={treeData => setTreedata(treeData)}
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </ReactCSSTransitionGroup>
            </Fragment>
        );
    }


export default TreeView;
