import React, {Component, Fragment} from 'react';
import SortableTree from 'react-sortable-tree';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


import treeData from './SampleData';

import {
    Row, Col,
    Card, CardBody,
    CardTitle
} from 'reactstrap';

class TreeView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            treeData: treeData,
        };
    }

    render() {

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
                                            treeData={this.state.treeData}
                                            onChange={treeData => this.setState({treeData})}
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
}

export default TreeView;
